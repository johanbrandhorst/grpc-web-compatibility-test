#!/bin/bash
set -e

IFS='-' read -r -a JOB_ARGS <<< "$CIRCLE_JOB"

BACKEND_TYPE=${JOB_ARGS[0]}
FRONTEND_TYPE=${JOB_ARGS[1]}

declare -A BACKEND_PORTS
BACKEND_PORTS[inprocess]=8080
BACKEND_PORTS[grpcwebproxy]=8080

./.circleci/run-frontend.sh $FRONTEND_TYPE ${BACKEND_PORTS[$BACKEND_TYPE]}
