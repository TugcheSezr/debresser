@echo off
title De Bresser site (niet sluiten zolang je de site bekijkt)
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is niet gevonden. Installeer het via https://nodejs.org & pause & exit /b)
node tools\server.cjs --open
pause
