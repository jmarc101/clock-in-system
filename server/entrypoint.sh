#!/bin/sh

# Check if the database file exists
if [ ! -f "./data/database.sqlite" ]; then
    echo "database.sqlite not found. Creating database for Prisma..."
    npx prisma db push
fi

# Generate Prisma Client
npx prisma generate

# Always run migrations
npx prisma migrate deploy

# Start your application
node server.js

