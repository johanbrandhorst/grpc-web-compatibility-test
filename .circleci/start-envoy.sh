#!/bin/bash
set -e

go build -o ./server github.com/johanbrandhorst/grpc-web-compatibility-test/backend
go build -o ./grpcwebproxy ./vendor/github.com/improbable-eng/grpc-web/go/grpcwebproxy

./server --grpc_port=9090 &

/usr/local/bin/envoy -c proxy/envoy/envoy.circleci.yaml -l info
