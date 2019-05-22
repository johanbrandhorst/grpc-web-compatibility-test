#!/bin/bash
set -e

go build -o ./server github.com/johanbrandhorst/grpc-web-compatibility-test/backend
go build -o ./grpcwebproxy ./vendor/github.com/improbable-eng/grpc-web/go/grpcwebproxy

./server --grpc_port=9090 &

./grpcwebproxy \
    --backend_addr=dns:///localhost:9090 \
    --backend_tls_noverify=true \
    --run_tls_server=false \
    --use_websockets=true \
    --allow_all_origins=true
