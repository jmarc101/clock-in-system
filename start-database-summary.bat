@echo off

cd c:\repo\clock-in-system\server
start /b node server.js
start /b npx prisma studio
cd C:\repo\clock-in-system\client
start C:\Users\desktop\AppData\Roaming\npm\serve.cmd -s build


start msedge --kiosk "http://localhost:3000/summary"
