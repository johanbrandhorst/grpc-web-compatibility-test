#!/bin/sh
set -e

cd ./frontend

npm ci

./node_modules/.bin/grunt karma:$1 --grpc-host=http://localhost:$2
