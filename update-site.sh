#!/bin/bash
ssh 2018.foss4g.org "cd /var/www/html/; git fetch; git reset --hard origin/master"
