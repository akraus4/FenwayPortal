import { Component, OnInit } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule } from 'devextreme-angular'
import DataSource from "devextreme/data/data_source";
import * as $ from "jquery";

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  systemSelectBoxDataSource = ["System 1", "System 2", "System 3"];
  teamSelectBoxDataSource:DataSource;
  // teamSelectBoxDataSource = ["Team 1", "Team 2", "Team 3"];
  buttonLbl:string;
  readOnly:boolean;
  disabled:boolean;
  activeValue:boolean;
  newSystemValue:any;
  systemValue:any;
  typeValue:any;

  constructor() { 
    this.teamSelectBoxDataSource = new DataSource({
      store: ["Team 1", "Team 2", "Team 3"]
    });
  }

  ngOnInit() {
    this.readOnly = true;
    this.disabled = true;
    $('#systemTextField').addClass('remove');
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
  }

  systemValueChanged(e) {
    let previousSystemValue = e.previousSystemValue;
    this.newSystemValue = e.value;
    // Event handling commands go here
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
  }

  addSystemButtonClicked() {
    // alert("The Add Button was clicked");
    this.buttonLbl = "Add";
    this.readOnly = false;
    this.systemValue = undefined;
    this.typeValue = undefined;
    this.activeValue = undefined;
    $('#editSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  }

  editSystemButtonClicked() {
    // alert("The Edit Button was clicked");
    this.buttonLbl = "Update";
    this.readOnly = false;
    this.systemValue = this.newSystemValue;
    $('#addSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  }

  checkBoxToggled(e) {
    // if(e.value == true){
    //   alert("Checkbox Checked")
    // }
    // else{
    //   alert("Checkbox Unchecked")
    // }
  };

  submitButtonClicked() {
    alert("The Submit Button was clicked");
  }

  cancelButtonClicked() {
    // alert("The Cancel Button was clicked"
    this.ngOnInit();
    this.teamSelectBoxDataSource.load();
    $('#editSystemButton').removeClass('remove');
    $('#addSystemButton').removeClass('remove');
    $('#selectSystemDropDown').removeClass('remove');
    // this.readOnly = true;
    // $('#systemTextField').addClass('remove');
    // $('#selectTeamDropDown').addClass('remove');
    // $('#typeTextField').addClass('remove');
    // $('#activeCheckBox').addClass('remove');
    // $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
  }
}