#!/bin/bash

cd /server/hub
pm2 start npm --name "hub" -- run dev

## Start apps 

cd /server/apps/api-console
pm2 start npm --name "api-console" -- run dev

