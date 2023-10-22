# Navigate to server directory and start it
Set-Location "c:\repo\clock-in-system\server"
Start-Process "node" -ArgumentList "server.js" -NoNewWindow

# Navigate to client directory and serve the build
Set-Location "C:\repo\clock-in-system\client"
Start-Process "serve" -ArgumentList "-s build" -NoNewWindow

# Wait for 10 seconds
Start-Sleep -Seconds 10

# Launch Google Chrome in kiosk mode
Start-Process "chrome" -ArgumentList "--kiosk http://localhost:3000"
