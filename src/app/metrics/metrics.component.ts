import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MetricsService } from '../services/metrics.service';
import { MatTableDataSource } from '@angular/material';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';


// if(!/localhost/.test(document.location.host)) {
//   enableProdMode();
// }


@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})

  
export class MetricsComponent implements OnInit {

  title = 'POST Request'
  TeamChoices = [];
  metricsService: any;
  SprintChoices = [];
  StoryChoices;
  TeamMemberChoices = [];
  currentSprintId = [];
  storyCount = 0;
  sprintCount = 0;
  storiesBySprintCount = 0;
  usersPoints;
  storiesBySprint = [];
  storyData;

  currentTeamMemberId: string;
  // dataSource = this.StoryChoices;
  // dataSource: WeekData[];
  constructor(@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService;
   
  }

  ngOnInit() {
    document.getElementById('gridGraphMetricsPageDiv').style.display = 'block';
    this.getAllTeams();
  };

  // displayedColumns = ['agile_story_id', 'agile_story_name', 'agile_sprint_id', 'story_type', 'story_points', 'agile_system_user_id'];
  // dataSource = new MatTableDataSource(this.StoryChoices);

  Team = new FormControl();    //This is the array for the team selection.
  Sprint = new FormControl();    //This is the array for the sprint selection.

  getAllTeams() {
    this.metricsService.getAllTeams()
      .map(res => { return res.json(); })
      .subscribe((results) =>{this.TeamChoices = results});
  }

  getAllSprintsByTeam(system_id) {
    // console.log(system_id);
    this.metricsService.getAllSprintsBySystem(system_id)
      .map(res => { return res.json(); })
      .subscribe((results) => this.SprintChoices = results);
    // this.getAllUsersByTeam(system_id);
  }

  // getAllUsersByTeam(system_id) {
  //   // console.log(system_id);
  //   this.metricsService.getAllUsersBySystem(system_id)
  //     .map(res => { return res.json(); })
  //     .subscribe((results) => this.TeamMemberChoices = results);
  // }

  storeSprintId(sprint_ids) {
    // if more than one sprint id need to add "OR" between to enable SQL statement to understand multipule inputs
    var i = 0;
    this.currentSprintId = [];
    for (i = 0; i < sprint_ids.length; i++) {
         
      this.currentSprintId.push(sprint_ids[i].agile_sprint_id);
    }
    (<HTMLInputElement>document.getElementById("formCompleteButton")).disabled = false;
  }

  storeTeamMemberId(team_member_id) {
    this.currentTeamMemberId = team_member_id
  }

  getAllStoriesWithUsersBySprint() {
    this.metricsService.showLoadingPanel()
      this.metricsService.getAllStoriesWithUsersBySprint(this.currentSprintId)
      .map(res => { console.log(res); return res.json(); })
      .subscribe((results) => {
        this.storyData = results;
        this.getFullName();
        this.StoryChoices = this.storyData;
        this.getStoryCount()
        this.getUsersPoints()
        this.metricsService.hideLoadingPanel()
      });
    }
  
  getFullName() {
    var i = 0
    for(i = 0; i < this.storyData.length; i++){
        var user = this.storyData[i].agile_system_user_name
        var name = user.split(" <")
        this.storyData[i].agile_system_user_name = name[0]
    }
  }


    getUsersPoints() {
      this.StoryChoices.sort(function (obj1, obj2) {
        // Ascending: first age less than the previous
        return obj1.agile_system_user - obj2.agile_system_user;
      });
      var i;
      var lastUser = '';
      var totalPoints = 0;
      // console.log(this.StoryChoices)
      for (i = 0; i < this.StoryChoices.length; i++) {
        if (lastUser == this.StoryChoices[i].agile_system_user) {
          totalPoints = totalPoints + this.StoryChoices[i].agile_system_user_story_points;
        } else {
          if (lastUser != '') {
            let userWithTotalPoints = {
              'user': lastUser,
              'totalPoints': totalPoints
            }
            this.usersPoints.push(userWithTotalPoints);
          }
          lastUser = this.StoryChoices[i].agile_system_user;
          totalPoints = this.StoryChoices[i].agile_system_user_story_points;
        }
      }
      // console.log("Users Points: " + JSON.stringify(this.usersPoints));
    }

    getStoryCount() {
      var i;
      var j;
      this.storiesBySprint = [];
      this.storyCount = 0;
      this.storiesBySprintCount = 0;
      var lastStory = "";
      var lastSprint = "";
      var numberOfStories = this.StoryChoices.length - 1;

      for (i = 0; i < this.StoryChoices.length; i++) {
        // console.log('i = ' + i + ' number of stories = ' + numberOfStories)
        if (lastSprint == this.StoryChoices[i].agile_sprint_id || lastSprint == "") {

          if (lastStory != this.StoryChoices[i].agile_story_id) {
            this.storiesBySprintCount++;
            lastStory = this.StoryChoices[i].agile_story_id;
          }

          if (i == numberOfStories) {
            var getStoriesBySprint = {
              "arg": this.StoryChoices[i - 1].agile_sprint_name,
              "val": this.storiesBySprintCount
            };
            this.storiesBySprint.push(getStoriesBySprint);
          }

        } else {
          var getStoriesBySprint = {
            "arg": this.StoryChoices[i - 1].agile_sprint_name,
            "val": this.storiesBySprintCount
          };

          this.storiesBySprint.push(getStoriesBySprint);
          this.storiesBySprintCount = 0;
        }

        lastSprint = this.StoryChoices[i].agile_sprint_id;
      }
      // console.log("StoriesBySprint: " + JSON.stringify(this.storiesBySprint))
    }

    // getStoriesBySprints() {
    //   var i;
    //   this.sprintCount = 0;
    //   var lastSprint = "";
    //   for (i = 0; i < this.StoryChoices.length; i++) {
    //     if (lastSprint != this.StoryChoices[i].agile_sprint_name) {
    //       this.sprintCount++;
    //       lastSprint = this.StoryChoices[i].agile_sprint_name;
    //     }
    //   }
    //   console.log("sprint Count = " + this.sprintCount);
    // }
}


