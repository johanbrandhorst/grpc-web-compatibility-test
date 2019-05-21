#!/bin/sh
set -e

cd /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test/frontend

npm ci

./node_modules/.bin/grunt karma:$1 --grpc-host=http://localhost:10000
