@echo off
echo Building SongStream Desktop Application...
echo.
echo This script will build the application for distribution
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
echo Building SongStream for distribution...
call npm run build:electron

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error building the application.
    echo Please check that Node.js is installed and try again.
    pause
) else (
    echo.
    echo Build completed successfully!
    echo The installer can be found in the dist folder.
    pause
)