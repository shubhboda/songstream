@echo off
echo SongStream Installer
echo ===================
echo.
echo This script will help you install SongStream on your PC
echo.

:MENU
echo Choose installation option:
echo 1. Install as Desktop Application (recommended for PC)
echo 2. Install as Website (for developers)
echo 3. Exit
echo.

set /p CHOICE=Enter your choice (1-3): 

if "%CHOICE%"=="1" goto DESKTOP
if "%CHOICE%"=="2" goto WEBSITE
if "%CHOICE%"=="3" goto END

echo Invalid choice. Please try again.
echo.
goto MENU

:DESKTOP
echo.
echo Installing SongStream Desktop Application...
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Error installing dependencies. Please make sure Node.js is installed.
        echo.
        echo Please install Node.js from https://nodejs.org/ (version 14 or higher)
        echo Then run this installer again.
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
    echo Please check that Node.js is installed and try again.
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
goto END

:WEBSITE
echo.
echo Installing SongStream Website...
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Error installing dependencies. Please make sure Node.js is installed.
        echo.
        echo Please install Node.js from https://nodejs.org/ (version 14 or higher)
        echo Then run this installer again.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Building website...
echo.

REM Build the website
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error building the website.
    echo Please check that Node.js is installed and try again.
    pause
    exit /b 1
)

echo.
echo Website built successfully!
echo.
echo The website files can be found in the dist folder.
echo You can deploy these files to any web server.
echo.
echo Opening the dist folder...
start dist
echo.
pause
goto END

:END
echo.
echo Thank you for installing SongStream!
echo.