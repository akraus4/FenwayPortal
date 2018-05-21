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
  table_name: any;
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

  ngOnInit() {
  }
  constructor(private modalService: BsModalService, @Inject(DataService) dataService) {
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
  setupTable(){
    if (this.currentTable == 'Work User') {
      this.table_name = "work_user"
    }
    else if(this.currentTable == 'Work Team'){
      this.table_name = "work_team"
    }
    else if(this.currentTable == 'Work Team Member'){
      this.table_name = "work_team_member"
    }
    else if(this.currentTable == 'Work Daily Hours'){
      this.table_name = "work_dailyhours"
    }
    else if(this.currentTable == 'Agile System'){
      this.table_name = "agile_system"
    }
    else if(this.currentTable == 'Agile System User'){
      this.table_name = "agile_system_user"
    }
    else if(this.currentTable == 'Agile Sprint'){
      this.table_name = "agile_sprint"
    }
    else if(this.currentTable == 'Agile Story'){
      this.table_name = "agile_story"
    }
    else if(this.currentTable == 'Agile Story Agile System User'){
      this.table_name = "agile_story_agile_system_user"
    }
    this.getTableData(this.table_name)
  }

  getTableData(table_name) {
      this.dataService.findTableData(this.table_name)
        .map(res => { return res.json(); })
        .subscribe((results) => { this.TableChoices = results; this.getColumns(); });
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
      console.log("get columns")
      this.columnChoices = [
        { dataField: "work_team_id", caption: "Work Team ID" },
        { dataField: "work_team_name", caption: "Work Team Name" },
        { dataField: "project_id", caption: "Project ID" },
        { dataField: "project_name", caption: "Project Name" },
      ];
    }  

    else if (this.currentTable == "Work Team Member") {
      this.columnChoices = [
        { dataField: "agile_story_id", caption: "Story ID" },
        { dataField: "agile_sprint_name", caption: "Sprint Name" },
        { dataField: "story_type", caption: "Story Type" },
        { dataField: "story_status", caption: "Story status" },
        { dataField: "story_points", caption: "Story Points" },
      ];
    } 

    else if (this.currentTable == "Work Daily Hours") {
      this.columnChoices = [
        { dataField: "agile_story_id", caption: "Story ID" },
        { dataField: "agile_sprint_name", caption: "Sprint Name" },
        { dataField: "story_type", caption: "Story Type" },
        { dataField: "story_status", caption: "Story status" },
        { dataField: "story_points", caption: "Story Points" },
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
        { dataField: "agile_system__user_id", caption: "System ID" },
        { dataField: "agile_system_user_name", caption: "System Name" },
        { dataField: "agile_system_user_type", caption: "System Type" },
        { dataField: "work_team_name", caption: "Team" }
      ];
    }

    else if (this.currentTable == "Agile Sprint") {
      this.columnChoices = [
        { dataField: "agile_system_id", caption: "System ID" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "agile_system_type", caption: "System Type" },
        { dataField: "work_team_name", caption: "Team" }
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
        { dataField: "agile_system_id", caption: "System ID" },
        { dataField: "agile_system_name", caption: "System Name" },
        { dataField: "agile_system_type", caption: "System Type" },
        { dataField: "work_team_name", caption: "Team" }
      ];
    }

  };
};


