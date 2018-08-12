#!/bin/bash
pushd /opt/metrics/environments/dev1/Coaches_Portal/fg_metrics/VSTS/VSTSComms/VSTSComms/bin/Debug/netcoreapp2.0
echo "$(date "+[%F %T]") - [ INFO ]  - Starting Sprint Load." | tee -a /opt/metrics/environments/dev1/logs/sprint-import.log
dotnet VSTSComms.dll load 2>&1 | tee -a /opt/metrics/environments/dev1/logs/sprint-import.log
echo "$(date "+[%F %T]") - [ INFO ]  - Completed Sprint Load." | tee -a /opt/metrics/environments/dev1/logs/sprint-import.log
popd