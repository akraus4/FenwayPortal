#!/bin/bash
pushd /opt/metrics/environments/prod/Coaches_Portal/fg_metrics/VSTS/VSTSComms/VSTSComms/bin
dotnet VSTSComms.dll load
popd