import { Component, OnInit, Inject, TemplateRef, ViewChild, AfterViewInit, getDebugNode } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { DataService } from '../services/data.service'
import { MetricsService } from '../services/metrics.service'
import { DxTextBoxModule, DxNumberBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import data_grid from 'devextreme/ui/data_grid';
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
import DataSource from 'devextreme/data/data_source';
import { FormControl } from '@angular/forms';
import { confirm } from 'devextreme/ui/dialog';
import * as $ from "jquery";
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  metricsService: any; //connects to metricService.ts
  dataService: any; // connects to dataService.ts
  modalRef: BsModalRef;
  title: string = "Data Management";
  columnChoices: Array<any> = [];
  columnTeamChoices: Array<any> = [];
  Team = new FormControl();    //This is the array for the team selection.
  tablesModel;
  teamId;
  currentTeamId: Array<any> = [];
  workTeams: string;
  teamsModel;
  table: string;
  team: string;
  TableChoices;
  TeamChoices = [];
  key: string;
  val: any;
  viewValue: any;
  statementExecuted: any;

  selectionChangedRaised = false;
  //Variables for work_user
  workUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  //Variables for work_team
  workTeamID: string;
  workTeamName: string;
  projectNameworkTeam: string;
  projectName: string;
  //Variables for work_team_member
  workTeamMemberId: string;
  expectedHours: string;
  //Variables for work_dailyhours
  workDailyHoursId: string;
  workDate: string;
  hours: string;
  //Variables for agile_system
  agileSystemId: string;
  agileSystemName: string;
  agileSystemType: string;
  //Variables for agile_system_user
  agileSystemUserId: string;
  agileSystemUserName: string;
  workTeamMemberID: string;
  workUserID: string;
  //Variables for agile_sprint
  agileSprintId: string;
  agileSprintName: string;
  sprintDescription: string;
  sprintStartDate: string;
  sprintEndDate: string;
  //Variables for agile_story
  agileStoryid: string;
  storyType: string;
  storyStatus: string;
  storyPoints: string;
  workTeamMemberName: string;
  //Variables for agile_story_agile_system_user
  agileStoryAgileSystemUserId: string;
  agileSystemUserStoryPoints: string;


  //Data sources for each dropdown in the data templates
  drop_name;
  originalDataSource;
  dropDownData;
  dropDownData1;
  dropDownData2;
  dropdownDataInt = 0;

  //Dropdown choices for main table drop down
  tables = [
    { value: 'work_user', viewValue: "Work User" },
    { value: 'work_team', viewValue: "Work Team" },
    { value: 'work_team_member', viewValue: "Work Team Member" },
    { value: 'work_dailyhours', viewValue: "Work Daily Hours" },
    { value: 'agile_system', viewValue: "Agile System" },
    { value: 'agile_system_user', viewValue: "Agile System User" },
    { value: 'agile_sprint', viewValue: "Agile Sprint" },
    { value: 'agile_story', viewValue: "Agile Story" },
    { value: 'agile_story_agile_system_user', viewValue: "Agile Story Agile System User" }
  ];

  constructor(private modalService: BsModalService, @Inject(DataService) dataService, @Inject(MetricsService) metricsService) {
    this.dataService = dataService;
    this.metricsService = metricsService;
  }

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent

  //On page load
  ngOnInit() {
    // this.workUserOnInit();
    this.tablesModel = this.tables[0].value;
  }

  // //Default table called on page load
  // workUserOnInit() {
  //   this.tablesModel = 'work_user'
  //   this.getTableData()
  //   this.metricsService.hideLoadingPanel();
  // }

  // //Handles clicks on grid by row
  // onRowClick(e, workUser, workTeam, workTeamMember, workDailyhours, agileSystem, agileSystemUser, agileSprint, agileStory, agileStoryAgileSystemUser) {
  //   var component = e.component,
  //     prevClickTime = component.lastClickTime;
  //   component.lastClickTime = new Date();

  //   if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
  //     //Double click code
  //     this.openModal(workUser, workTeam, workTeamMember, workDailyhours, agileSystem, agileSystemUser, agileSprint, agileStory, agileStoryAgileSystemUser)
  //     this.getDropDown()
  //   }
  //   else {
  //     //Single click code
  //     // console.log('single click');
  //   }
  // }

  // //Clears the selected rows
  // clearSelectedRows() {
  //   this.dataGrid.instance.deselectAll()
  // }

  // //Stores the name of the table selected in main drop down in data management
  // storeCurrentTable(tableId: string) {
  //   this.tablesModel = tableId;
  //   if (this.tablesModel == "work_dailyhours") {
  //     $("#workDailyhoursFilter").removeClass("ghost");
  //     this.getAllTeams();
  //   }
  //   else {
  //     this.getTableData()
  //   }
  // }

  // //Pulls data from python to populate grids(excluding work_dailyhours)
  // getTableData() {
  //   this.metricsService.showLoadingPanel()
  //   if (this.tablesModel != "work_dailyhours") {
  //     this.dataService.findTableData(this.tablesModel)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.TableChoices = results; this.getColumns(); });
  //   }
  //   this.metricsService.hideLoadingPanel();
  // }

  // //Handles selected teams in drop down filter for work_dailyhours in data management
  // storeCurrentTeam(teamId: string) {
  //   var i = 0;
  //   for (i = 0; i < teamId.length; i++) {
  //     if (i == 0) {
  //       this.workTeams = teamId[i];
  //     }
  //     else {
  //       this.workTeams = this.workTeams + "', '" + teamId[i];
  //     }
  //   }
  //   this.setupWorkDailyhours()
  // }

  // //Pulls the teams that will be used to populate drop down filter for work dailyhours in data management
  // getAllTeams() {
  //   this.getColumns();
  //   this.dataService.findWorkTeams()
  //     .map(res => { return res.json(); })
  //     .subscribe((results) => { this.TeamChoices = results });
  // }

  // //Gets work teams to populate work_dailyhours drop down in Data Management Page
  // setupWorkDailyhours() {
  //   this.metricsService.showLoadingPanel()
  //   this.dataService.findWorkDailyhoursData(this.tablesModel, this.workTeams)
  //     .map(res => { return res.json(); })
  //     .subscribe((results) => { this.TableChoices = results; this.getColumns(); });
  //   this.metricsService.hideLoadingPanel();
  // }

  // //Determines which template to call and how the fields should be populated when opened in add/edit modal
  // openModal(workUser: TemplateRef<any>, workTeam: TemplateRef<any>, workTeamMember: TemplateRef<any>, workDailyhours: TemplateRef<any>, agileSystem: TemplateRef<any>, agileSystemUser: TemplateRef<any>, agileSprint: TemplateRef<any>, agileStory: TemplateRef<any>, agileStoryAgileSystemUser: TemplateRef<any>) {
  //   this.metricsService.showLoadingPanel();
  //   let selectedData = this.dataGrid.instance.getSelectedRowsData();
  //   this.dropdownDataInt = 0;
  //   if (this.tablesModel == "work_user") {
  //     this.workUserId = selectedData[0] ? selectedData[0].work_user_id : null
  //     this.firstName = selectedData[0] ? selectedData[0].firstname : null
  //     this.lastName = selectedData[0] ? selectedData[0].lastname : null
  //     this.email = selectedData[0] ? selectedData[0].email : null
  //     this.modalRef = this.modalService.show(workUser)
  //   }
  //   else if (this.tablesModel == "work_team") {
  //     this.workTeamID = selectedData[0] ? selectedData[0].work_team_id : null
  //     this.workTeamName = selectedData[0] ? selectedData[0].work_team_name : null
  //     this.projectNameworkTeam = selectedData[0] ? selectedData[0].project_id : null
  //     this.projectName = selectedData[0] ? selectedData[0].project_name : null
  //     this.modalRef = this.modalService.show(workTeam)
  //   }
  //   else if (this.tablesModel == "work_team_member") {
  //     this.workTeamMemberId = selectedData[0] ? selectedData[0].work_team_member_id : null
  //     this.workTeamID = selectedData[0] ? selectedData[0].work_team_id : null
  //     this.workUserID = selectedData[0] ? selectedData[0].work_user_id : null
  //     this.expectedHours = selectedData[0] ? selectedData[0].expected_hours : null
  //     this.modalRef = this.modalService.show(workTeamMember)
  //   }
  //   else if (this.tablesModel == "work_dailyhours") {
  //     this.workDailyHoursId = selectedData[0] ? selectedData[0].work_dailyhours_id : null
  //     this.workTeamMemberName = selectedData[0] ? selectedData[0].work_team_member_id : null
  //     this.workDate = selectedData[0] ? selectedData[0].work_date : null
  //     this.hours = selectedData[0] ? selectedData[0].hours : null
  //     this.modalRef = this.modalService.show(workDailyhours)
  //   }
  //   else if (this.tablesModel == "agile_system") {
  //     this.agileSystemId = selectedData[0] ? selectedData[0].agile_system_id : null
  //     this.agileSystemName = selectedData[0] ? selectedData[0].agile_system_name : null
  //     this.agileSystemType = selectedData[0] ? selectedData[0].agile_system_type : null
  //     this.workTeamID = selectedData[0] ? selectedData[0].work_team_id : null
  //     this.modalRef = this.modalService.show(agileSystem)
  //   }
  //   else if (this.tablesModel == "agile_system_user") {
  //     this.agileSystemUserId = selectedData[0] ? selectedData[0].agile_system_user_id : null
  //     this.agileSystemUserName = selectedData[0] ? selectedData[0].agile_system_user_name : null
  //     this.agileSystemName = selectedData[0] ? selectedData[0].agile_system_id : null
  //     // this.workTeamMemberID = selectedData[0] ? selectedData[0].work_team_member_id : null
  //     this.workUserID = selectedData[0] ? selectedData[0].work_user_id : null
  //     this.modalRef = this.modalService.show(agileSystemUser)
  //   }
  //   else if (this.tablesModel == "agile_sprint") {
  //     this.agileSprintId = selectedData[0] ? selectedData[0].agile_sprint_id : null
  //     this.agileSprintName = selectedData[0] ? selectedData[0].agile_sprint_name : null
  //     this.agileSystemName = selectedData[0] ? selectedData[0].agile_system_id : null
  //     this.sprintDescription = selectedData[0] ? selectedData[0].sprint_description : null
  //     this.sprintStartDate = selectedData[0] ? selectedData[0].sprint_start_date : null
  //     this.sprintEndDate = selectedData[0] ? selectedData[0].sprint_end_date : null
  //     this.modalRef = this.modalService.show(agileSprint)
  //   }
  //   else if (this.tablesModel == "agile_story") {
  //     this.agileStoryid = selectedData[0] ? selectedData[0].agile_story_id : null
  //     this.agileSprintName = selectedData[0] ? selectedData[0].agile_sprint_id : null
  //     this.storyType = selectedData[0] ? selectedData[0].story_type : null
  //     this.storyStatus = selectedData[0] ? selectedData[0].story_status : null
  //     this.storyPoints = selectedData[0] ? selectedData[0].story_points : null
  //     this.modalRef = this.modalService.show(agileStory)
  //   }
  //   else if (this.tablesModel == "agile_story_agile_system_user") {
  //     this.agileStoryAgileSystemUserId = selectedData[0] ? selectedData[0].agile_story_agile_system_user_id : null
  //     this.agileStoryid = selectedData[0] ? selectedData[0].agile_story_id : null
  //     this.agileSystemUserName = selectedData[0] ? selectedData[0].agile_system_user_id : null
  //     this.agileSystemUserStoryPoints = selectedData[0] ? selectedData[0].agile_system_user_story_points : null
  //     this.modalRef = this.modalService.show(agileStoryAgileSystemUser)
  //   }
  // }

  // //Closes the modal opened above
  // closeModal() {
  //   this.modalService.hide(1);
  // }

  // //Confirmation pop-up to determine if changes wish to be saved from modal(import { confirm } from 'devextreme/ui/dialog';)
  // //just need to call showConfirm() where confirmation is needed
  // showConfirm(workUser, workTeam, workTeamMember, workDailyhours, agileSystem, agileSystemUser, agileSprint, agileStory, agileStoryAgileSystemUser) {
  //   var that = this
  //   var result = confirm("Are you sure?", "Confirm changes");
  //   result.then(function (dialogResult) {
  //     dialogResult ? that.getEditTableData(workUser, workTeam, workTeamMember, workDailyhours, agileSystem, agileSystemUser, agileSprint, agileStory, agileStoryAgileSystemUser) : null
  //   });
  // }

  // //Gets the information to populate all of the drop downs in the edit modal
  // getDropDown() {
  //   if (this.tablesModel != "work_user" && this.tablesModel != "work_team") {
  //     this.dataService.findDropDownData(this.tablesModel)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => {
  //         var newResults = JSON.stringify(results).split('],[');
  //         this.originalDataSource = results;
  //         var ddResult1 = newResults[0].concat(']');
  //         ddResult1 = ddResult1.substr(1);
  //         ddResult1 = JSON.parse(ddResult1);

  //         if (newResults[1] != null) {
  //           var ddResult2 = '[' + newResults[1];
  //           ddResult2 = ddResult2.slice(0, -1);
  //           ddResult2 = JSON.parse(ddResult2);
  //         };
  //         this.dropDownData = ddResult1;
  //         this.dropDownData1 = ddResult2;
  //       });
  //   }
  //   this.metricsService.hideLoadingPanel();
  // }

  // //Sets the columns in the main grid 
  // getColumns() {
  //   if (this.tablesModel == "work_user") {
  //     this.columnChoices = [
  //       { dataField: "work_user_id", caption: "Work User ID " },
  //       { dataField: "firstname", caption: "First Name" },
  //       { dataField: "lastname", caption: "Last Name" },
  //       { dataField: "email", caption: "Email" },
  //     ];
  //     $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "work_team") {
  //     this.columnChoices = [
  //       { dataField: "work_team_id", caption: "Work Team ID" },
  //       { dataField: "work_team_name", caption: "Work Team Name" },
  //       { dataField: "project_id", caption: "Project ID" },
  //       { dataField: "project_name", caption: "Project Name" },
  //     ];
  //     $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "work_team_member") {
  //     this.columnChoices = [
  //       { dataField: "work_team_member_id", caption: "Team Member ID" },
  //       { dataField: "work_team_id", caption: "Work Team ID" },
  //       { dataField: "work_user_id", caption: "Work User ID" },
  //       { dataField: "work_team_name", caption: "Work Team Name" },
  //       { dataField: "firstname", caption: "First Name" },
  //       { dataField: "lastname", caption: "Last Name" },
  //       { dataField: "expected_hours", caption: "Expected Hours" },
  //     ];
  //     $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "work_dailyhours") {
  //     this.columnChoices = [
  //       { dataField: "work_dailyhours_id", caption: "Work Daily Hours ID" },
  //       { dataField: "work_team_member_id", caption: "Work Team Member ID" },
  //       { dataField: "work_date", caption: "Work Date" },
  //       { dataField: "hours", caption: "Hours" },
  //       { dataField: "name", caption: "Name" }
  //     ];
  //   }
  //   else if (this.tablesModel == "agile_system") {
  //     this.columnChoices = [
  //       { dataField: "agile_system_id", caption: "System ID" },
  //       { dataField: "agile_system_name", caption: "System Name" },
  //       { dataField: "agile_system_type", caption: "System Type" },
  //       { dataField: "work_team_name", caption: "Team" }
  //     ]; $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "agile_system_user") {
  //     this.columnChoices = [
  //       { dataField: "agile_system_user_id", caption: "Agile System ID" },
  //       { dataField: "agile_system_user_name", caption: "User System Name" },
  //       { dataField: "agile_system_name", caption: "System Name" },
  //       // { dataField: "work_team_member_id", caption: "Work Team Member ID" },
  //       { dataField: "firstname", caption: "First Name" },
  //       { dataField: "lastname", caption: "Last Name" },
  //     ]; $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "agile_sprint") {
  //     this.columnChoices = [
  //       { dataField: "agile_sprint_id", caption: "Sprint ID" },
  //       { dataField: "agile_sprint_name", caption: "Sprint Name" },
  //       { dataField: "agile_system_name", caption: "System Name" },
  //       { dataField: "sprint_description", caption: "Sprint Description" },
  //       { dataField: "sprint_start_date", caption: "Sprint Start Date" },
  //       { dataField: "sprint_end_date", caption: "Sprint End Date" }
  //     ]; $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "agile_story") {
  //     this.columnChoices = [
  //       { dataField: "agile_story_id", caption: "Story ID" },
  //       // { dataField: "agile_story_name", caption: "Story Name" },
  //       { dataField: "agile_sprint_name", caption: "Sprint Name" },
  //       // { dataField: "story_description", caption: "Story description" },
  //       { dataField: "story_type", caption: "Story Type" },
  //       { dataField: "story_status", caption: "Story status" },
  //       { dataField: "story_points", caption: "Story Points" },
  //     ]; $("#workDailyhoursFilter").addClass("ghost");
  //   }
  //   else if (this.tablesModel == "agile_story_agile_system_user") {
  //     this.columnChoices = [
  //       { dataField: "agile_story_agile_system_user_id", caption: "Agile Story Agile System User ID" },
  //       { dataField: "agile_story_id", caption: "Story ID" },
  //       { dataField: "agile_system_user_name", caption: "User System Name" },
  //       { dataField: "agile_system_user_story_points", caption: "User Story Points" }
  //     ]; $("#workDailyhoursFilter").addClass("ghost");
  //   }
  // };


  // // Passes data from modal to python to be inserted into the database depending on which modal is open
  // getEditTableData(workUser: TemplateRef<any>, workTeam: TemplateRef<any>, workTeamMember: TemplateRef<any>, workDailyhours: TemplateRef<any>, agileSystem: TemplateRef<any>, agileSystemUser: TemplateRef<any>, agileSprint: TemplateRef<any>, agileStory: TemplateRef<any>, agileStoryAgileSystemUser: TemplateRef<any>) {
  //   if (this.tablesModel == "work_user") {
  //     this.dataService.editTableDataWUser(this.workUserId, this.firstName, this.lastName, this.email)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "work_team") {
  //     this.dataService.editTableDataWTeam(this.workTeamID, this.workTeamName, this.projectNameworkTeam, this.projectName)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "work_team_member") {
  //     this.dataService.editTableDataWTeamMember(this.workTeamMemberId, this.workTeamID, this.workUserID, this.expectedHours)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "work_dailyhours") {
  //     this.dataService.editTableDataWDailyhours(this.workDailyHoursId, this.workTeamMemberID, this.workDate, this.hours)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "agile_system") {
  //     this.dataService.editTableDataASystem(this.agileSystemId, this.agileSystemName, this.agileSystemType, this.workTeamID)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "agile_system_user") {
  //     this.dataService.editTableDataASystemUser(this.agileSystemUserId, this.agileSystemUserName, this.agileSystemName, this.workTeamMemberID, this.workUserID)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "agile_sprint") {
  //     this.dataService.editTableDataASprint(this.agileSprintId, this.agileSprintName, this.agileSystemName, this.sprintDescription, this.sprintStartDate, this.sprintEndDate)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "agile_story") {
  //     this.dataService.editTableDataAStory(this.agileStoryid, this.agileSprintName, this.storyType, this.storyStatus, this.storyPoints)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  //   else if (this.tablesModel == "agile_story_agile_system_user") {
  //     this.dataService.editTableDataASAgileSystemUser(this.agileStoryAgileSystemUserId, this.agileStoryid, this.agileSystemUserName, this.agileSystemUserStoryPoints)
  //       .map(res => { return res.json(); })
  //       .subscribe((results) => { this.statementExecuted = results; });
  //     this.closeModal()
  //   }
  // }
}