#!/bin/sh
set -e

cd /home/circleci/project

go build -o ./inprocess github.com/johanbrandhorst/grpc-web-compatibility-test/proxy/inprocess

./inprocess
