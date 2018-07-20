import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule } from 'devextreme-angular';
import * as $ from 'jquery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import DataSource from "devextreme/data/data_source";
import { MetricsService } from '../services/metrics.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  
  metricsService: any;
  submitButtonLbl: string;
  modalRef: BsModalRef;
  currentSystem;
  
  //NgModels
  activeValue:boolean;
  newSystemValue:any;
  systemValue:any;
  typeValue:any;
  systemDropDownValue:any;
  systemTextFieldValue:any;
  teamValue:any;
  readOnly:boolean;
  submitButtonDisabled:boolean;

  //Datasources
  systemUserGridDataSource;
  systemSelectBoxDataSource;
  teamSelectBoxDataSource;

//Flags
  isSystemEmpty:boolean=true;
  isSystemAdd:boolean=false;
  isSystemEdit:boolean=false;
  isSystemUserAdd:boolean=false;
  isSystemUserEdit:boolean=false;

  constructor(private modalService: BsModalService, @Inject(MetricsService) metricsService) {
    this.metricsService = metricsService;
  }

  ngOnInit() {
    this.readOnly = true;
    this.activeValue = false;
    this.submitButtonDisabled = true;
    $('#editSystemButton').addClass('remove');
    $('#addUserButton').addClass('remove');
    $('#systemTextField').addClass('remove');
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    // $('#cancelAddButton').addClass('remove');
    // $('#cancelEditButton').addClass('remove');
    $('#systemUserTextField').addClass('remove');
    $('#selectTeamMemberDropDown').addClass('remove');
    $('#activeSystemUserCheckBox').addClass('remove');
    this.getAllSystems();
    this.getAllWorkTeams();
  }

  
  openModal(submitConfirmationModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(submitConfirmationModal);
  }

  //#region Top button click events

  addSystemButtonClicked() {
    this.isSystemAdd = true;
    this.isSystemEdit = false;
    this.isSystemUserAdd = false;
    this.isSystemUserEdit = false;
    this.submitButtonLbl = 'Add';
    this.readOnly = false;
    this.systemTextFieldValue = undefined;
    this.typeValue = undefined;
    this.teamValue = undefined;
    this.activeValue = false;
    $('#editSystemButton').addClass('remove');
    $('#addUserButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    // $('#cancelAddButton').removeClass('remove');
  }

  addUserButtonClicked(){
    this.isSystemAdd = false;
    this.isSystemEdit = false;
    this.isSystemUserAdd = true;
    this.isSystemUserEdit = false;
    this.submitButtonLbl = 'Add';

    $('#selectSystemDropDown').addClass('remove');
    // $('#systemTextField').removeClass('remove');
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');

    $('#editSystemButton').addClass('remove');
    $('#addSystemButton').addClass('remove');

    this.addSystemUserFields();
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  }

  editSystemButtonClicked() {
    this.isSystemAdd = false;
    this.isSystemEdit = true;
    this.isSystemUserAdd = false;
    this.isSystemUserEdit = false;
    this.submitButtonLbl = "Update";
    this.readOnly = false;
    $('#addSystemButton').addClass('remove');
    $('#addUserButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    // $('#cancelAddButton').removeClass('remove');
  }

  //#endregion Top button click events

  //#region Get methods

  getAllSystems() {
    this.metricsService.getAllSystems()
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.systemSelectBoxDataSource = results;
        console.log('Systems ===== ' + JSON.stringify(this.systemSelectBoxDataSource));
      });
  }

  getAllWorkTeams() {
    this.metricsService.getAllWorkTeams()
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.teamSelectBoxDataSource = results;
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
      });
  }

  getAllSystemUsersBySystem(system_id) {
    console.log(system_id);
    this.metricsService.getAllSystemUsersBySystem(system_id)
      .map(res => { return res.json(); })
      .subscribe((results) => {this.systemUserGridDataSource = results; console.log(results); console.log('Work User ======= ' + JSON.stringify(results[0].work_team_member.work_user));});
  }

//#endregion Get methods

//#region System value changes

  systemDropDownValueChanged(e) {
    var i = 0;
    if(this.isSystemEmpty) {
      this.isSystemEmpty = false;
    } else {
      // console.log("made it!!!!!");
      $('#editSystemButton').removeClass('remove');
      $('#addUserButton').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
      this.getAllSystemUsersBySystem(e);
      for(let system of this.systemSelectBoxDataSource){
        if(e == system.agile_system_id){
          console.log('Here *******  ' + JSON.stringify(system.work_team.work_team_id));
          this.currentSystem = system;
          this.systemTextFieldValue = system.agile_system_name;
          this.typeValue = system.agile_system_type;
          // this.teamValue = JSON.stringify(system.work_team.work_team_id);
          this.teamValue = this.currentSystem.work_team.work_team_id;
          console.log(this.teamValue);
          this.activeValue = system.active;
        }
      }
    }
    if(this.systemDropDownValue == undefined){
      $('#editSystemButton').addClass('remove');
      $('#addUserButton').addClass('remove');
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

  //#endregion System value changes


//#region Submit Cancel button click events

  submitButtonClicked() {
    alert("The Submit Button was clicked");
  }

  cancelAddButtonClicked() {
    this.readOnly = true;
    this.removeSystemUserFields();
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');

    if (this.isSystemUserAdd){
      $('#selectTeamDropDown').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
    }
    
    if(this.systemDropDownValue != undefined){
      $('#editSystemButton').removeClass('remove');
      $('#addUserButton').removeClass('remove');
      $('#addSystemButton').removeClass('remove');
      this.typeValue = this.currentSystem.agile_system_type;
      this.teamValue = this.currentSystem.work_team.work_team_id;
      this.activeValue = this.currentSystem.active;
    } else {
      console.log("HEEERERERERERE");
      $('#selectTeamDropDown').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
  }

  // cancelEditButtonClicked() {
  //   this.readOnly = true;
  //   this.typeValue = this.currentSystem.agile_system_type;
  //   this.teamValue = this.currentSystem.work_team.work_team_id;
  //   this.activeValue = this.currentSystem.active;
  //   $('#addSystemButton').removeClass('remove');
  //   $('#addUserButton').removeClass('remove');
  //   $('#selectSystemDropDown').removeClass('remove');
  //   $('#systemTextField').addClass('remove');
  //   $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
  //   $('#cancelEditButton').addClass('remove');
  // }

  confirmNoClicked() {
    this.modalService.hide(1);
  }

  //#endregion Submit Cancel button click events

  removeSystemFields(){
    $('#typeTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#activeCheckBox').addClass('remove');
  }

  addSystemFields(){
    $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
  }

  removeSystemUserFields(){
    $('#systemUserTextField').addClass('remove');
      $('#selectTeamMemberDropDown').addClass('remove');
      $('#activeSystemUserCheckBox').addClass('remove');
  }

  addSystemUserFields(){
    $('#systemUserTextField').removeClass('remove');
      $('#selectTeamMemberDropDown').removeClass('remove');
      $('#activeSystemUserCheckBox').removeClass('remove');
  }
}
