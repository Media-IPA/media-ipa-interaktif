@echo off
title WARD-IPA - Server Offline ^& Auto-Updater
color 0B
cd /d "%~dp0"

echo ============================================================
echo   WARD-IPA (Wahana Ajar Ragam Digital - IPA)
echo   Mode Offline Penuh (Simulasi 2D/3D) ^& Auto-Updater
echo ============================================================
echo.

echo [1/2] Memeriksa koneksi internet untuk pembaruan aplikasi...
ping -n 1 -w 2000 github.com >nul 2>&1
if %errorlevel%==0 (
    echo [ONLINE] Koneksi internet terdeteksi! Mengambil pembaruan terbaru...
    where git >nul 2>&1
    if %errorlevel%==0 (
        git pull --rebase --autostash
        echo [SUKSES] Aplikasi telah diperbarui ke versi terbaru!
    )
) else (
    echo [OFFLINE] Tidak ada koneksi internet. Menjalankan dari penyimpanan lokal...
)

echo.
echo [2/2] Menjalankan Server Lokal Offline WARD-IPA di http://localhost:8088 ...
echo       (Jangan tutup jendela hitam ini selama menggunakan aplikasi)
echo.

start "" "http://localhost:8088/index.html"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$listener = New-Object System.Net.HttpListener; " ^
  "$listener.Prefixes.Add('http://localhost:8088/'); " ^
  "$listener.Start(); " ^
  "$root = (Get-Location).Path; " ^
  "$mime = @{'.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.json'='application/json; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml'; '.webp'='image/webp'; '.pdf'='application/pdf'; '.woff2'='font/woff2'}; " ^
  "while ($listener.IsListening) { " ^
  "  $ctx = $listener.GetContext(); " ^
  "  $rel = [uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/')); " ^
  "  if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }; " ^
  "  $file = Join-Path $root $rel; " ^
  "  if (Test-Path $file -PathType Leaf) { " ^
  "    $ext = [System.IO.Path]::GetExtension($file).ToLower(); " ^
  "    $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }; " ^
  "    $bytes = [System.IO.File]::ReadAllBytes($file); " ^
  "    $ctx.Response.ContentLength64 = $bytes.Length; " ^
  "    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length); " ^
  "  } else { $ctx.Response.StatusCode = 404 }; " ^
  "  $ctx.Response.Close(); " ^
  "}"
