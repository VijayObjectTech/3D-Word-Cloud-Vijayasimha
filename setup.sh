#!/usr/bin/env bash

# Exit immediately if any command fails
set -e

echo "=================================="
echo "   3D Word Cloud - Setup & Launch"
echo "=================================="

# Step 1 - Install Python packages
echo ""
echo "[1/3] Installing Python dependencies..."
cd backend
pip3 install -r requirements.txt --quiet
cd ..

# Step 2 - Install Node packages
echo ""
echo "[2/3] Installing Node dependencies..."
cd frontend
npm install --silent
cd ..

# Step 3 - Start both servers at the same time
echo ""
echo "[3/3] Starting servers..."
echo "  Backend  is running at http://localhost:8000"
echo "  Frontend is running at http://localhost:5173"
echo ""

# Run backend in background
cd backend
python3 -m uvicorn main:app --reload --port 8000 &
cd ..

# Run frontend in background
cd frontend
npm run dev &
cd ..

# Wait for both to finish
wait