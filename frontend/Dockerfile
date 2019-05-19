FROM circleci/node:lts-browsers

COPY --chown=circleci:circleci . /home/node/src

WORKDIR /home/node/src

RUN ls -l 
RUN npm install

ENTRYPOINT exec npx grunt