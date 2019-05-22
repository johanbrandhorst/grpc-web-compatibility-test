#!/bin/bash
set -e

sudo pip install grpcio grpcWSGI

python3 ./proxy/grpcwsgi/server.py
