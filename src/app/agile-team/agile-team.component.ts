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
  systemDropDownValue:any;
  systemTextFieldValue:any;
  teamValue:any;
  isSystemEmpty:boolean=true;

  constructor() {}

  ngOnInit() {
    this.readOnly = true;
    this.activeValue = false;
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

  systemDropDownValueChanged(e) {
    if(this.isSystemEmpty) { 
      this.isSystemEmpty = false;
    } else {
      // console.log("made it!!!!!");
      $('#editSystemButton').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
    }
    if(this.systemDropDownValue == undefined){
      $('#editSystemButton').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
  }

  systemTextFieldValueChanged(e) {
    if(this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  typeValueChanged(e) {
    if(this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  teamValueChanged(e) {
    if(this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  checkBoxToggled(e) {
    if(this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  addSystemButtonClicked() {
    this.buttonLbl = "Add";
    this.readOnly = false;
    this.systemTextFieldValue = undefined;
    this.typeValue = undefined;
    this.teamValue = undefined;
    this.activeValue = false;
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
    this.buttonLbl = "Update";
    this.readOnly = false;
    this.systemTextFieldValue = this.systemDropDownValue;
    $('#addSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    $('#cancelEditButton').removeClass('remove');
  }

  submitButtonClicked() {
    alert("The Submit Button was clicked");
  }

  cancelAddButtonClicked() {
    this.readOnly = true;
    this.typeValue = undefined;
    this.teamValue = undefined;
    this.activeValue = false;
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    $('#cancelAddButton').addClass('remove');
    if(this.systemDropDownValue != undefined){
      $('#editSystemButton').removeClass('remove');
    } else if (this.systemDropDownValue == undefined){
      $('#selectTeamDropDown').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
  }

  cancelEditButtonClicked() {
    this.readOnly = true;
    this.typeValue = undefined;
    this.teamValue = undefined;
    this.activeValue = false;
    $('#addSystemButton').removeClass('remove');
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    $('#cancelEditButton').addClass('remove');
  }
}