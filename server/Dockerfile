FROM node:20-alpine3.17

# Create app directory
WORKDIR /usr/src/app

COPY entrypoint.sh .
RUN chmod +x /usr/src/app/entrypoint.sh


# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .


CMD [ "sh", "./entrypoint.sh" ]


