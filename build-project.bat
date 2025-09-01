@echo off
echo SongStream Build Tool
echo =====================
echo.
echo This script will help you build SongStream as a website or desktop application
echo.

:MENU
echo Choose build option:
echo 1. Build as Website (for web deployment)
echo 2. Build as Desktop Application (for Windows, macOS, Linux)
echo 3. Exit
echo.

set /p CHOICE=Enter your choice (1-3): 

if "%CHOICE%"=="1" goto WEBSITE
if "%CHOICE%"=="2" goto DESKTOP
if "%CHOICE%"=="3" goto END

echo Invalid choice. Please try again.
echo.
goto MENU

:WEBSITE
echo.
echo Building SongStream Website...
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
echo Building website for deployment...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error building the website.
    echo Please check that Node.js is installed and try again.
    pause
) else (
    echo.
    echo Website build completed successfully!
    echo The build files can be found in the dist folder.
    echo You can deploy these files to your web hosting service.
    pause
)

goto END

:DESKTOP
echo.
echo Building SongStream Desktop Application...
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
echo Building desktop application for distribution...
call npm run build:electron

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error building the desktop application.
    echo Please check that Node.js is installed and try again.
    pause
) else (
    echo.
    echo Desktop application build completed successfully!
    echo The installer can be found in the dist folder.
    pause
)

goto END

:END
echo.
echo Thank you for using SongStream Build Tool.