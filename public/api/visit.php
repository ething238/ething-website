<?php
declare(strict_types=1);

function load_local_env(): void {
  static $loaded = false;
  if ($loaded) {
    return;
  }
  $loaded = true;

  $paths = [
    __DIR__ . '/../../.env.local',
    __DIR__ . '/../.env.local',
    getcwd() . '/.env.local',
  ];

  foreach ($paths as $path) {
    if (!is_readable($path)) {
      continue;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
      continue;
    }
    foreach ($lines as $line) {
      $trimmed = trim($line);
      if ($trimmed === '' || str_starts_with($trimmed, '#') || !str_contains($trimmed, '=')) {
        continue;
      }
      [$name, $value] = explode('=', $trimmed, 2);
      $name = trim($name);
      $value = trim($value, " \t\n\r\0\x0B\"'");
      if ($name !== '' && getenv($name) === false) {
        putenv($name . '=' . $value);
        $_ENV[$name] = $value;
      }
    }
    return;
  }
}

function env_value(string $name): string {
  load_local_env();
  $value = getenv($name);
  if ($value === false || trim($value) === '') {
    throw new RuntimeException("Missing required environment variable: {$name}");
  }
  return trim($value);
}

function clean_text(mixed $value, string $fallback = 'unknown', int $maxLength = 256): string {
  if (!is_string($value)) {
    return $fallback;
  }
  $trimmed = trim($value);
  if ($trimmed === '') {
    return $fallback;
  }
  return substr($trimmed, 0, $maxLength);
}

function known_text(mixed $value, int $maxLength = 80): ?string {
  if (!is_string($value)) {
    return null;
  }
  $cleaned = clean_text($value, 'unknown', $maxLength);
  return $cleaned === 'unknown' ? null : $cleaned;
}

function uuid_v4(): string {
  $data = random_bytes(16);
  $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
  $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function client_ip(): string {
  $headers = [
    'HTTP_X_FORWARDED_FOR',
    'HTTP_X_REAL_IP',
    'HTTP_CF_CONNECTING_IP',
    'REMOTE_ADDR',
  ];

  foreach ($headers as $header) {
    $value = $_SERVER[$header] ?? '';
    if (!is_string($value) || trim($value) === '') {
      continue;
    }
    $first = trim(explode(',', $value)[0]);
    if ($first !== '') {
      return $first;
    }
  }

  return 'unknown';
}

function is_private_or_local_ip(string $ip): bool {
  if ($ip === 'unknown' || $ip === '::1') {
    return true;
  }
  if (
    str_starts_with($ip, '127.') ||
    str_starts_with($ip, '10.') ||
    str_starts_with($ip, '192.168.') ||
    str_starts_with($ip, '172.16.') ||
    str_starts_with($ip, '172.17.') ||
    str_starts_with($ip, '172.18.') ||
    str_starts_with($ip, '172.19.') ||
    str_starts_with($ip, '172.2') ||
    str_starts_with($ip, 'fd') ||
    str_starts_with($ip, 'fe80:')
  ) {
    return true;
  }
  return false;
}

function fetch_json(string $url, int $timeoutSeconds = 2): ?array {
  $body = null;

  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    if ($ch !== false) {
      curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeoutSeconds,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
      ]);
      $body = curl_exec($ch);
      $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
      curl_close($ch);
      if ($body === false || $code < 200 || $code >= 300) {
        $body = null;
      }
    }
  }

  if (($body === null || $body === '') && ini_get('allow_url_fopen')) {
    $ctx = stream_context_create([
      'http' => [
        'timeout' => $timeoutSeconds,
        'header' => "Accept: application/json\r\n",
      ],
    ]);
    $tmp = @file_get_contents($url, false, $ctx);
    if (is_string($tmp) && $tmp !== '') {
      $body = $tmp;
    }
  }

  if (!is_string($body) || $body === '') {
    return null;
  }

  $decoded = json_decode($body, true);
  return is_array($decoded) ? $decoded : null;
}

function lookup_geo(string $ip): array {
  if (is_private_or_local_ip($ip)) {
    return [];
  }

  $data = fetch_json('https://ipapi.co/' . rawurlencode($ip) . '/json/', 2);
  if ($data !== null) {
    $geo = [
      'country' => known_text($data['country_name'] ?? null, 80),
      'region' => known_text($data['region'] ?? null, 80),
      'city' => known_text($data['city'] ?? null, 80),
    ];

    if ($geo['country'] || $geo['region'] || $geo['city']) {
      return array_filter($geo, static fn($value) => $value !== null);
    }
  }

  $fallback = fetch_json('https://ipwho.is/' . rawurlencode($ip), 2);
  if (($fallback['success'] ?? false) !== true) {
    return [];
  }

  return array_filter([
    'country' => known_text($fallback['country'] ?? null, 80),
    'region' => known_text($fallback['region'] ?? null, 80),
    'city' => known_text($fallback['city'] ?? null, 80),
  ], static fn($value) => $value !== null);
}

function first_known(mixed ...$values): string {
  foreach ($values as $value) {
    $known = known_text($value, 80);
    if ($known !== null) {
      return $known;
    }
  }
  return 'unknown';
}

function server_header(array $names): ?string {
  foreach ($names as $name) {
    $value = $_SERVER[$name] ?? null;
    if (is_string($value) && trim($value) !== '') {
      return $value;
    }
  }
  return null;
}

function decode_header_location(?string $value): ?string {
  if (!is_string($value) || trim($value) === '') {
    return null;
  }
  return urldecode($value);
}

function browser_source(string $userAgent, mixed $platform): string {
  $browser = 'Unknown browser';
  if (str_contains($userAgent, 'Edg/')) {
    $browser = 'Microsoft Edge';
  } elseif (str_contains($userAgent, 'OPR/') || str_contains($userAgent, 'Opera/')) {
    $browser = 'Opera';
  } elseif (str_contains($userAgent, 'Firefox/')) {
    $browser = 'Firefox';
  } elseif (str_contains($userAgent, 'Chrome/') && str_contains($userAgent, 'Safari/')) {
    $browser = 'Chrome';
  } elseif (str_contains($userAgent, 'Safari/') && !str_contains($userAgent, 'Chrome/')) {
    $browser = 'Safari';
  } elseif (str_contains($userAgent, 'SamsungBrowser/')) {
    $browser = 'Samsung Internet';
  }

  $cleanPlatform = clean_text($platform, 'web', 80);
  return substr($browser . ' / ' . $cleanPlatform, 0, 80);
}

function client_hint_platform(): string {
  return clean_text(
    $_SERVER['HTTP_SEC_CH_UA_PLATFORM'] ?? null,
    'web',
    80
  );
}

function header_geo(): array {
  return [
    'country' => decode_header_location(server_header([
      'HTTP_CF_IPCOUNTRY',
      'HTTP_X_VERCEL_IP_COUNTRY',
      'HTTP_X_COUNTRY',
      'HTTP_X_COUNTRY_CODE',
      'HTTP_GEOIP_COUNTRY_NAME',
    ])),
    'region' => decode_header_location(server_header([
      'HTTP_X_VERCEL_IP_COUNTRY_REGION',
      'HTTP_X_REGION',
      'HTTP_X_REGION_NAME',
      'HTTP_GEOIP_REGION_NAME',
      'HTTP_X_HOSTINGER_IP_REGION',
    ])),
    'city' => decode_header_location(server_header([
      'HTTP_X_VERCEL_IP_CITY',
      'HTTP_X_CITY',
      'HTTP_GEOIP_CITY',
      'HTTP_X_HOSTINGER_IP_CITY',
    ])),
  ];
}

function supabase_insert(array $visit): void {
  $url = rtrim(env_value('VITE_SUPABASE_URL'), '/');
  $secretKey = env_value('SUPABASE_SECRET_KEY');
  $endpoint = $url . '/rest/v1/visitor_visits';
  $body = json_encode($visit, JSON_UNESCAPED_SLASHES);

  if (!is_string($body)) {
    throw new RuntimeException('Could not encode visit payload.');
  }

  $headers = [
    'apikey: ' . $secretKey,
    'Content-Type: application/json',
    'Prefer: return=minimal',
  ];
  if (!str_starts_with($secretKey, 'sb_')) {
    $headers[] = 'Authorization: Bearer ' . $secretKey;
  }

  if (function_exists('curl_init')) {
    $ch = curl_init($endpoint);
    if ($ch === false) {
      throw new RuntimeException('Could not initialize Supabase request.');
    }
    curl_setopt_array($ch, [
      CURLOPT_POST => true,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 8,
      CURLOPT_HTTPHEADER => $headers,
      CURLOPT_POSTFIELDS => $body,
    ]);
    $responseBody = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);

    if ($responseBody === false || $code < 200 || $code >= 300) {
      throw new RuntimeException('Failed to save visit to Supabase.');
    }
    return;
  }

  $ctx = stream_context_create([
    'http' => [
      'method' => 'POST',
      'timeout' => 8,
      'header' => implode("\r\n", $headers) . "\r\n",
      'content' => $body,
    ],
  ]);
  $response = @file_get_contents($endpoint, false, $ctx);
  if ($response === false) {
    throw new RuntimeException('Failed to save visit to Supabase.');
  }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Allow: POST');
  exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode(is_string($raw) ? $raw : '', true);
if (!is_array($payload)) {
  $payload = [];
}

$existingVisitorId = isset($_COOKIE['visitor_id']) ? clean_text($_COOKIE['visitor_id'], '', 80) : '';
$visitorId = $existingVisitorId !== '' ? $existingVisitorId : uuid_v4();
$ip = client_ip();
$userAgent = clean_text($_SERVER['HTTP_USER_AGENT'] ?? null, 'unknown', 500);
$headerGeo = header_geo();
$geo = lookup_geo($ip);

$visit = [
  'id' => uuid_v4(),
  'visitor_id' => $visitorId,
  'visited_at' => gmdate('c'),
  'path' => clean_text($payload['path'] ?? null, '/', 200),
  'ip' => $ip,
  'user_agent' => $userAgent,
  'referrer' => clean_text($payload['referrer'] ?? null, 'direct', 400),
  'language' => clean_text($payload['language'] ?? ($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null), 'unknown', 80),
  'timezone' => clean_text($payload['timezone'] ?? null, 'unknown', 80),
  'screen' => clean_text($payload['screen'] ?? null, 'unknown', 40),
  'country' => first_known($geo['country'] ?? null, $headerGeo['country'] ?? null),
  'region' => first_known($geo['region'] ?? null, $headerGeo['region'] ?? null),
  'city' => first_known($geo['city'] ?? null, $headerGeo['city'] ?? null),
  'source' => browser_source($userAgent, client_hint_platform()),
];

try {
  supabase_insert($visit);
} catch (Throwable $error) {
  error_log('Failed to persist visitor analytics: ' . $error->getMessage());
}

if ($existingVisitorId === '') {
  setcookie('visitor_id', $visitorId, [
    'expires' => time() + 60 * 60 * 24 * 365,
    'path' => '/',
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'httponly' => true,
    'samesite' => 'Lax',
  ]);
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => true]);
