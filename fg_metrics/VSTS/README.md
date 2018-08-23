# Fenway Group Project Metrics

### fg-metrics

This project has two subcomponents:
- Extract project data from VSTS
- Load project data to MySQL

## Getting Started


## Prerequisites


## Deployment
crontab -e (disable runs)
git pull
cd /opt/metrics/environments/dev1/Coaches_Portal/fg_metrics/VSTS/VSTSComms/VSTSComms
- edit appSettings.json with correct environment
dotnet build
crontab -e (enable runs)

## Authors

---

* Kyle Branch
* Mark Morris
