# Step 1 - Build
FROM node:18 as build

# Set Working Directory
WORKDIR /app

# Copy and run npm install first
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .
RUN npm run build

# Step 2 - Serve the app
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

