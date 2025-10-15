@echo off
echo Starting TravelTrack Tourism Guide...
echo.
echo This will open the application in your default browser.
echo.

REM Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Python...
    start http://localhost:8000
    python -m http.server
    goto :end
)

REM Check if Node.js/npm is available
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting server with http-server...
    echo If this fails, you may need to install http-server with: npm install -g http-server
    start http://localhost:8080
    npx http-server
    goto :end
)

REM If neither Python nor Node.js is available, just open the file directly
echo No server available. Opening file directly in browser...
start index.html

:end