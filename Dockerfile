FROM node:lts-alpine

ENV PORT 3000

# apline does't come with bash, so install one and no cache to have the image with an small size
RUN apk add --no-cache bash

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app
RUN npm run build
# Building app
# RUN npm run build
EXPOSE 3000

# Running the app
WORKDIR /usr/src/app
CMD "npm" "run" "start"
