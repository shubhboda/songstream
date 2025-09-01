@echo off
echo SongStream Quick Installer
echo ========================
echo.
echo This script will automatically install SongStream as a desktop application
echo.

REM Check if Node.js is installed
node --version > nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    echo.
    echo Visit https://nodejs.org/ to download and install Node.js (version 14 or higher)
    echo Then run this installer again.
    echo.
    echo Press any key to open the Node.js download page...
    pause > nul
    start https://nodejs.org/
    exit /b 1
)

echo Node.js is installed. Proceeding with installation...
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Error installing dependencies.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Building desktop application installer...
echo.

REM Build the desktop application
call npm run build:electron

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error building the application.
    pause
    exit /b 1
)

echo.
echo Desktop application built successfully!
echo.
echo Your installer can be found in the dist folder.
echo.
echo Opening the dist folder...
start dist
echo.
echo Please run the installer (.exe file) to complete installation.
echo.
pause