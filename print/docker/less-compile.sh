#!/usr/bin/env bash

LESS=$1
CSS="`echo ${LESS} | cut -f 1 -d '.'`.css"

echo "Compiling ${LESS} to ${CSS}"

lessc -sm=on --clean-css ${LESS} ${CSS}