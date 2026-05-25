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

function json_response(array $payload, int $status = 200): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_UNESCAPED_SLASHES);
  exit;
}

function to_visit(array $row): array {
  return [
    'id' => (string) ($row['id'] ?? ''),
    'visitorId' => (string) ($row['visitor_id'] ?? ''),
    'visitedAt' => (string) ($row['visited_at'] ?? ''),
    'path' => (string) ($row['path'] ?? ''),
    'ip' => (string) ($row['ip'] ?? ''),
    'userAgent' => (string) ($row['user_agent'] ?? ''),
    'referrer' => (string) ($row['referrer'] ?? ''),
    'language' => (string) ($row['language'] ?? ''),
    'timezone' => (string) ($row['timezone'] ?? ''),
    'screen' => (string) ($row['screen'] ?? ''),
    'country' => (string) ($row['country'] ?? ''),
    'region' => (string) ($row['region'] ?? ''),
    'city' => (string) ($row['city'] ?? ''),
    'source' => (string) ($row['source'] ?? ''),
  ];
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  header('Allow: GET');
  json_response(['error' => 'Method not allowed'], 405);
}

try {
  $dashboardKey = env_value('VISITOR_DASHBOARD_KEY');
  $providedKey = isset($_GET['key']) ? trim((string) $_GET['key']) : '';

  if ($providedKey === '' || !hash_equals($dashboardKey, $providedKey)) {
    json_response(['error' => 'Unauthorized'], 401);
  }

  $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 500;
  $limit = max(1, min($limit, 1000));

  $url = rtrim(env_value('VITE_SUPABASE_URL'), '/');
  $secretKey = env_value('SUPABASE_SECRET_KEY');
  $query = http_build_query([
    'select' => '*',
    'order' => 'visited_at.desc',
    'limit' => (string) $limit,
  ]);
  $endpoint = $url . '/rest/v1/visitor_visits?' . $query;
  $headers = [
    'apikey: ' . $secretKey,
    'Accept: application/json',
  ];
  if (!str_starts_with($secretKey, 'sb_')) {
    $headers[] = 'Authorization: Bearer ' . $secretKey;
  }

  $body = null;
  if (function_exists('curl_init')) {
    $ch = curl_init($endpoint);
    if ($ch !== false) {
      curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_HTTPHEADER => $headers,
      ]);
      $body = curl_exec($ch);
      $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
      curl_close($ch);
      if ($body === false || $code < 200 || $code >= 300) {
        json_response(['error' => 'Could not read visits'], 502);
      }
    }
  }

  if (($body === null || $body === '') && ini_get('allow_url_fopen')) {
    $ctx = stream_context_create([
      'http' => [
        'timeout' => 8,
        'header' => implode("\r\n", $headers) . "\r\n",
      ],
    ]);
    $tmp = @file_get_contents($endpoint, false, $ctx);
    if (is_string($tmp)) {
      $body = $tmp;
    }
  }

  $rows = json_decode(is_string($body) ? $body : '', true);
  if (!is_array($rows)) {
    json_response(['error' => 'Could not read visits'], 502);
  }

  json_response(['visits' => array_map('to_visit', $rows)]);
} catch (Throwable $error) {
  error_log('Visitor dashboard error: ' . $error->getMessage());
  json_response(['error' => 'Server configuration error'], 500);
}
