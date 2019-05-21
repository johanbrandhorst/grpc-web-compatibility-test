#!/bin/sh
set -e

cd /home/circleci/project/frontend

npm ci

./node_modules/.bin/grunt karma:$1 --grpc-host=http://localhost:10000
