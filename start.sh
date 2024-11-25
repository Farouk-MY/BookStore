#!/bin/bash   
echo "Starting backend..." 
cd backend
npm i
npm run start:dev &
echo "Starting frontend..."
cd ../frontend
npm i
npm run dev &
wait