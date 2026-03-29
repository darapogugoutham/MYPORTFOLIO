#!/bin/bash

# Portfolio startup script - runs both backend and frontend

echo "🚀 Starting Goutham's Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start backend
echo "📦 Starting backend server on port 5000..."
cd "$SCRIPT_DIR/backend"
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "⚛️  Starting frontend on port 3000..."
cd "$SCRIPT_DIR/frontend"
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Portfolio is starting!"
echo ""
echo "📍 Backend: http://localhost:5000"
echo "📍 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
