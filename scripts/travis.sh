#!/bin/bash

set -ev

npm run lint
make formatCheck
npm run build
tsc -d
npm run umd
