import { Component, OnInit, Inject, TemplateRef, ViewChild, AfterViewInit, getDebugNode } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { DataService } from '../services/data.service'
import { MetricsService } from '../services/metrics.service'
import { DxTextBoxModule, DxNumberBoxModule, DxSelectBoxModule  } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import data_grid from 'devextreme/ui/data_grid';
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  modalRef: BsModalRef;
  title: string = "Data Management";
  columnChoices: Array<any> = [];
  dropDownChoices: Array<any> = [];
  currentTable;
  table: string;
  dataService: any;
  table_name: any;
  tableSelector: any;
  templateName: any;
  TableChoices;
  key: string;
  metricsService: any;
  val: any;
  workUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  workTeamID: string;
  workTeamName: string;
  projectID: string;
  projectName: string;
  workTeamMemberId: string;
  workDailyHoursId: string;
  workDate: string;
  hours: string;
  name: string;
  agileSystemType: string;
  agileSystemName: string;
  agileSystemId: string;
  agileSystemUserId: string;
  agileSystemUserName: string;
  workTeamMemberID: string;
  workUserID: string;
  agileSprintId: string;
  agileSprintName: string;
  sprintDescription: string;
  sprintStartDate: string;
  sprintEndDate: string;
  agileStoryid: string;
  storyType: string;
  storyStatus: string;
  storyPoints: string;
  agileStoryAgileSystemUserId: string;
  agileStoryId: string;
  agileSystemUserStoryPoints: string;
  viewValue: any;
  drop_name;
  dropDownData;

  constructor(private modalService: BsModalService, @Inject(DataService) dataService, @Inject(MetricsService) metricsService) {
    this.dataService = dataService;
    this.columnChoices = this.columns;
    this.metricsService = metricsService;
  }

  keys = [
    { value: 0, viewValue: "This Foreign Key" },
    { value: 1, viewValue: "That Foreign Key" }
  ]

  //Dropdown choices for 'Select Table"
  tables = [
    { value: 0, viewValue: "Work User" },
    { value: 1, viewValue: "Work Team" },
    { value: 2, viewValue: "Work Team Member" },
    { value: 3, viewValue: "Work Daily Hours" },
    { value: 4, viewValue: "Agile System" },
    { value: 5, viewValue: "Agile System User" },
    { value: 6, viewValue: "Agile Sprint" },
    { value: 7, viewValue: "Agile Story" },
    { value: 8, viewValue: "Agile Story Agile System User" }
  ];
  
  //Default column list.
  columns = [
    { dataField: "story_type", caption: "Story Type" },
    { dataField: "agile_system_user_story_points", caption: "User's Story Pts" },
    { dataField: "agile_sprint_id", caption: "Sprint ID" },
    { dataField: "story_type", caption: "Story Type" },
    { dataField: "agile_system_user_name", caption: "User" },
  ];


  ngOnInit() {
    this.workUserOnInit();
  }

  workUserOnInit(){
    this.currentTable = 'Work User'
    this.setupTable()
    this.metricsService.hideLoadingPanel();
  }

  openModal(workUser: TemplateRef<any>, workTeam: TemplateRef<any>, workTeamMember: TemplateRef<any>, workDailyhours: TemplateRef<any>, agileSystem: TemplateRef<any>, agileSystemUser: TemplateRef<any>, agileSprint: TemplateRef<any>, agileStory: TemplateRef<any>, agileStoryAgileSystemUser: TemplateRef<any>) {
    let selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (this.table_name == "work_user") {
      this.workUserId = selectedData[0] ? selectedData[0].work_user_id : null
      this.firstName = selectedData[0] ? selectedData[0].firstname : null
      this.lastName = selectedData[0] ? selectedData[0].lastname : null
      this.email = selectedData[0] ? selectedData[0].email : null
      this.modalRef = this.modalService.show(workUser)
    }

    else if (this.table_name == "work_team") {
      this.workTeamID = selectedData[0] ? selectedData[0].work_team_id : null
      this.workTeamName = selectedData[0] ? selectedData[0].work_team_name : null
      this.projectID = selectedData[0] ? selectedData[0].project_id : null
      this.projectName = selectedData[0] ? selectedData[0].project_name : null
      this.modalRef = this.modalService.show(workTeam) 
    }

    else if (this.table_name == "work_team_member") {
      this.workTeamMemberId = selectedData[0] ? selectedData[0].work_team_member_id : null
      this.modalRef = this.modalService.show(workTeamMember)
    }

    else if (this.table_name == "work_dailyhours") {
      this.workDailyHoursId = selectedData[0] ? selectedData[0].work_dailyhours_id : null
      this.workDate = selectedData[0] ? selectedData[0].work_date : null
      this.hours = selectedData[0] ? selectedData[0].hours : null
      this.modalRef = this.modalService.show(workDailyhours)
    }

    else if (this.table_name == "agile_system") {
      this.agileSystemId = selectedData[0] ? selectedData[0].agile_system_id : null
      this.agileSystemName = selectedData[0] ? selectedData[0].agile_system_name : null
      this.agileSystemType = selectedData[0] ? selectedData[0].agile_system_type : null
      this.workTeamID = selectedData[0] ? selectedData[0].work_team_id : null
      this.modalRef = this.modalService.show(agileSystem)
    }

    else if (this.table_name == "agile_system_user") {
      this.agileSystemUserId = selectedData[0] ? selectedData[0].agile_system_user_id : null
      this.agileSystemUserName = selectedData[0] ? selectedData[0].agile_system_user_name : null
      this.agileSystemId = selectedData[0] ? selectedData[0].agile_system_id : null
      this.workTeamMemberID = selectedData[0] ? selectedData[0].work_team_member_id : null
      this.workUserID = selectedData[0] ? selectedData[0].work_user_id : null
      this.modalRef = this.modalService.show(agileSystemUser)
    }
    else if (this.table_name == "agile_sprint") {
      this.agileSprintId = selectedData[0] ? selectedData[0].agile_sprint_id : null
      this.agileSprintName = selectedData[0] ? selectedData[0].agile_sprint_name : null
      this.agileSystemId = selectedData[0] ? selectedData[0].agile_system_id : null
      this.sprintDescription = selectedData[0] ? selectedData[0].sprint_description : null
      this.sprintStartDate = selectedData[0] ? selectedData[0].sprint_start_date : null
      this.sprintEndDate = selectedData[0] ? selectedData[0].sprint_end_date : null
      this.modalRef = this.modalService.show(agileSprint)
    }

    else if (this.table_name == "agile_story") {
      this.agileStoryid = selectedData[0] ? selectedData[0].agile_story_id : null
      this.agileSprintId = selectedData[0] ? selectedData[0].agile_sprint_id : null
      this.storyType = selectedData[0] ? selectedData[0].story_type : null
      this.storyStatus = selectedData[0] ? selectedData[0].story_status : null
      this.storyPoints = selectedData[0] ? selectedData[0].story_points : null
      this.modalRef = this.modalService.show(agileStory)
    }

    else if (this.table_name == "agile_story_agile_system_user") {
      this.agileStoryAgileSystemUserId = selectedData[0] ? selectedData[0].agile_story_agile_system_user_id : null
      this.agileStoryId = selectedData[0] ? selectedData[0].agile_story_id : null
      this.agileSystemUserName = selectedData[0] ? selectedData[0].agile_system_user_id : null
      this.agileSystemUserStoryPoints = selectedData[0] ? selectedData[0].agile_system_user_story_points : null
      this.modalRef = this.modalService.show(agileStoryAgileSystemUser)
    }
  }
  closeModal() {
    this.modalService.hide(1)
  }
  storeCurrentTable(tableName: string) {
    this.currentTable = tableName;
    this.setupTable();
  }
  setupTable() {
    
    this.metricsService.showLoadingPanel()
    
    if (this.currentTable == 'Work User') {
      this.table_name = "work_user"
    }
    else if (this.currentTable == 'Work Team') {
      this.table_name = "work_team"
    }
    else if (this.currentTable == 'Work Team Member') {
      this.table_name = "work_team_member"
    }
    else if (this.currentTable == 'Work Daily Hours') {
      this.table_name = "work_dailyhours"
    }
    else if (this.currentTable == 'Agile System') {
      this.table_name = "agile_system"
    }
    else if (this.currentTable == 'Agile System User') {
      this.table_name = "agile_system_user"
    }
    else if (this.currentTable == 'Agile Sprint') {
      this.table_name = "agile_sprint"
    }
    else if (this.currentTable == 'Agile Story') {
      this.table_name = "agile_story"
    }
    else if (this.currentTable == 'Agile Story Agile System User') {
      this.table_name = "agile_story_agile_system_user"
    }
    this.getTableData(this.table_name)
  }

  getTableData(table_name) {
    this.dataService.findTableData(this.table_name)
      .map(res => { return res.json(); })
      .subscribe((results) => { this.TableChoices = results; this.getColumns(); this.metricsService.hideLoadingPanel(); });
  }

  getDropDown(table_name) {
    console.log(this.table_name)
    this.dataService.findDropDownData(this.table_name)
      .map(res => { return res.json(); })
      .subscribe((results) => { this.dropDownData = results; console.log(JSON.stringify(results)) });
  }

  getColumns() {
    if (this.currentTable == "Work User") {
      this.columnChoices = [
        { dataField: "work_user_id", caption: "Work User ID " },
        { dataField: "firstname", caption: "First Name" },
        { dataField: "lastname", caption: "Last Name" },
        { dataField: "email", caption: "Email" },
      ];

    }

    else if (this.currentTable == "Work Team") {
      this.columnChoices = [
        { dataField: "work_team_id", caption: "Work Team ID" },
        { dataField: "work_team_name", caption: "Work Team Name" },
        { dataField: "project_id", caption: "Project ID" },
        { dataField: "project_name", caption: "Project Name" },
      ];
    }

    else if (this.currentTable == "Work Team Member") {
      this.columnChoices = [
        { dataField: "work_team_member_id", caption: "Team Member ID" },
        { dataField: "work_team_id", caption: "Work Team ID" },
        { dataField: "work_user_id", caption: "Work User ID" },
        { dataField: "work_team_name", caption: "Work Team Name" },
        { dataField: "firstname", caption: "First Name" },
        { dataField: "lastname", caption: "Last Name" },
      ];
    }

    else if (this.currentTable == "Work Daily Hours") {
      this.columnChoices = [
        { dataField: "work_dailyhours_id", caption: "Work Daily Hours ID" },
        { dataField: "work_team_member_id", caption: "Work Team Member ID" },
        { dataField: "work_date", caption: "Work Date" },
        { dataField: "hours", caption: "Hours" },
        { dataField: "name", caption: "Name" }
      ];
    }

    else if (this.currentTable == "Agile System") {
      this.columnChoices = [
        { dataField: "agile_system_id", caption: "System ID" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "agile_system_type", caption: "System Type" },
        { dataField: "work_team_name", caption: "Team" }
      ];
    }

    else if (this.currentTable == "Agile System User") {
      this.columnChoices = [
        { dataField: "agile_system_user_id", caption: "Agile System ID" },
        { dataField: "agile_system_user_name", caption: "User System Name" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "work_team_member_id", caption: "Work Team Member ID" },
        { dataField: "firstname", caption: "First Name" },
        { dataField: "lastname", caption: "Last Name" },
      ];
    }
    else if (this.currentTable == "Agile Sprint") {
      this.columnChoices = [
        { dataField: "agile_sprint_id", caption: "Sprint ID" },
        { dataField: "agile_sprint_name", caption: "Sprint Name" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "sprint_description", caption: "Sprint Description" },
        { dataField: "sprint_start_date", caption: "Sprint Start Date" },
        { dataField: "sprint_end_date", caption: "Sprint End Date" }
      ];
    }

    else if (this.currentTable == "Agile Story") {
      this.columnChoices = [
        { dataField: "agile_story_id", caption: "Story ID" },
        // { dataField: "agile_story_name", caption: "Story Name" },
        { dataField: "agile_sprint_name", caption: "Sprint Name" },
        // { dataField: "story_description", caption: "Story description" },
        { dataField: "story_type", caption: "Story Type" },
        { dataField: "story_status", caption: "Story status" },
        { dataField: "story_points", caption: "Story Points" },
      ];
    }

    else if (this.currentTable == "Agile Story Agile System User") {
      this.columnChoices = [
        { dataField: "agile_story_agile_system_user_id", caption: "Agile Story Agile System User ID" },
        { dataField: "agile_story_id", caption: "Story ID" },
        { dataField: "agile_system_user_name", caption: "User System Name" },
        { dataField: "agile_system_user_story_points", caption: "User Story Points" }
      ];
    }
  };
};


