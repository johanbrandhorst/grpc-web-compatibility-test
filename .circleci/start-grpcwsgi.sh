#!/bin/bash
set -e

sudo pip3 install grpcio protobuf grpcWSGI

python3 ./proxy/grpcwsgi/server.py
