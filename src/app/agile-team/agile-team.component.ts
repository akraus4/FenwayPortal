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
  teamSelectBoxDataSource = ["Team 1", "Team 2", "Team 3"];
  buttonLbl:string;
  readOnly:boolean;
  submitButtonDisabled:boolean;
  activeValue:boolean;
  newSystemValue:any;
  systemValue:any;
  typeValue:any;
  teamDropDownModel:any;
  systemDropDownModel:any;
  isSystemEmpty:boolean=true;

  constructor() {}

  ngOnInit() {
    this.readOnly = true;
    this.submitButtonDisabled = true;
    $('#editSystemButton').addClass('remove');
    $('#systemTextField').addClass('remove');
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    $('#cancelAddButton').addClass('remove');
    $('#cancelEditButton').addClass('remove');
  }

  systemValueChanged(e) {
    // let previousSystemValue = e.previousSystemValue;
    // this.newSystemValue = e.value;
    if(this.isSystemEmpty) { 
      this.isSystemEmpty = false;
    } else {
      console.log("made it!!!!!");
      $('#editSystemButton').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
    }

    if(this.systemDropDownModel == undefined){
      $('#editSystemButton').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
  }

  addSystemButtonClicked() {
    // alert("The Add Button was clicked");
    this.buttonLbl = "Add";
    this.readOnly = false;
    this.systemValue = undefined;
    this.typeValue = undefined;
    this.teamDropDownModel = undefined;
    this.activeValue = undefined;
    $('#editSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    $('#cancelAddButton').removeClass('remove');
  }

  editSystemButtonClicked() {
    // alert("The Edit Button was clicked");
    this.buttonLbl = "Update";
    this.readOnly = false;
    this.systemValue = this.systemDropDownModel;
    $('#addSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    $('#cancelEditButton').removeClass('remove');
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

  cancelAddButtonClicked() {
    // alert("The Cancel Button was clicked"
    if(this.systemDropDownModel != undefined){
      this.readOnly = true;
      $('#editSystemButton').removeClass('remove');
      $('#selectSystemDropDown').removeClass('remove');
      $('#systemTextField').addClass('remove');
      $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
      $('#cancelAddButton').addClass('remove');
    } else if (this.systemDropDownModel == undefined){
      this.readOnly = true;
      $('#selectSystemDropDown').removeClass('remove');
      $('#systemTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#activeCheckBox').addClass('remove');
      $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
      $('#cancelAddButton').addClass('remove');
    }
  }

  cancelEditButtonClicked() {
    // alert("The Cancel Button was clicked"
    this.readOnly = true;
    this.typeValue = undefined;
    this.teamDropDownModel = undefined;
    this.activeValue = undefined;
    $('#addSystemButton').removeClass('remove');
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    $('#cancelEditButton').addClass('remove');
  }
}