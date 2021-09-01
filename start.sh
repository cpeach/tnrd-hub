#!/bin/bash

cd /server/hub
pm2 start npm --name "hub" -- run dev

## Start apps 

cd /server/test
pm2 start npm --name "test" -- run dev


## Back to hub
cd /server/hub
