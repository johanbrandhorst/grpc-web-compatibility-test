FROM node:latest

COPY . /home/node/src

WORKDIR /home/node/src/frontend/improbable

RUN npm install
RUN ./node_modules/.bin/webpack

ENTRYPOINT exec npm test