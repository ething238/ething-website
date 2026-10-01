<?php
declare(strict_types=1);

namespace Ething\Leads;

use PHPMailer\PHPMailer\PHPMailer;
use RuntimeException;
use Throwable;

const RECIPIENT = 'support@ething.in';
const ORIGINS = ['https://www.ethingsolutions.com', 'https://ethingsolutions.com'];
const ROUTES = [
    '/hire-developers/', '/hire-ai-developers/', '/hire-python-developers/',
    '/hire-full-stack-developers/', '/hire-react-developers/', '/hire-devops-engineers/',
    '/staff-augmentation/', '/hire-top-talent/', '/other-services/',
];
const DELIVERY_ERROR = 'We could not send your request. Please email support@ething.in or call +91 70119 56780.';

function load_config(): array
{
    $path = __DIR__ . '/config.local.php';
    $local = is_readable($path) ? require $path : [];
    if (!is_array($local)) {
        throw new RuntimeException('Invalid private configuration.');
    }
    $config = [];
    foreach (['gmail_user' => 'GMAIL_USER', 'gmail_app_password' => 'GMAIL_APP_PASSWORD', 'rate_limit_secret' => 'LEAD_RATE_LIMIT_SECRET'] as $key => $environment) {
        $value = getenv($environment);
        $config[$key] = $value !== false && trim($value) !== '' ? $value : ($local[$key] ?? '');
    }
    return $config;
}

// Dependency injection is used by offline tests only, not by visitors or config.
function handle(array $server, string $body, array $config, callable $send, callable $rateLimit): array
{
    if (($server['REQUEST_METHOD'] ?? '') !== 'POST') {
        return [405, ['message' => 'Method not allowed.'], ['Allow' => 'POST']];
    }
    $origin = $server['HTTP_ORIGIN'] ?? '';
    if (($origin !== '' && !in_array($origin, ORIGINS, true)) || ($server['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') {
        return [403, ['message' => 'Request not allowed.'], []];
    }
    if (strtolower(trim(explode(';', $server['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') {
        return [415, ['message' => 'Send JSON form data.'], []];
    }
    if (strlen($body) > 16384 || (int) ($server['CONTENT_LENGTH'] ?? 0) > 16384) {
        return [413, ['message' => 'Request is too large.'], []];
    }
    try {
        $input = json_decode($body, true, 32, JSON_THROW_ON_ERROR);
    } catch (Throwable $error) {
        return [400, ['message' => 'Invalid form data.'], []];
    }
    if (!is_array($input) || array_is_list($input)) {
        return [400, ['message' => 'Invalid form data.'], []];
    }
    $limits = [
        'name' => 120, 'email' => 254, 'phone' => 40, 'company' => 180, 'hiringNeed' => 120,
        'companySize' => 80, 'engineersNeeded' => 80, 'landingPage' => 100,
        'utm_source' => 500, 'utm_medium' => 500, 'utm_campaign' => 500,
        'utm_term' => 500, 'utm_content' => 500, 'gclid' => 500,
    ];
    $lead = [];
    foreach ($limits as $field => $max) {
        $value = $input[$field] ?? '';
        if (!is_string($value) || strlen($value) > $max) {
            return [400, ['message' => 'Please check the form fields.', 'fields' => [$field]], []];
        }
        // Emails must be validated without silently cleaning header-injection text.
        $lead[$field] = $field === 'email' ? trim($value) : trim(preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value));
    }
    $missing = array_values(array_filter(['name', 'email', 'phone', 'company', 'hiringNeed', 'landingPage'], fn ($field) => $lead[$field] === ''));
    if ($missing) {
        return [400, ['message' => 'Please complete all required fields.', 'fields' => $missing], []];
    }
    if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
        return [400, ['message' => 'Enter a valid work email address.', 'fields' => ['email']], []];
    }
    $lead['landingPage'] = rtrim($lead['landingPage'], '/') . '/';
    if (!in_array($lead['landingPage'], ROUTES, true)) {
        return [400, ['message' => 'Invalid source page.', 'fields' => ['landingPage']], []];
    }
    foreach (['gmail_user', 'gmail_app_password', 'rate_limit_secret'] as $key) {
        if (!isset($config[$key]) || !is_string($config[$key])) {
            return [503, ['message' => DELIVERY_ERROR], []];
        }
    }
    $config['gmail_user'] = trim($config['gmail_user']);
    $config['gmail_app_password'] = preg_replace('/\s+/', '', $config['gmail_app_password']);
    if (!filter_var($config['gmail_user'], FILTER_VALIDATE_EMAIL) || $config['gmail_app_password'] === '' || strlen($config['rate_limit_secret']) < 32) {
        return [503, ['message' => DELIVERY_ERROR], []];
    }
    // Do not trust X-Forwarded-For: spoofed headers must not bypass the limiter.
    $ip = $server['REMOTE_ADDR'] ?? '';
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return [503, ['message' => DELIVERY_ERROR], []];
    }
    try {
        $retryAfter = $rateLimit($ip, $config['rate_limit_secret']);
        if ($retryAfter > 0) {
            return [429, ['message' => 'Too many requests. Please try later or email support@ething.in.'], ['Retry-After' => (string) $retryAfter]];
        }
    } catch (Throwable $error) {
        // Fail closed if private rate-limit storage cannot be read/written.
        return [503, ['message' => DELIVERY_ERROR], []];
    }
    $lead['timestamp'] = gmdate('c');
    try {
        if ($send($lead, $config) !== true) {
            return [502, ['message' => DELIVERY_ERROR], []];
        }
    } catch (Throwable $error) {
        // Never expose SMTP details, credentials or visitor data in errors/logs.
        return [502, ['message' => DELIVERY_ERROR], []];
    }
    return [200, ['message' => 'Your request has been sent.', 'success' => true], []];
}

function consume_rate_limit(string $ip, string $secret, ?string $directory = null, ?int $now = null): int
{
    $directory ??= __DIR__ . '/storage';
    $now ??= time();
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('Private storage unavailable.');
    }
    $file = fopen($directory . '/rate-limits.json', 'c+');
    if ($file === false) {
        throw new RuntimeException('Private storage unavailable.');
    }
    try {
        if (!flock($file, LOCK_EX)) {
            throw new RuntimeException('Rate-limit lock unavailable.');
        }
        chmod($directory . '/rate-limits.json', 0600);
        $raw = stream_get_contents($file);
        if ($raw === false) {
            throw new RuntimeException('Private storage unreadable.');
        }
        $state = $raw === '' ? [] : json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
        if (!is_array($state)) {
            throw new RuntimeException('Invalid limiter state.');
        }
        $ipKey = hash_hmac('sha256', $ip, $secret);
        $buckets = ['ip:' . $ipKey => [900, 5], 'global:hour' => [3600, 100], 'global:day' => [86400, 200]];
        foreach ($state as $key => $entry) {
            if (!is_array($entry) || !isset($entry['expires'], $entry['count']) || !is_int($entry['expires']) || !is_int($entry['count'])) {
                throw new RuntimeException('Invalid limiter state.');
            }
            if ($entry['expires'] <= $now) {
                unset($state[$key]);
            }
        }
        $retryAfter = 0;
        foreach ($buckets as $key => [$window, $limit]) {
            $entry = $state[$key] ?? ['expires' => (intdiv($now, $window) + 1) * $window, 'count' => 0];
            if ($entry['count'] >= $limit) {
                $retryAfter = max($retryAfter, $entry['expires'] - $now);
            }
            $state[$key] = $entry;
        }
        if ($retryAfter > 0) {
            return $retryAfter;
        }
        foreach ($buckets as $key => $unused) {
            $state[$key]['count']++;
        }
        $encoded = json_encode($state, JSON_THROW_ON_ERROR);
        rewind($file);
        if (!ftruncate($file, 0) || fwrite($file, $encoded) !== strlen($encoded) || !fflush($file)) {
            throw new RuntimeException('Private storage unwritable.');
        }
        return 0;
    } finally {
        flock($file, LOCK_UN);
        fclose($file);
    }
}

function create_message(array $lead, array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Username = $config['gmail_user'];
    $mail->Password = $config['gmail_app_password'];
    $mail->Timeout = 10;
    $mail->getSMTPInstance()->Timelimit = 15;
    $mail->SMTPDebug = 0;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Encoding = PHPMailer::ENCODING_BASE64;
    $mail->setFrom($config['gmail_user'], 'eThing Landing Pages');
    $mail->addAddress(RECIPIENT);
    $mail->addReplyTo($lead['email']);
    $mail->isHTML(false);
    $mail->Subject = 'New engineering enquiry: ' . $lead['hiringNeed'];
    $labels = [
        'name' => 'Name', 'email' => 'Work email', 'phone' => 'Phone', 'company' => 'Company',
        'hiringNeed' => 'Hiring need', 'companySize' => 'Company size', 'engineersNeeded' => 'Engineers needed',
        'landingPage' => 'Landing page', 'timestamp' => 'Received at (UTC)', 'utm_source' => 'UTM source',
        'utm_medium' => 'UTM medium', 'utm_campaign' => 'UTM campaign', 'utm_term' => 'UTM term',
        'utm_content' => 'UTM content', 'gclid' => 'Google click ID',
    ];
    $rows = ['New eThing landing-page enquiry', ''];
    foreach ($labels as $key => $label) {
        if (($lead[$key] ?? '') !== '') {
            $rows[] = $label . ': ' . $lead[$key];
        }
    }
    $mail->Body = implode("\n", $rows) . "\n\nReply to this email to contact the visitor.";
    return $mail;
}

function send_email(array $lead, array $config): bool
{
    $autoload = __DIR__ . '/vendor/autoload.php';
    if (!is_readable($autoload)) {
        throw new RuntimeException('SMTP dependency unavailable.');
    }
    require_once $autoload;
    // Success means the SMTP server accepted the message, not guaranteed inbox arrival.
    return create_message($lead, $config)->send();
}
