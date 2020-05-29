#!/bin/bash
set -e

sudo pip3 install grpcio protobuf sonora

python3 ./proxy/grpcwsgi/server.py
