# Get the current script's directory
$DIR = Split-Path $PSScriptRoot

# Navigate relative to the current script's directory
Set-Location "$DIR\client"

# Run build to listen on port 8080
serve -s build -l 8080
