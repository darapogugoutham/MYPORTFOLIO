@echo off
REM Portfolio startup script for Windows

echo Starting Goutham's Portfolio...
echo.

REM Start backend
echo Starting backend server on port 5000...
cd backend
start cmd /k npm run dev

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend
echo Starting frontend on port 3000...
cd ../frontend
start cmd /k npm start

echo.
echo Portfolio is starting!
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
