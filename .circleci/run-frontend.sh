#!/bin/bash
set -e

cd ./frontend

npm ci

./node_modules/.bin/grunt karma:$1 --grpc-host=http://localhost:8080
