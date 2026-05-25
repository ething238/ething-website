<?php
/**
 * Server-side RSS fetch for Medium (Hostinger / Apache + PHP).
 * Lets the browser avoid CORS and flaky public proxies in production.
 *
 * Query: ?url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40YourHandle
 */
declare(strict_types=1);

$url = isset($_GET['url']) ? trim((string) $_GET['url']) : '';
if ($url === '') {
  http_response_code(400);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Missing url parameter';
  exit;
}

$parsed = parse_url($url);
if ($parsed === false || !isset($parsed['scheme'], $parsed['host'])) {
  http_response_code(400);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Invalid URL';
  exit;
}

$scheme = strtolower((string) $parsed['scheme']);
$host = strtolower((string) $parsed['host']);
$host = preg_replace('/^www\./', '', $host) ?? $host;
if ($scheme !== 'https' || $host !== 'medium.com') {
  http_response_code(403);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Only https://medium.com feeds are allowed';
  exit;
}

$path = $parsed['path'] ?? '';
if ($path === '' || strpos($path, '/feed/') !== 0) {
  http_response_code(403);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Only Medium RSS URLs (/feed/...) are allowed';
  exit;
}

header('Content-Type: application/rss+xml; charset=utf-8');

$userAgent = 'Mozilla/5.0 (compatible; EthingSite/1.1; Medium RSS mirror)';

$body = null;
if (function_exists('curl_init')) {
  $ch = curl_init($url);
  if ($ch !== false) {
    curl_setopt_array($ch, [
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_TIMEOUT => 20,
      CURLOPT_USERAGENT => $userAgent,
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
      'timeout' => 20,
      'header' => "User-Agent: {$userAgent}\r\n",
    ],
    'ssl' => [
      'verify_peer' => true,
      'verify_peer_name' => true,
    ],
  ]);
  $tmp = @file_get_contents($url, false, $ctx);
  if (is_string($tmp) && $tmp !== '') {
    $body = $tmp;
  }
}

if ($body === null || $body === '') {
  http_response_code(502);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Could not fetch feed from Medium';
  exit;
}

$head = substr($body, 0, 2500);
if (
  stripos($head, '<rss') === false &&
  stripos($head, '<feed') === false &&
  stripos($head, '<rdf:rdf') === false
) {
  http_response_code(502);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Upstream did not return RSS';
  exit;
}

echo $body;
