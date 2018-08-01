# Fenway Group Project Metrics
### fg-metrics

This project is for pulling cards from accepted lists in Trello and writing them to a file.

## Getting Started
---
These instructions are for getting setup locally for the first time.

1. Start by navigating to the Trello directory in terminal and installing all of the project's dependencies using the command below.

        npm install

2. Make sure your list names are using the following format.

        Accepted sprintName startDate endDate
        EX: Accepted Sprint 1 1/21/2018 1/28/2018

3. Then open config.js under config directory and add your team to config info just like the examples.

        teamName = This is what is used to create the filename.
        key = This is the key of the users Trello account you are using.
        token = This is the token of the users Trello account you are using.
        boardId = This is the sys id of the board you are pulling cards from.
        acceptedListInt = This is the the number of the accepted column you are wanting to pull cards from. EX: If you want to pull the newest accepted list this will be 0, if you wanted the second this will be 1, and so on.
        path = This is the path you want the file to save to.

4. Next open src/load-trello.js, look for the team variable at the top of the file and point that team to the team in the config file you just created.

5. Finally go back to the terminal and run the command below. After this your file should be placed in the path you specified in the config.js.

        npm start


## Prerequisites
---
* NodeJS https://nodejs.org/en/


## Authors
---
* Joshua Fuller

    
