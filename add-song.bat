@echo off
echo SongStream - Add Song Tool
echo ==========================
echo.
echo This script will help you add songs to your SongStream application
echo.

:CHECK_DEPENDENCIES
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

:START_APP
echo.
echo Starting SongStream and navigating to Add Song page...
echo.

REM Start the application in the default browser with the add-song route
start http://localhost:4028/add-song

REM Check if the application is already running by trying to connect to the port
powershell -Command "$conn = New-Object System.Net.Sockets.TcpClient; try { $conn.Connect('localhost', 4028); Write-Host 'Application is already running.'; $conn.Close() } catch { Write-Host 'Starting application...'; Start-Process 'npm' -ArgumentList 'run', 'dev' -NoNewWindow }"

echo.
echo If the browser doesn't open automatically, please manually navigate to:
echo http://localhost:4028/add-song
echo.
echo Press any key to return to the main menu...
pause