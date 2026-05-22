@echo off
title EduSphere AI - Autonomous Campus OS Launcher
cls

echo ======================================================================
echo      ______   _         _____         _                     
echo     ^|  ____^| ^| ^|       ^|  __ \       ^| ^|                    
echo     ^| ^|__  __^| ^| _   _ ^| ^|__) ^|___ ^| ^|__   ___ _ __ ___    
echo     ^|  __^|/ _` ^| ^| ^| ^| ^|  ___// __^| ^| '_ \ / _ \ '__/ _ \   
echo     ^| ^|__^| (_^| ^| ^|_^| ^|_^| ^|    \__ \ ^| ^| ^| ^|  __/ ^| ^|  __/   
echo     ^|______\__,_^|\__,_(_)_^|    ^|___/_^|_^| ^|_^|\___^|_^|  \___^|   
echo                                                                    
echo       Autonomous Campus Multi-Agent Coordination Operating System    
echo ======================================================================
echo.

echo [+] Performing system diagnostics...
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Error: Node.js was not detected on your system.
    echo Please install Node.js (v18+) from https://nodejs.org/ to run the frontend client.
    pause
    exit /b
)
echo   - Node.js is detected.

:: Check NPM
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Error: NPM was not detected on your system.
    pause
    exit /b
)
echo   - NPM is detected.

:: Check Python
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo   - Python:            Not detected on PATH (Optional, required for backend)
    set python_avail=0
) else (
    echo   - Python is detected.
    set python_avail=1
)

echo.
echo [+] Resolving node dependencies...
if not exist node_modules (
    echo [!] node_modules folder not found. Triggering 'npm install'...
    call npm install
    if %errorlevel% neq 0 (
        echo [!] Error: 'npm install' failed.
        pause
        exit /b
    )
    echo [+] Node modules installed successfully.
) else (
    echo [+] Node modules verified (already installed).
)

echo.
:menu
echo ======================================================================
echo Please select an operation mode for EduSphere AI:
echo ======================================================================
echo  [1] Start Frontend Client ONLY (Mock Swarm Mode - 100%% Offline Safe)
echo  [2] Start FastAPI Swarm Backend ONLY (Requires MongoDB ^& LLM Keys)
echo  [3] Start Full Stack (Starts both Frontend and Backend concurrently)
echo  [4] Exit
echo ======================================================================
echo.

set /p choice="Enter choice [1-4]: "

if "%choice%"=="1" goto start_fe
if "%choice%"=="2" goto start_be
if "%choice%"=="3" goto start_both
if "%choice%"=="4" exit
echo Invalid selection. Please enter a number from 1 to 4.
echo.
goto menu

:start_fe
cls
echo ======================================================================
echo            LAUNCHING EDUSPHERE CLIENT IN MOCK DEMO MODE             
echo ======================================================================
echo This starts only the Vite development server. The dashboard and chatbot
echo will operate with zero backend dependencies, utilizing our high-fidelity
echo client-side simulated agent networks. Perfect for presentation slides!
echo ======================================================================
echo.
echo Starting Vite server at http://localhost:3000...
npm run dev
pause
exit /b

:start_be
cls
if %python_avail% neq 1 (
    echo [!] Error: Python must be installed and on your PATH to launch the backend.
    pause
    goto menu
)
echo ======================================================================
echo            LAUNCHING EDUSPHERE AI FASTAPI SWARM CORE                 
echo ======================================================================
echo This launches the Python REST/Socket.IO backend at http://localhost:8000.
echo Make sure your MongoDB instance is running locally or configured via
echo the MONGO_URI environment variable.
echo ======================================================================
echo.
echo Installing requirements...
pip install -r backend/requirements.txt
if %errorlevel% neq 0 (
    echo [!] Pip install failed. Attempting to start regardless...
)
echo Starting FastAPI via Uvicorn...
cd backend
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
cd ..
pause
exit /b

:start_both
cls
if %python_avail% neq 1 (
    echo [!] Python was not detected. Launching frontend client only...
    pause
    goto start_fe
)
echo ======================================================================
echo            LAUNCHING EDUSPHERE AI FULL STACK SUITE                   
echo ======================================================================
echo This will spawn the FastAPI core inside a new background window and
echo start the React/Vite development server in this terminal window.
echo ======================================================================
echo.

echo [+] Spawning FastAPI Swarm Backend...
start "EduSphere Swarm Backend" cmd /c "echo Installing python dependencies... && pip install -r backend/requirements.txt && cd backend && uvicorn app:app --host 127.0.0.1 --port 8000 --reload"

echo [+] Starting React Frontend Client...
npm run dev
pause
exit /b
