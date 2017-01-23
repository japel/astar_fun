#!/bin/sh

# Fail fast, including pipelines
set -eo pipefail

APP_DIR="/opt/apps"
APP_SCRIPT_FILE="${APP_DIR}/app.js"

APP_PORT=1337 node $APP_SCRIPT_FILE
