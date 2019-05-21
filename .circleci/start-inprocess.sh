#!/bin/sh
set -e

cd /go/src/github.com/johanbrandhorst/grpc-web-compatibility-test

go build -o ./inprocess github.com/johanbrandhorst/grpc-web-compatibility-test/proxy/inprocess

./inprocess
