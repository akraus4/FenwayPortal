***Setup and running script

1. Add a folder to your C: drive called Metrics. This is where the JSON file will write too.

2. Make sure you Accepted lists on your trello board are formated correctly.
	- Accepted Sprint sprintNumber sprintStartDate sprintEndDate
		- Ex: Accepted Sprint 26 5/23/2018 6/5/2018
		
3. Navigate to config/config.js and add your teams info in the teams object. It will need the following.
	- name = This is the name that will be added to the filename of the exported file.
	- board = This is the id of the board you wish to pull from.
	- key = This is the key of the user that you want to pull the data from.
	- token = This is the token of the user that you want to pull the data from.
	- acceptColumn = This is the position of the Accepted list  on your trello board.  Example below.
		- Ex: If you want to pull back the data from the latest Accepted list on your trello board, this will be 0.
		     If you want to pull back the data from 2 Accepted lists ago (2 Sprints ago), this will be 1, and so on.
			 
4.Navigate to src/load-trello.js, find the var team and set it equal to the team you wish to run.
	- Ex: var team = config.teams.noJsTeam;
	
5. Now navigate to Trello on your terminal and run the command 'npm start'. If everything was completed correctly you will 
   now have a JSON file in C:\Metrics.