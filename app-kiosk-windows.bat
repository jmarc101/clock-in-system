cd c:\repo\clock-in-system\server
start /b node server.js

cd C:\repo\clock-in-system\client
start /b serve -s build

TIMEOUT 10

start msedge --kiosk http://localhost:3000

