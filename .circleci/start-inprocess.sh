#!/bin/bash
set -e

go build -o ./inprocess github.com/johanbrandhorst/grpc-web-compatibility-test/proxy/inprocess

./inprocess
