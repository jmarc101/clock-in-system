@echo off
CALL "C:\repo\clock-in-system\app-kiosk-windows.bat"
start msedge --kiosk "http://localhost:3000"
