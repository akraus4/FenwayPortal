#!/bin/bash

/opt/metrics/environments/prod/Coaches_Portal/fg_metrics/scripts/import-timecards.sh prod  2>&1 | tee -a /opt/metrics/environments/prod/logs/timecard-import.log
