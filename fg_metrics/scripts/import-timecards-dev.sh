#!/bin/bash

/opt/metrics/environments/dev1/Coaches_Portal/fg_metrics/scripts/import-timecards.sh dev1 | tee -a /opt/metrics/environments/dev1/logs/timecard-import.log
