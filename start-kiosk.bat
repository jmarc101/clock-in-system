@echo off

cd "%~dp0\server"
start /b node server.js

cd "%~dp0\client"
start C:\Users\desktop\AppData\Roaming\npm\serve.cmd -s build
start msedge --kiosk "http://localhost:3000"
