import { Component, Inject, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MetricsService } from '../services/metrics.service'

@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})

export class MetricsComponent implements OnInit {
  title = 'POST Request'
  TeamChoices = []
  metricsService: any
  signInComponent: any
  SprintChoices = []
  StoryChoices
  TeamMemberChoices = []
  currentSprintId: any
  storyCount = 0
  sprintCount = 0
  storiesBySprintCount = 0
  usersPoints
  storiesBySprint = []
  storyData
  sprintIds
  currentTeamMemberId: string
  Team = new FormControl()    // This is the array for the team selection.
  Sprint = new FormControl()    // This is the array for the sprint selection.

  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
  }
  ngOnInit () {
    document.getElementById('metricsPageGridDiv').style.display = 'block'
    this.getAllTeams()
  }

  getAllTeams () {
    this.metricsService.getAll('AgileSystems', 'workTeam', '')

      .map(res => { return res.json() })
      .subscribe((results) => { this.TeamChoices = results })
  }

  getAllSprintsByTeam (systemId) {
    this.metricsService.getAll('AgileSprints', 'agileSystem', `agileSystem=${systemId}`)
      .map(res => { return res.json() })
      .subscribe((results) => this.SprintChoices = results)
  }

  storeSprintId (sprintIds) {
    let i = 0
    this.currentSprintId = []
    for (i = 0; i < sprintIds.length; i++) {
      this.currentSprintId.push(sprintIds[i].agileSprintId)
    }
    if (this.currentSprintId === '') {
      (<HTMLInputElement> document.getElementById('metricsSearchBtn')).disabled = true
    } else {
      (<HTMLInputElement> document.getElementById('metricsSearchBtn')).disabled = false
    }
  }

  storeTeamMemberId (teamMemberId) {
    this.currentTeamMemberId = teamMemberId
  }

  getSprintIdString () {
    let i = 0
    for (i = 0; i < this.currentSprintId.length; i++) {
      if (i === 0) {
        this.sprintIds = this.currentSprintId[i]
      } else {
        this.sprintIds = this.sprintIds + "', '" + this.currentSprintId[i]
      }
    }
  }

  getAllStoriesWithUsersBySprint () {
    this.metricsService.showLoadingPanel()
    let i = 0
    for (i = 0; i < this.currentSprintId.length; i++) {
      if (i === 0) {
        this.sprintIds = this.currentSprintId[i]
      } else {
        this.sprintIds = this.sprintIds + ',' + this.currentSprintId[i]
      }
    }
    this.metricsService.getAllStoriesPointsByUser(this.sprintIds)
      .map(res => { return res.json() })
      .subscribe((results) => {

        let newResults = []
        for (let story of results) {
          for (let userPoints of story.agileStoryAgileSystemUsers) {
            let newStory = {
              'agileStoryId': story.agileStoryId,
              'agileStoryName': story.agileStoryName,
              'agileSprintName': story.agileSprint.agileSprintName,
              'storyDescription': story.storyDescription,
              'storyType': story.storyType,
              'storyStatus': story.storyStatus,
              'totalPoints': story.storyPoints,
              'systemUser': userPoints.agileSystemUser,
              'fullName': `${userPoints.agileSystemUser.workTeamMember.workUser.firstname} ${userPoints.agileSystemUser.workTeamMember.workUser.lastname}`,
              'userPoints': userPoints.agileSystemUserStoryPoints
            }
            console.log(`New Story === ${newStory}`)
            newResults.push(newStory)
          }

        }
        this.StoryChoices = newResults
        this.metricsService.hideLoadingPanel()
      })
  }

  getFullName () {
    let i = 0
    for (i = 0; i < this.storyData.length; i++) {
      let user = this.storyData[i].agileSystemUserName
      let name = user.split(' <')
      this.storyData[i].agileSystemUserName = name[0]
    }
  }

  getUsersPoints () {
    this.StoryChoices.sort(function (obj1, obj2) {
      // Ascending: first age less than the previous
      return obj1.agileSystemUserName - obj2.agileSystemUserName
    })
    let i
    let lastUser = ''
    let totalPoints = 0
    for (i = 0; i < this.StoryChoices.length; i++) {
      if (lastUser === this.StoryChoices[i].agileSystemUserName) {
        totalPoints = totalPoints + this.StoryChoices[i].agileSystemUserStoryPoints
      } else {
        if (lastUser !== '') {
          let userWithTotalPoints = {
            'user': lastUser,
            'totalPoints': totalPoints
          }
          this.usersPoints.push(userWithTotalPoints)
        }
        lastUser = this.StoryChoices[i].agileSystemUser
        totalPoints = this.StoryChoices[i].agileSystemUserStoryPoints
      }
    }
  }

  getStoryCount () {
    let i
    let j
    this.storiesBySprint = []
    this.storyCount = 0
    this.storiesBySprintCount = 0
    let lastStory = ''
    let lastSprint = ''
    let numberOfStories = this.StoryChoices.length - 1
    for (i = 0; i < this.StoryChoices.length; i++) {
      if (lastSprint === this.StoryChoices[i].agileSprintId || lastSprint === '') {
        if (lastStory !== this.StoryChoices[i].agileStoryId) {
          this.storiesBySprintCount++
          lastStory = this.StoryChoices[i].agileStoryId
        }
        if (i === numberOfStories) {
          let getStoriesBySprint = {
            'arg': this.StoryChoices[i - 1].agileSprintName,
            'val': this.storiesBySprintCount
          }
          this.storiesBySprint.push(getStoriesBySprint)
        }
      } else {
        let getStoriesBySprint = {
          'arg': this.StoryChoices[i - 1].agileSprintName,
          'val': this.storiesBySprintCount
        }
        this.storiesBySprint.push(getStoriesBySprint)
        this.storiesBySprintCount = 0
      }
      lastSprint = this.StoryChoices[i].agileSprintId
    }
  }
}
