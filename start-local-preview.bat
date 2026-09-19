@echo off
setlocal
title Ething Landing Pages - Local Preview

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo Node.js is not installed.
  echo Install the current Node.js LTS release, then run this file again.
  echo Opening the Node.js download page...
  start "" "https://nodejs.org/en/download"
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo npm is not available. Reinstall Node.js and include npm.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing website dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Review the error above.
    pause
    exit /b 1
  )
)

echo.
echo Starting Ething landing-page preview...
echo The browser will open automatically.
echo Keep this window open while testing. Press Ctrl+C to stop.
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://127.0.0.1:5173/hire-top-talent'"
call npm run dev -- --host 127.0.0.1 --port 5173

if errorlevel 1 (
  echo.
  echo The preview server stopped with an error.
  pause
)

