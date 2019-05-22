#!/bin/bash
set -e

CLEAN_JOB=$(echo $CIRCLE_JOB | sed -e 's/xfail-//')

IFS='-' read -r -a JOB_ARGS <<< "$CLEAN_JOB"

FRONTEND_TYPE=${JOB_ARGS[1]}

if [[ $CIRCLE_JOB = xfail-* ]]
then
    ! ./.circleci/run-frontend.sh $FRONTEND_TYPE
else
    ./.circleci/run-frontend.sh $FRONTEND_TYPE
fi
