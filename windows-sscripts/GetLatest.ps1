# Get the current script's directory
$DIR = Split-Path $PSScriptRoot -Parent

# Navigate relative to the current script's directory
# Update files
Set-Location $DIR
git pull

# Update dependancies and run build
Set-Location "$DIR\client"
npm install
npm run build

# Update dependancies on Server
Set-Location "$DIR\server"
npm install
