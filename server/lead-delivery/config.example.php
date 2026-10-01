<?php
declare(strict_types=1);

// Copy to config.local.php ONLY in the private server directory above public_html.
// Never enter real credentials in this example or commit config.local.php.
return [
    'gmail_user' => '', // Full Google account sign-in address; may differ from recipient.
    'gmail_app_password' => '', // Google App Password, NOT the regular account password.
    'rate_limit_secret' => '', // Generate privately: php -r "echo bin2hex(random_bytes(32));"
];
