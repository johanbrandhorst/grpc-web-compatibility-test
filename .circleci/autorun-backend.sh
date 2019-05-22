#!/bin/bash
set -e

CLEAN_JOB=$(echo $CIRCLE_JOB | sed -e 's/xfail-//')
IFS='-' read -r -a JOB_ARGS <<< "$CLEAN_JOB"

BACKEND_TYPE=${JOB_ARGS[0]}

./.circleci/start-$BACKEND_TYPE.sh
