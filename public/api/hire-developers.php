<?php
declare(strict_types=1);

// Deploy the private server directory ABOVE public_html, never inside it.
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

try {
    $backend = dirname(__DIR__, 2) . '/server/lead-delivery/handler.php';
    if (!is_readable($backend)) {
        throw new RuntimeException('Private backend is not installed.');
    }
    require_once $backend;
    $config = \Ething\Leads\load_config();
    // Read at most one byte beyond the limit, including for chunked requests.
    $body = file_get_contents('php://input', false, null, 0, 16385);
    [$status, $payload, $headers] = \Ething\Leads\handle(
        $_SERVER,
        $body === false ? '' : $body,
        $config,
        '\\Ething\\Leads\\send_email',
        '\\Ething\\Leads\\consume_rate_limit'
    );
} catch (Throwable $error) {
    $status = 503;
    $payload = ['message' => 'Enquiries are temporarily unavailable. Please email support@ething.in.'];
    $headers = [];
}

http_response_code($status);
foreach ($headers as $name => $value) {
    header($name . ': ' . $value);
}
echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
