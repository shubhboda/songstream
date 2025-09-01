@echo off
echo SongStream Launcher
echo =================
echo.
echo This script will help you run SongStream as a website or desktop application
echo.

:MENU
echo Choose launch option:
echo 1. Run as Website (in browser)
echo 2. Run as Desktop Application
echo 3. Add Songs to Library
echo 4. Exit
echo.

set /p CHOICE=Enter your choice (1-4): 

if "%CHOICE%"=="1" goto WEBSITE
if "%CHOICE%"=="2" goto DESKTOP
if "%CHOICE%"=="3" goto ADD_SONG
if "%CHOICE%"=="4" goto END

echo Invalid choice. Please try again.
echo.
goto MENU

:WEBSITE
echo.
echo Starting SongStream Website...
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
echo Starting website in development mode...
echo The website will be available at: http://localhost:4028
echo.
call npm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error starting the website.
    echo Please check that Node.js is installed and try again.
    pause
)

goto END

:DESKTOP
echo.
echo Starting SongStream Desktop Application...
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
echo Starting desktop application in development mode...
call npm run dev:electron

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error starting the desktop application.
    echo Please check that Node.js is installed and try again.
    pause
)

goto END

:ADD_SONG
echo.
echo Starting SongStream Add Song Tool...
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
echo Starting SongStream and navigating to Add Song page...
echo.

REM Start the application in the default browser with the add-song route
start http://localhost:4028/add-song

REM Start the application if it's not already running
call npm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo Error starting the application.
    echo Please check that Node.js is installed and try again.
    pause
)

goto END

:END
echo.
echo Thank you for using SongStream Launcher.