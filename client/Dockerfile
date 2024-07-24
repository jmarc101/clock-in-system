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
FROM nginx:1.26.1-alpine3.19
COPY --from=build /app/build /usr/share/nginx/html

#This is for the routing to work. Custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

