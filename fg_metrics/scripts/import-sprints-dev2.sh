#!/bin/bash
pushd /opt/metrics/environments/dev2/Coaches_Portal/fg_metrics/VSTS/VSTSComms/VSTSComms/bin/Debug/netcoreapp2.0
dotnet VSTSComms.dll load  2>&1 | tee -a /opt/metrics/environments/dev2/logs/sprint-import.log
popd