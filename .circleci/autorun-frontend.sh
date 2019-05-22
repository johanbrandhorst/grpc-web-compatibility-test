#!/bin/sh
set -e

IFS='-' read -r -a JOB_ARGS <<< "$CIRCLE_JOB"

FRONTEND_TYPE=${JOB_ARGS[1]}

./.circleci/run-$FRONTEND_TYPE.sh
