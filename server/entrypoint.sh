#!/bin/sh

# Check if the database file exists
if [ ! -f "./data/mydb.sqlite" ]; then
    echo "mydb.sqlite not found. Creating database for Prisma..."
    npx prisma db push
fi

# Generate Prisma Client
npx prisma generate

# Start your application
node server.js
