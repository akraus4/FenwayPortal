var getTrello = require('./getTrello');
var config = require('../config/config');
var team = config.teams.dataScrubbers;
var systemID;
var sprintID;
var sprintName;
var sprintStartDate;
var sprintEndDate;
var fs = require('fs');
const path = require('path');

getTrello.getList(team.boardId, team.key, team.token, team.acceptedListInt).then((listResult) => {
        for (var list in listResult) {
                systemID = listResult.idBoard;
                sprintID = listResult.id;

                var sprint = listResult.name.split(/[\s]+/);
                sprintName = "Sprint " + sprint[2];
                sprintStartDate = sprint[3];
                sprintEndDate = sprint[4];

        }
        getTrello.getAcceptedCards(team.key, team.token).then((result) => {
                var newStories = [];

                for (var card in result) {
                        var name = JSON.stringify(result[card].name);
                        var pointsExp = /\(([^)]+)\)/;
                        var point = pointsExp.exec(name);
                        let member = {
                                'user': result[card].idMembers[0],
                                'user_points': point !== null ? point[1] : "no points",
                        }

                        let story = {
                                'story_id': result[card].id,
                                'story_points': point !== null ? point[1] : "no points",
                                'assigned _ to': member
                        }
                        newStories.push(story);
                        console.log(story);

                }

                let stories = {
                        "sprint_id": sprintID,
                        "sprint_name": sprintName,
                        "sprint_start_date": sprintStartDate,
                        "sprint_end_date": sprintEndDate,
                        "stories: ": newStories
                };
                // var path = `C:\\Metrics\\Exports\\${team.teamName}_${sprintName}.json`;
                var fileName = `${team.teamName}_${sprintName}.json`;
                var dir = team.path;
                mkDirByPathSync(dir, {isRelativeToScript: true});

                fs.writeFile(dir + fileName, JSON.stringify(stories, null, 4), (err) => {
                        if (err) {
                                console.error(err);
                                return;
                        };
                        console.log(`File has been loggged to ${team.teamName}_${sprintName}.json`);
                });
        })
})


function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir) ? sep : '';
        const baseDir = isRelativeToScript ? __dirname : '.';
      
        return targetDir.split(sep).reduce((parentDir, childDir) => {
          const curDir = path.resolve(baseDir, parentDir, childDir);
          console.log(`CurDir === ${curDir}`);
          try {
            fs.mkdirSync(curDir);
          } catch (err) {
            if (err.code === 'EEXIST') { // curDir already exists!
              return curDir;
            }
      
            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
              throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
            }
      
            const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && targetDir === curDir) {
              throw err; // Throw if it's just the last created dir.
            }
          }
      
          return curDir;
        }, initDir);
      }
