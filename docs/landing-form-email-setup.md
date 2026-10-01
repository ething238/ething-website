# Administrator handoff: activate the eight landing-page forms

## Status

This is a prepared, offline-tested fix, NOT a live deployment. Gmail credentials are deliberately empty. Do not mark forms as working until a consented test enquiry arrives at `support@ething.in` from each page.

The eight existing forms already send JSON to `/api/hire-developers`. Their design, HTML, JavaScript, URLs and tracking stay unchanged. The fix adds an Apache/LiteSpeed rewrite and a private PHP SMTP backend compatible with the documented Hostinger deployment. Merging a GitHub pull request alone does not install the backend or credentials on Hostinger.

## Requirements

- Access to the live domain's Hostinger files and its directory above `public_html`.
- PHP 8.2 or newer (prefer a currently supported PHP release), with OpenSSL, ctype, filter and hash enabled.
- Outbound TLS connection to `smtp.gmail.com:587` allowed by the host.
- A Google sending account with 2-Step Verification and an App Password, entered privately by its owner. Use OAuth or a supported transactional service instead if App Passwords are unavailable; never use the normal Google password.
- A working recipient mailbox at `support@ething.in`. Sending account and recipient may be different.

References: [Google App Passwords](https://support.google.com/mail/answer/185833), [PHPMailer](https://github.com/PHPMailer/PHPMailer), [Hostinger SMTP/PHP guide](https://www.hostinger.com/in/tutorials/send-emails-using-php-mail/).

## Install without replacing the eight pages

Back up the existing `.htaccess` and API files first. The provided zip contains only the new endpoint, private backend/dependencies, rewrite snippet and these instructions. It has no credentials, existing landing-page files or full-site rebuild.

Copy the contents to these locations, adapting the domain folder to the actual hosting account:

```text
domain-folder/
├── public_html/                         # Existing website: leave its pages alone
│   ├── .htaccess                        # Add the rule below; preserve other rules
│   └── api/hire-developers.php           # New public entrypoint
└── server/                              # ABOVE public_html, not inside it
    ├── .htaccess                        # Defense in depth
    └── lead-delivery/
        ├── handler.php
        ├── composer.json
        ├── composer.lock
        ├── config.example.php           # Empty template
        ├── config.local.php             # Create privately; never upload to GitHub
        ├── vendor/                      # Already included in the supplied zip
        └── storage/                     # Created on first configured submission
```

1. Upload `public_html/api/hire-developers.php` into the existing website's `public_html/api/` directory. Upload `server/` as a sibling of `public_html`. The entrypoint resolves `../../server/lead-delivery/handler.php` from its own directory. Do not put this private backend, its dependencies or its configuration into `public_html`.
2. Copy `config.example.php` to `config.local.php` in that PRIVATE `server/lead-delivery` directory. Privately fill `gmail_user` with the sending account's full sign-in address and `gmail_app_password` with its App Password. Generate a private random `rate_limit_secret` (at least 32 characters), for example with `php -r "echo bin2hex(random_bytes(32));"`. Never send these values in chat, commit them, put them in `public/config.json`, or prefix them with `VITE_`. The recipient is fixed in the backend to `support@ething.in`; visitors cannot change it.
3. Set `config.local.php` permissions to 600 where supported. Allow the PHP hosting user to create/write the private `storage` directory; do not make it world-writable or web-accessible. The backend creates the directory with 700 and its limiter file with 600. Server environment variables `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `LEAD_RATE_LIMIT_SECRET` may be used instead of the private config file.
4. In the EXISTING `public_html/.htaccess`, add the following rule inside the existing rewrite block, after `RewriteEngine On` / `RewriteBase /` and BEFORE the generic SPA fallback or any redirect of API requests. Keep the site's existing canonical-domain/security rules and other API routing. This is an INTERNAL rewrite, not a redirect; POST and its JSON body must be preserved:

```apache
RewriteRule ^api/hire-developers/?$ api/hire-developers.php [L]
```

5. If deploying from source instead of the zip, run `composer install --no-dev --prefer-dist --no-interaction --no-scripts` inside `server/lead-delivery` first, then upload its generated `vendor` directory alongside the backend. The pinned dependency is PHPMailer 7.1.1. Do not upload the whole source repository or a configuration file into the web root. The Windows packaging script is `scripts/package-lead-delivery.ps1`.
6. Check that HTTP access to any private configuration/source/storage is impossible. Visit `https://www.ethingsolutions.com/api/hire-developers` with GET: expect HTTP 405, JSON and `Allow: POST`, NOT website HTML. This checks routing only; it does not confirm credentials or mail delivery.

No Vite/Next.js page rebuild is required for this targeted installation. If using a full Vite build, deploy `dist` as usual AND separately install the private `server` folder above the web root. Vite does not package that private folder. This PHP fix is for Hostinger's PHP hosting, not a static-only Vercel deployment.

## Verify delivery before declaring completion

Use the canonical HTTPS www domain to avoid redirects of form POSTs. Submit a consented, clearly labelled test through each existing page:

- `/hire-developers/`
- `/hire-ai-developers/`
- `/hire-python-developers/`
- `/hire-full-stack-developers/`
- `/hire-react-developers/`
- `/hire-devops-engineers/`
- `/staff-augmentation/`
- `/hire-top-talent/`

Confirm the network response is HTTP 200 JSON with `success: true`, and confirm the email arrives in the `support@ething.in` inbox or spam folder. Check name, visitor email, phone, company, hiring need, source page and UTM data; Reply-To must be the visitor, not the sending account. No email is sent to the visitor. Existing success/conversion tracking should run only after this successful server response.

Rate limits are shared by all eight pages: five validated requests per IP per 15-minute UTC bucket, 100 across all IPs per UTC hour, and 200 per UTC day. Failed SMTP attempts also consume the limit to bound abuse. To test all eight pages, send the first five, then wait for the next 15-minute bucket before sending the remaining three. Do not disable production safeguards. Limits do not defeat distributed bots; add hosting/WAF challenge protection for abuse without excluding genuine visitors.

SMTP acceptance is not guaranteed inbox delivery. Check spam, Gmail sending restrictions and account limits if necessary. This implementation sends notifications only; it does NOT add CRM/Google Sheets storage, queue failed messages or recover enquiries submitted before the fix. The private limiter stores hashed IP counters, not lead details, raw IPs or passwords.

## Troubleshooting and rollback

- HTML response: rewrite missing/too late, wrong host, or request still routed to the SPA.
- 400/403/413/415: field validation, source-origin restriction, body size or JSON content type.
- 503: missing backend/private settings, invalid sender/settings, or inaccessible rate-limit storage.
- 502: dependency missing, SMTP/TLS/account failure or SMTP rejection. Do not expose raw SMTP debug output on the public endpoint. Verify private settings, OpenSSL, outbound port access and the sending account with the account owner.
- 429: throttle reached; respect `Retry-After` and use the direct contact email if urgent. Reverse proxies may make multiple visitors share one `REMOTE_ADDR`; have hosting configure trusted real-IP handling rather than accepting arbitrary forwarded headers in this code.

For rollback, restore only the added rewrite/API changes from the backup and disable the new endpoint. Keep existing pages/domain rules intact. Be aware that restoring the old SPA fallback reintroduces the broken form connection; do not advertise working forms until delivery is restored. Revoke/rotate the Google App Password if ever exposed.

## Offline checks used for this handoff

```bash
php tests/lead-delivery.test.php
# Set PHP_BINARY to the PHP 8.2+ executable first:
node --test tests/lead-delivery-http.test.mjs
npm run build
```

The tests mock SMTP, compose mail without sending, check real HTTP/JSON failure responses in a credential-free temporary fixture, and verify all eight exported pages still use the same endpoint. They do not prove live inbox arrival.
