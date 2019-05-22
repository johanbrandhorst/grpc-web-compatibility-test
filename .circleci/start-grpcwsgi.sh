#!/bin/bash
set -e

sudo pip install grpcio grpcWSGI

python ./proxy/grpcwsgi/server.py
