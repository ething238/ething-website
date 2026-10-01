<?php
declare(strict_types=1);

require __DIR__ . '/../server/lead-delivery/handler.php';
require __DIR__ . '/../server/lead-delivery/vendor/autoload.php';

use function Ething\Leads\handle;
use function Ething\Leads\consume_rate_limit;
use function Ething\Leads\create_message;

function check(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}
function run(string $name, callable $test): void
{
    $test();
    echo "PASS: $name\n";
}
const ROUTES = [
    '/hire-developers/', '/hire-ai-developers/', '/hire-python-developers/',
    '/hire-full-stack-developers/', '/hire-react-developers/', '/hire-devops-engineers/',
    '/staff-augmentation/', '/hire-top-talent/',
];
$server = ['REQUEST_METHOD' => 'POST', 'CONTENT_TYPE' => 'application/json; charset=utf-8', 'REMOTE_ADDR' => '192.0.2.1', 'HTTP_ORIGIN' => 'https://www.ethingsolutions.com'];
$lead = ['name' => 'Test Visitor', 'email' => 'visitor@example.invalid', 'phone' => '+1 202 555 0100', 'company' => 'Example', 'hiringNeed' => 'Developer', 'landingPage' => ROUTES[0]];
$config = ['gmail_user' => 'test-sender@gmail.com', 'gmail_app_password' => 'abcd efgh ijkl mnop', 'rate_limit_secret' => str_repeat('x', 64)];
$allow = fn () => 0;
$sent = [];
$send = function ($payload, $settings) use (&$sent): bool { $sent[] = [$payload, $settings]; return true; };
$request = function (array $input, array $serverChanges = [], ?array $settings = null, ?callable $sender = null, ?callable $limiter = null) use ($server, $config, $send, $allow): array {
    return handle(array_replace($server, $serverChanges), json_encode($input), $settings ?? $config, $sender ?? $send, $limiter ?? $allow);
};

run('all eight existing page payloads succeed only through the sender', function () use ($request, $lead, &$sent) {
    foreach (ROUTES as $route) {
        $before = count($sent);
        $result = $request(array_replace($lead, ['landingPage' => $route]));
        check($result[0] === 200 && $result[1]['success'] === true, $route);
        check(count($sent) === $before + 1 && end($sent)[0]['landingPage'] === $route, 'Sender/source mismatch');
        check(end($sent)[1]['gmail_app_password'] === 'abcdefghijklmnop', 'App password spacing');
    }
});
run('missing required fields and malformed email never send', function () use ($request, $lead, &$sent) {
    $before = count($sent);
    foreach (['name', 'email', 'phone', 'company', 'hiringNeed', 'landingPage'] as $field) {
        check($request(array_replace($lead, [$field => '']))[0] === 400, $field);
    }
    check($request(array_replace($lead, ['email' => "visitor@example.invalid\r\nBcc: attacker@example.invalid"]))[0] === 400, 'Injected email');
    check(count($sent) === $before, 'Invalid lead sent');
});
run('wrong method, cross-site requests and non-JSON input are rejected', function () use ($request, $lead, &$sent) {
    $before = count($sent);
    check($request($lead, ['REQUEST_METHOD' => 'GET'])[0] === 405, 'GET');
    check($request($lead, ['REQUEST_METHOD' => 'OPTIONS'])[0] === 405, 'OPTIONS');
    check($request($lead, ['HTTP_ORIGIN' => 'https://attacker.example'])[0] === 403, 'Origin');
    check($request($lead, ['HTTP_SEC_FETCH_SITE' => 'cross-site'])[0] === 403, 'Fetch site');
    check($request($lead, ['CONTENT_TYPE' => 'text/plain'])[0] === 415, 'Content type');
    check(count($sent) === $before, 'Rejected request sent');
});
run('bad JSON, excessive bodies, wrong types and unknown routes are rejected', function () use ($server, $config, $send, $allow, $request, $lead) {
    check(handle($server, '{bad', $config, $send, $allow)[0] === 400, 'Bad JSON');
    check(handle($server, '[]', $config, $send, $allow)[0] === 400, 'Array JSON');
    check(handle($server, str_repeat('x', 16385), $config, $send, $allow)[0] === 413, 'Body size');
    check($request($lead, ['CONTENT_LENGTH' => '18000'])[0] === 413, 'Declared size');
    check($request(array_replace($lead, ['name' => ['bad']]))[0] === 400, 'Array field');
    check($request(array_replace($lead, ['company' => str_repeat('x', 181)]))[0] === 400, 'Field length');
    check($request(array_replace($lead, ['landingPage' => 'https://evil.example/']))[0] === 400, 'Unknown route');
});
run('missing configuration and unavailable rate storage fail closed', function () use ($request, $lead, &$sent) {
    $before = count($sent);
    check($request($lead, [], [])[0] === 503, 'Empty config');
    check($request($lead, [], ['gmail_user' => 'bad', 'gmail_app_password' => 'pass', 'rate_limit_secret' => str_repeat('x', 64)])[0] === 503, 'Bad sender');
    check($request($lead, [], null, null, function () { throw new RuntimeException('test'); })[0] === 503, 'Storage failure');
    check(count($sent) === $before, 'Unconfigured lead sent');
});
run('rate-limited requests cannot send and use the real remote address', function () use ($request, $lead, &$sent) {
    $before = count($sent);
    $result = $request($lead, ['HTTP_X_FORWARDED_FOR' => '198.51.100.99'], null, null, function ($ip) {
        check($ip === '192.0.2.1', 'Forwarded header trusted');
        return 123;
    });
    check($result[0] === 429 && $result[2]['Retry-After'] === '123', 'Limiter response');
    check(count($sent) === $before, 'Rate-limited lead sent');
});
run('SMTP rejection/exception never claim success or expose private errors', function () use ($request, $lead) {
    check($request($lead, [], null, fn () => false)[0] === 502, 'Rejection');
    $result = $request($lead, [], null, function () { throw new RuntimeException('SECRET app-password'); });
    check($result[0] === 502 && !str_contains(json_encode($result), 'SECRET'), 'Error leaked');
});
run('recipient injection is ignored; mail is plain text with fixed recipient and safe reply-to', function () use ($request, $lead, &$sent) {
    $request(array_replace($lead, ['to' => 'attacker@example.invalid', 'recipient' => 'attacker@example.invalid', 'hiringNeed' => "Developer\r\nBcc: attacker@example.invalid", 'utm_source' => 'test-campaign']));
    [$payload, $settings] = end($sent);
    check(!isset($payload['to'], $payload['recipient']), 'Recipient data forwarded');
    $mail = create_message($payload, $settings);
    check($mail->getToAddresses() === [['support@ething.in', '']], 'Wrong recipient');
    check(array_values($mail->getReplyToAddresses()) === [['visitor@example.invalid', '']], 'Wrong reply-to');
    check($mail->getCcAddresses() === [] && $mail->getBccAddresses() === [], 'Extra recipients');
    check(!str_contains($mail->Subject, "\n") && !str_contains($mail->Subject, "\r"), 'Subject injection');
    check($mail->ContentType === 'text/plain' && $mail->SMTPDebug === 0, 'Unsafe email settings');
    check(str_contains($mail->Body, 'Landing page: /hire-developers/') && str_contains($mail->Body, 'UTM source: test-campaign'), 'Missing attribution');
    check($mail->preSend(), 'PHPMailer could not compose message'); // Builds MIME, never connects to SMTP.
});
run('limiter restricts each IP, expires windows and stores no raw IP or lead data', function () {
    $directory = sys_get_temp_dir() . '/ething-lead-test-' . bin2hex(random_bytes(8));
    for ($i = 0; $i < 5; $i++) {
        check(consume_rate_limit('192.0.2.1', str_repeat('x', 64), $directory, 1700000000) === 0, 'Early limit');
    }
    check(consume_rate_limit('192.0.2.1', str_repeat('x', 64), $directory, 1700000000) > 0, 'Missing IP limit');
    check(consume_rate_limit('192.0.2.2', str_repeat('x', 64), $directory, 1700000000) === 0, 'Shared IP limit');
    check(consume_rate_limit('192.0.2.1', str_repeat('x', 64), $directory, 1700000901) === 0, 'Window did not expire');
    check(!str_contains(file_get_contents($directory . '/rate-limits.json'), '192.0.2'), 'Raw IP stored');
    unlink($directory . '/rate-limits.json');
    rmdir($directory);
});
run('global hourly and daily caps apply across different IPs', function () {
    $directory = sys_get_temp_dir() . '/ething-lead-test-' . bin2hex(random_bytes(8));
    $time = intdiv(1700000000, 86400) * 86400 + 36000; // 10:00 UTC; later windows stay in this day.
    for ($i = 1; $i <= 100; $i++) {
        check(consume_rate_limit('192.0.2.' . $i, str_repeat('x', 64), $directory, $time) === 0, 'Early global cap');
    }
    check(consume_rate_limit('198.51.100.1', str_repeat('x', 64), $directory, $time) > 0, 'Missing hourly cap');
    for ($i = 1; $i <= 100; $i++) {
        check(consume_rate_limit('192.0.2.' . $i, str_repeat('x', 64), $directory, $time + 3600) === 0, 'Hourly reset');
    }
    check(consume_rate_limit('198.51.100.1', str_repeat('x', 64), $directory, $time + 7200) > 3600, 'Missing daily cap');
    unlink($directory . '/rate-limits.json');
    rmdir($directory);
});
echo "10 offline backend tests passed; no emails sent.\n";
