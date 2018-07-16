import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MetricsService } from '../services/metrics.service';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})

export class MetricsComponent implements OnInit {
  title = 'POST Request'
  TeamChoices = [];
  metricsService: any;
  signInComponent: any;
  SprintChoices = [];
  StoryChoices;
  TeamMemberChoices = [];
  currentSprintId: any;
  storyCount = 0;
  sprintCount = 0;
  storiesBySprintCount = 0;
  usersPoints;
  storiesBySprint = [];
  storyData;
  sprintIds;
  currentTeamMemberId: string;
  Team = new FormControl();    //This is the array for the team selection.
  Sprint = new FormControl();    //This is the array for the sprint selection.

  constructor(@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService;
  }


  ngOnInit() {
    document.getElementById('metricsPageGridDiv').style.display = 'block';
    this.getAllTeams();
  };
  

  getAllTeams() {
    this.metricsService.getAllTeams()
      .map(res => { return res.json(); })
      .subscribe((results) => { this.TeamChoices = results });
  }

  getAllSprintsByTeam(system_id) {
    this.metricsService.getAllSprintsBySystem(system_id)
      .map(res => { return res.json(); })
      .subscribe((results) => this.SprintChoices = results);
  }

  storeSprintId(sprint_ids) {
    var i = 0;
    this.currentSprintId = [];
    for (i = 0; i < sprint_ids.length; i++) {
      this.currentSprintId.push(sprint_ids[i].agile_sprint_id);
    }
    if (this.currentSprintId==""){
      (<HTMLInputElement>document.getElementById("metricsSearchBtn")).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById("metricsSearchBtn")).disabled = false;
    }
  }

  storeTeamMemberId(team_member_id) {
    this.currentTeamMemberId = team_member_id
  }

  getSprintIdString() {
    var i = 0;
    for (i = 0; i < this.currentSprintId.length; i++) {
      if (i == 0) {
        this.sprintIds = this.currentSprintId[i];
      } else {
        this.sprintIds = this.sprintIds + "', '" + this.currentSprintId[i];
      }
    }
  }

  getAllStoriesWithUsersBySprint() {
    this.metricsService.showLoadingPanel()
    this.getSprintIdString()
    this.metricsService.getAllStoriesWithUsersBySprint(this.sprintIds)
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
    for (i = 0; i < this.storyData.length; i++) {
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
  }
}