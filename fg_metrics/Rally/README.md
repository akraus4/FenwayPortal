# Metrics pulldown for Rally

Steps to run this project:

1. Make sure that WinSCP is installed
2. Move the winscp.bat file to `c:\scripts\`
3. Move the fenway_metrics_inbound.ppk file to the WinSCP directory (ususally in `c:\program files (x86)\WinSCP\`)
4. Create or configure your configuration file based on the files located in the config subdirectory
5. Run `npm install` command
6. Run `node rally.js [teamname]` command (i.e. `node rally.js CDMMS`)
