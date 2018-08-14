#!/bin/bash

for env in dev1 dev2 prod; do
        /opt/metrics/scripts/import-timecards.sh $env
        sleep 5
done | tee -a /opt/metrics/logs/timecard-import/all-timecard-import.log
