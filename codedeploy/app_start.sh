#!/bin/bash

# This script is used to start the application
cd /usr/clttsapi
pm2 start /usr/clttsapi/bin/www -n www -f
