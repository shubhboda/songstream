@echo off
echo Starting SongStream Desktop Application...
echo.
echo This script will install dependencies (if needed) and launch the application
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Error installing dependencies. Please make sure Node.js is installed.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Starting SongStream in development mode...
call npm run dev:electron

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error starting the application.
    echo Please check that Node.js is installed and try again.
    pause
)