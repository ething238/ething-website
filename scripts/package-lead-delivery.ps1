param()
$ErrorActionPreference = 'Stop'

$repoPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$backendPath = Join-Path $repoPath 'server/lead-delivery'
if (-not (Test-Path -LiteralPath (Join-Path $backendPath 'vendor/autoload.php') -PathType Leaf)) {
    throw 'Run composer install --no-dev --prefer-dist --no-interaction --no-scripts in server/lead-delivery first.'
}
if (@(Get-Content -LiteralPath (Join-Path $backendPath 'config.example.php') | Where-Object { $_ -match "^\s*'(gmail_user|gmail_app_password|rate_limit_secret)'\s*=>\s*'[^']+'" }).Count -gt 0) {
    throw 'The example configuration must not contain credentials.'
}

$packagePath = Join-Path ([System.IO.Path]::GetTempPath()) ('ething-lead-package-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path (Join-Path $packagePath 'public_html/api') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $packagePath 'server/lead-delivery') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $repoPath 'public/api/hire-developers.php') -Destination (Join-Path $packagePath 'public_html/api/hire-developers.php')
Copy-Item -LiteralPath (Join-Path $repoPath 'server/.htaccess') -Destination (Join-Path $packagePath 'server/.htaccess')
# Deliberate allowlist: never copy config.local.php, storage, .env or the full site.
foreach ($file in @('handler.php', 'composer.json', 'composer.lock', 'config.example.php')) {
    Copy-Item -LiteralPath (Join-Path $backendPath $file) -Destination (Join-Path $packagePath "server/lead-delivery/$file")
}
Copy-Item -LiteralPath (Join-Path $backendPath 'vendor') -Destination (Join-Path $packagePath 'server/lead-delivery/vendor') -Recurse
Copy-Item -LiteralPath (Join-Path $repoPath 'docs/landing-form-email-setup.md') -Destination (Join-Path $packagePath 'INSTALL.md')
Copy-Item -LiteralPath (Join-Path $repoPath 'docs/lead-delivery-rewrite.conf') -Destination (Join-Path $packagePath 'APACHE-REWRITE.conf')
$packageFiles = @(Get-ChildItem -LiteralPath $packagePath -Recurse -File -Force)
if (@($packageFiles | Where-Object { $_.Name -eq 'config.local.php' -or $_.Name -match '^\.env($|\.)' -or $_.FullName -match '[\\/]storage[\\/]' }).Count -gt 0) {
    throw 'Private configuration or state found in package; refusing to create archive.'
}
$outputDirectory = Join-Path $repoPath 'artifacts/lead-delivery'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$zipPath = Join-Path $outputDirectory ('ething-eight-forms-fix-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip')
if (Test-Path -LiteralPath $zipPath) { throw 'Archive already exists; run again with a fresh timestamp.' }
Compress-Archive -LiteralPath @((Join-Path $packagePath 'public_html'), (Join-Path $packagePath 'server'), (Join-Path $packagePath 'INSTALL.md'), (Join-Path $packagePath 'APACHE-REWRITE.conf')) -DestinationPath $zipPath
Get-Item -LiteralPath $zipPath | Select-Object FullName, Length
