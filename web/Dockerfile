# Start from node image
FROM node:8.11

MAINTAINER Tom Meagher

# Create dir for code
RUN mkdir /home/web
WORKDIR /home/web

# Install yarn and nodemon globally
RUN npm i -g yarn nodemon
RUN yarn cache clean

# Copy over node requirements and install
ADD package.json /home/web/
RUN yarn

# Copy over remaining code
ADD . /home/web/

VOLUME /home/web
