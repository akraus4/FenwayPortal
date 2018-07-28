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
    this.metricsService.getAll('AgileSystems', 'workTeam', '')

      .map(res => { return res.json(); })
      .subscribe((results) => { this.TeamChoices = results });
  }

  getAllSprintsByTeam(systemId) {
    this.metricsService.getAll('AgileSprints', 'agileSystem', `agileSystem=${systemId}`)
      .map(res => { return res.json(); })
      .subscribe((results) => this.SprintChoices = results);
  }

  storeSprintId(sprintIds) {
    var i = 0;
    this.currentSprintId = [];
    for (i = 0; i < sprintIds.length; i++) {
      this.currentSprintId.push(sprintIds[i].agilesprintId);
    }
    if (this.currentSprintId==''){
      (<HTMLInputElement>document.getElementById('metricsSearchBtn')).disabled = true;
    } else {
      (<HTMLInputElement>document.getElementById('metricsSearchBtn')).disabled = false;
    }
  }

  storeTeamMemberId(teamMemberId) {
    this.currentTeamMemberId = teamMemberId;
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
      var user = this.storyData[i].agileSystemUserName
      var name = user.split(' <')
      this.storyData[i].agileSystemUserName = name[0]
    }
  }

  getUsersPoints() {
    this.StoryChoices.sort(function (obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.agileSystemUserName - obj2.agileSystemUserName;
    });
    var i;
    var lastUser = '';
    var totalPoints = 0;
    for (i = 0; i < this.StoryChoices.length; i++) {
      if (lastUser == this.StoryChoices[i].agileSystemUserName) {
        totalPoints = totalPoints + this.StoryChoices[i].agileSystemUserStoryPoints;
      } else {
        if (lastUser != '') {
          let userWithTotalPoints = {
            'user': lastUser,
            'totalPoints': totalPoints
          }
          this.usersPoints.push(userWithTotalPoints);
        }
        lastUser = this.StoryChoices[i].agileSystemUser;
        totalPoints = this.StoryChoices[i].agileSystemUserStoryPoints;
      }
    }
  }

  getStoryCount() {
    var i;
    var j;
    this.storiesBySprint = [];
    this.storyCount = 0;
    this.storiesBySprintCount = 0;
    var lastStory = '';
    var lastSprint = '';
    var numberOfStories = this.StoryChoices.length - 1;
    for (i = 0; i < this.StoryChoices.length; i++) {
      if (lastSprint == this.StoryChoices[i].agileSprintId || lastSprint == '') {
        if (lastStory != this.StoryChoices[i].agileStoryId) {
          this.storiesBySprintCount++;
          lastStory = this.StoryChoices[i].agileStoryId;
        }
        if (i == numberOfStories) {
          var getStoriesBySprint = {
            'arg': this.StoryChoices[i - 1].agileSprintName,
            'val': this.storiesBySprintCount
          };
          this.storiesBySprint.push(getStoriesBySprint);
        }
      } else {
        var getStoriesBySprint = {
          'arg': this.StoryChoices[i - 1].agileSprintName,
          'val': this.storiesBySprintCount
        };
        this.storiesBySprint.push(getStoriesBySprint);
        this.storiesBySprintCount = 0;
      }
      lastSprint = this.StoryChoices[i].agileSprintId;
    }
  }
}
