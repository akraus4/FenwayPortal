#!/bin/bash

/opt/metrics/environments/dev2/Coaches_Portal/fg_metrics/scripts/import-timecards.sh dev2 | tee -a /opt/metrics/environments/dev2/logs/timecard-import.log
