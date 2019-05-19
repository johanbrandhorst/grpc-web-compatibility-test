FROM circleci/node:lts-browsers

COPY --chown=circleci:circleci . /home/node/src

WORKDIR /home/node/src

RUN npm install

ENTRYPOINT exec node_modules/.bin/grunt