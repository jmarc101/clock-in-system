#!/bin/sh

# Always run migrations
npx prisma migrate deploy

# Start your application
node server.js
