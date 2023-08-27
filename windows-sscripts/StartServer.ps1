# Get the current script's directory
$DIR = Split-Path $PSScriptRoot

# Navigate relative to the current script's directory
Set-Location "$DIR\server"

# run server
node server.js
