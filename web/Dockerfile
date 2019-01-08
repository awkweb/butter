# Start from node image
FROM node:8.11

MAINTAINER Tom Meagher

# Create dir for code
RUN mkdir /home/web
WORKDIR /home/web

# Install yarn globally
RUN npm i -g yarn
RUN chmod u+x /usr/local/bin/yarn

# Copy over node requirements and install
ADD package.json /home/web/
RUN yarn

# Copy over remaining code
ADD . /home/web/
VOLUME /home/web
