#!/bin/bash
set -e

sudo pip install grpcWSGI

python ./proxy/grpcwsgi/server.py
