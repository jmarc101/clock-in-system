# Get the current script's directory
$DIR = Split-Path $PSScriptRoot -Parent

# Navigate relative to the current script's directory
Set-Location "$DIR\server"
npx prisma studio