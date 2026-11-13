Set-Location $PSScriptRoot

Write-Host "YagizAI baslatiliyor..." -ForegroundColor Cyan

if (!(Test-Path ".\server.js")) {
    Write-Host "server.js bulunamadi!" -ForegroundColor Red
    Read-Host "Enter"
    exit
}

if (!(Test-Path ".\yagiz ai.html")) {
    Write-Host "yagiz ai.html bulunamadi!" -ForegroundColor Red
    Read-Host "Enter"
    exit
}

if (!(Test-Path ".\package.json")) {
    Write-Host "package.json bulunamadi!" -ForegroundColor Red
    Read-Host "Enter"
    exit
}

if (!(Test-Path ".\node_modules")) {
    Write-Host "Paketler kuruluyor..." -ForegroundColor Yellow
    npm.cmd install
}

try {
    Invoke-RestMethod "http://127.0.0.1:11434/api/tags" -TimeoutSec 2 | Out-Null
    Write-Host "Ollama bagli." -ForegroundColor Green
}
catch {
    Write-Host "Ollama uygulamasini acman gerekiyor." -ForegroundColor Yellow
}

Write-Host "Sunucu baslatiliyor..." -ForegroundColor Green
Start-Process "http://localhost:3000"
npm.cmd start

Read-Host "Kapatmak icin Enter"