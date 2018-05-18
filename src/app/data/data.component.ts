import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
  modalRef: BsModalRef;
  title: string = "Data Management";
  columnChoices: Array<any> = [];
  currentTable;
  table: string;
  dataService: any;
  TableChoices;


  //Dropdonw choices for 'Select Table"
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
  agileStory = [
    { dataField: "story_type", caption: "Story Type" },
    { dataField: "agile_system_user_story_points", caption: "User's Story Pts" },
    { dataField: "agile_sprint_id", caption: "Sprint ID" },
    { dataField: "story_type", caption: "Story Type" },
    { dataField: "agile_system_user_name", caption: "User" },
  ];
  workUser = [
    { dataField: "work_user_id", caption: "User ID" },
    { dataField: "first_name", caption: "First Name" },
    { dataField: "last_name", caption: "Last Name" },
    { dataField: "email", caption: "Email" },
  ];

  workTeam = [
    { dataField: "work_team_id", caption: "Team ID" },
    { dataField: "work_team_name", caption: "Team Name" },
    { dataField: "project_id", caption: "Project ID" },
    { dataField: "project_name", caption: "Project Name" },
  ];

  ngOnInit() {
  }
  constructor(private modalService: BsModalService,@Inject(DataService) dataService) {
    this.dataService = dataService;
    this.columnChoices = this.columns
   }
  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  storeCurrentTable(tableName: string) {
    this.currentTable = tableName;
    // console.log("Made it here!!!" + tableName);
  }

  getTableData(){
    console.log("numero uno    " + this.currentTable);
    if (this.currentTable == 'Agile Sprint'){
      this.dataService.getSystemWithSystemUserWithWorkTeam()
      .map(res => { console.log("catsrgyd    " + res); return res.json(); })
      .subscribe((results) => {this.TableChoices = results; console.log("hey    " + results); this.getColumns();});

    }
  }

  getColumns() {
    console.log("currentTable : " + this.currentTable);
    if (this.currentTable == "Agile Story") {
      console.log("made");
      this.columnChoices = [
        { dataField: "story_type", caption: "Story Type" },
        { dataField: "agile_system_user_story_points", caption: "User's Story Pts" },
        { dataField: "agile_sprint_id", caption: "Sprint ID" },
        { dataField: "story_type", caption: "Story Type" },
        { dataField: "agile_system_user_name", caption: "User" },
      ];
    } else if (this.currentTable == "Agile System"){
      this.columnChoices = [
        { dataField: "agile_system_id", caption: "System ID" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "agile_system_type", caption: "System Type" },
        { dataField: "work_team_id", caption: "Team" }
      ];
    };
  };

  allColumns = [{ dataField: "work_user_id", caption: "Work User ID"},
  { dataField: "first_name", caption: "First Name"},
  { dataField: "last_name", caption: "Last Name"},
  { dataField: "email", caption: "Email"},
  { dataField: "work_team_id", caption: "Work Team ID"},
  { dataField: "work_team_name", caption: "Work Team Name"},
  { dataField: "project_id", caption: "Project ID"},
  { dataField: "project_name", caption: "Project Name"},
  { dataField: "work_team_member_id", caption: "Work Team Member ID"},
  { dataField: "work_daily_hours_id", caption: "Work Daily Hours ID"},
  { dataField: "work_date", caption: "Work Date"},
  { dataField: "hours", caption: "Hours"},
  { dataField: "agile_system_id", caption: "Agile System ID"},
  { dataField: "agile_system_name", caption: "Agile System Name"},
  { dataField: "agile_system_type", caption: "Agile System Type"},
  { dataField: "agile_system_user_id", caption: "Agile System User ID"},
  { dataField: "agile_system_user_name", caption: "Agile System User Name"},
  { dataField: "agile_sprint_id", caption: "Agile Sprint ID"},
  { dataField: "agile_sprint_name", caption: "Agile Sprint Name"},
  { dataField: "sprint_description", caption: "Sprint Description"},
  { dataField: "sprint_start_date", caption: "Sprint Start Date"},
  { dataField: "sprint_end_date", caption: "Sprint End Date"},
  { dataField: "agile_story_id", caption: "Agile Story ID"},
  { dataField: "agile_story_name", caption: "Agile Story Name"},
  { dataField: "story_description", caption: "Story Description"},
  { dataField: "story_type", caption: "Story Type"},
  { dataField: "story_status", caption: "Story Status"},
  { dataField: "story_points", caption: "Story Points"},
  { dataField: "agile_story_agile-system_user_id", caption: "Story System User ID"},
  { dataField: "agile_system_user_story_points", caption: "System User Story Points"},];
};
