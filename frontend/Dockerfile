FROM circleci/node:lts-browsers

COPY --chown=circleci:circleci . /home/node/src

WORKDIR /home/node/src

RUN npm ci

ENTRYPOINT ["node_modules/.bin/grunt"]