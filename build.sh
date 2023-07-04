#!/usr/bin/env bash
# exit on error
set -o errexit

choco upgrade nodejs

yarn
yarn build
yarn typeorm migration:run -d dist/data-source