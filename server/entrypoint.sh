#!/bin/sh

# Wait for the database service (change "postgres" if your service is named differently)
echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Run migrations
npx prisma migrate deploy

# Start your server (replace with your server start command if different)
node server.js

