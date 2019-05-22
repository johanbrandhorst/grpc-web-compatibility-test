#!/bin/sh
set -e

IFS='-' read -r -a JOB_ARGS <<< "$CIRCLE_JOB"

BACKEND_TYPE=${JOB_ARGS[1]}

./.circleci/start-$BACKEND_TYPE.sh
