import { Component, OnInit, Inject, TemplateRef, ViewChild } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule, DxDataGridComponent } from 'devextreme-angular';
import * as $ from 'jquery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import DataSource from 'devextreme/data/data_source';
import { MetricsService } from '../services/metrics.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  metricsService: any;
  submitButtonLbl: string;
  modalRef: BsModalRef;

  //Current Values
  currentTeamMembers;
  currentSystemUsers;
  currentSystemUserId;
  currentSystem;

  //NgModels
  activeValue: boolean;
  newSystemValue: any;
  systemValue: any;
  typeValue: any;
  systemDropDownValue: any;
  systemTextFieldValue: any;
  teamValue: any;
  systemUserTextFieldValue: any;
  teamMemberValue: any;
  activeSystemUserValue: any;

  //Datasources
  systemUserGridDataSource = [];
  systemSelectBoxDataSource;
  teamSelectBoxDataSource;

  //Flags
  isSystemEmpty: boolean = true;
  isSystemAdd: boolean = false;
  isSystemEdit: boolean = false;
  isSystemUserAdd: boolean = false;
  isSystemUserEdit: boolean = false;
  readOnly: boolean;
  submitButtonDisabled: boolean;

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
  }

  addUserButtonClicked() {
    this.isSystemAdd = false;
    this.isSystemEdit = false;
    this.isSystemUserAdd = true;
    this.isSystemUserEdit = false;
    this.readOnly = false;
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
    this.submitButtonLbl = 'Update';
    this.readOnly = false;
    $('#addSystemButton').addClass('remove');
    $('#addUserButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    this.systemTextFieldValue = this.currentSystem.agile_system_name;
    // $('#cancelAddButton').removeClass('remove');
  }

  //#endregion Top button click events

  //#region Get methods

  getAllSystems() {
    this.metricsService.getAll('AgileSystems')
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.systemSelectBoxDataSource = results;
        console.log('Systems ===== ' + JSON.stringify(this.systemSelectBoxDataSource));
      });
  }

  getAllWorkTeams() {
    this.metricsService.getAll('WorkTeams')
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
      .subscribe((results) => {
        // this.systemUserGridDataSource = results; 
        this.currentSystemUsers = results;
        console.log(results);
        this.getAllTeamMembersByTeam(this.currentSystem.work_team.work_team_id);
      });
  }

  getAllTeamMembersByTeam(team_id) {
    console.log('Team id = ' + team_id);
    this.metricsService.getAllTeamMembersByTeam(team_id)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.systemUserGridDataSource = [];
        this.currentTeamMembers = results;
        console.log(results);
        var currentTeamMember;
        var teamMembers = [];
        var i = 0;
        for (let teamMember of results) {
          currentTeamMember = '';
          for (let systemUser of this.currentSystemUsers) {
            if (systemUser.work_team_member.work_team_member_id == teamMember.work_team_member_id) {
              let tm = {
                'work_team_member_id': teamMember.work_team_member_id,
                'full_name': teamMember.work_user.firstname + ' ' + teamMember.work_user.lastname,
                'work_user': teamMember.work_user,
                'work_team': teamMember.work_team,

                'agile_system_user_id': systemUser.agile_system_user_id,
                'agile_system_user_name': systemUser.agile_system_user_name,
                'active': systemUser.active
              }
              currentTeamMember = tm;
              console.log("TM = " + JSON.stringify(tm));
              this.systemUserGridDataSource.push(tm);
            }
            if (currentTeamMember == '' && this.currentSystemUsers.length <= i) {
              let tm = {
                'work_team_member_id': teamMember.work_team_member_id,
                'full_name': teamMember.work_user.firstname + ' ' + teamMember.work_user.lastname,
                'work_user': teamMember.work_user,
                'work_team': teamMember.work_team,

                'agile_system_user_id': '',
                'agile_system_user_name': '',
                'active': 0
              }
              console.log("TM2 = " + JSON.stringify(tm));
              this.systemUserGridDataSource.push(tm);
            }
          }
          i++;
        }
        this.metricsService.hideLoadingPanel();
      });

  }

  //#endregion Get methods

  //#region System value changes

  onRowClick(e) {
    this.metricsService.showLoadingPanel();
    this.readOnly = false;
    this.isSystemUserEdit = true;
    var component = e.component,
    prevClickTime = component.lastClickTime;
    component.lastClickTime = new Date();
    let selectedData = this.dataGrid.instance.getSelectedRowsData();
    console.log(e.key.active);

    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      //Double click code
      console.log(e.key.work_team_member_id);
      $('#editSystemButton').addClass('remove');
      $('#addSystemButton').addClass('remove');
      // $('#selectSystemDropDown').addClass('remove');
      this.currentSystemUserId = e.key.agile_system_user_id;
      this.submitButtonLbl = 'Add';
      this.addSystemUserFields();
      this.removeSystemFields();
      $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
      this.activeSystemUserValue = e.key.active;
      this.systemUserTextFieldValue = e.key.agile_system_user_name;
      this.teamMemberValue = e.key.work_team_member_id;
    }
    else {
      //Single click code
      // console.log('single click');
    }
  }

  systemDropDownValueChanged(e) {
    var i = 0;
    if (this.isSystemEmpty) {
      this.isSystemEmpty = false;
    } else {
      $('#editSystemButton').removeClass('remove');
      $('#addUserButton').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
      // this.getAllSystemUsersBySystem(e);
      for (let system of this.systemSelectBoxDataSource) {
        if (e == system.agile_system_id) {
          this.currentSystem = system;
          this.systemTextFieldValue = system.agile_system_name;
          this.typeValue = system.agile_system_type;
          this.teamValue = this.currentSystem.work_team.work_team_id;
          this.activeValue = system.active;
        }
      }
    }
    if (this.systemDropDownValue == undefined) {
      $('#editSystemButton').addClass('remove');
      $('#addUserButton').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
    this.getAllTeamMembersByTeam(this.currentSystem.work_team.work_team_id);
  }

  systemTextFieldValueChanged(e) {
    if (this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  typeValueChanged(e) {
    if (this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  teamValueChanged(e) {
    if (this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  checkBoxToggled(e) {
    if (this.systemTextFieldValue != undefined && this.typeValue != undefined && this.teamValue != undefined && this.activeValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  systemUSerTextFieldValueChanged(e) {
    if (this.systemUserTextFieldValue != undefined && this.teamMemberValue != undefined && this.activeSystemUserValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  teamMemberValueChanged(e) {
    if (this.systemUserTextFieldValue != undefined && this.teamMemberValue != undefined && this.activeSystemUserValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  checkBoxSystemUserToggled(e) {
    if (this.systemUserTextFieldValue != undefined && this.teamMemberValue != undefined && this.activeSystemUserValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  //#endregion System value changes


  //#region Submit Cancel button click events

  submitButtonClicked() {
    this.metricsService.showLoadingPanel();
    if (this.isSystemAdd) {
      console.log('*********************save system ******************');
      this.saveSystem();
    } else if (this.isSystemEdit) {
      console.log('******************update system*************************');
      this.updateSystem();
    }
  }

  cancelAddButtonClicked() {
    this.readOnly = true;
    this.removeSystemUserFields();
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');

    if (this.isSystemUserAdd) {
      $('#selectTeamDropDown').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
    }

    if (this.systemDropDownValue != undefined) {
      $('#editSystemButton').removeClass('remove');
      $('#addUserButton').removeClass('remove');
      $('#addSystemButton').removeClass('remove');
      this.typeValue = this.currentSystem.agile_system_type;
      this.teamValue = this.currentSystem.work_team.work_team_id;
      this.activeValue = this.currentSystem.active;
    } else {
      console.log('HEEERERERERERE');
      $('#selectTeamDropDown').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
  }



  confirmNoClicked() {
    this.modalService.hide(1);
  }

  saveSystem() {
    let system = {
      'agile_system_name': this.systemTextFieldValue,
      'agile_system_type': this.typeValue,
      'work_team': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.saveSystem(JSON.stringify(system))
      .map(res => { return res.json(); })
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
        $('#selectSystemDropDown').addClass('remove');
        $('#systemTextField').addClass('remove');
        this.readOnly = true;
        this.currentSystem = system;
        this.getAllSystems();
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
      });
  }

  updateSystem() {
    let system = {
      'agile_system_id': this.currentSystem.agile_system_id,
      'agile_system_name': this.systemTextFieldValue,
      'agile_system_type': this.typeValue,
      'work_team': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.updateSystem(JSON.stringify(system))
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.readOnly = true;
        $('#selectSystemDropDown').removeClass('remove');
        $('#systemTextField').addClass('remove');
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        this.currentSystem = system;
        this.systemDropDownValue = system.agile_system_id;
        this.getAllSystems();
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
      });
  }

  saveSystemUser() {
    let systemUser = {
      'agile_system_name': this.systemUserTextFieldValue,
      'agile_system': this.systemDropDownValue,
      'work_team_member': this.teamMemberValue,
      'active': this.activeSystemUserValue
    }
    this.metricsService.saveSystemUser(JSON.stringify(systemUser))
      .map(res => { return res.json(); })
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
        // $('#selectSystemDropDown').addClass('remove');
        // $('#systemTextField').addClass('remove');
        this.readOnly = true;
        // this.currentSystem = systemUser;
        // this.getAllSystemUsersBySystem(this.currentSystem);
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
      });
  }

  updateSystemUser() {
    let systemUser = {
      'agile_system_user_id': this.currentSystemUserId,
      'agile_system_name': this.systemUserTextFieldValue,
      'agile_system': this.systemDropDownValue,
      'work_team_member': this.teamMemberValue,
      'active': this.activeSystemUserValue
    }
    this.metricsService.updateSystemUser(JSON.stringify(systemUser))
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.readOnly = true;
        $('#selectSystemDropDown').removeClass('remove');
        $('#systemTextField').addClass('remove');
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        // this.currentSystem = systemUser;
        // this.systemDropDownValue = systemUser.agile_system_id;
        // this.getAllSystemUsersBySystem(this.currentSystem);
        this.getAllSystems();
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
      });
  }

  //#endregion Submit Cancel button click events

  removeSystemFields() {
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');
  }

  addSystemFields() {
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
  }

  removeSystemUserFields() {
    $('#systemUserTextField').addClass('remove');
    $('#selectTeamMemberDropDown').addClass('remove');
    $('#activeSystemUserCheckBox').addClass('remove');
  }

  addSystemUserFields() {
    $('#systemUserTextField').removeClass('remove');
    $('#selectTeamMemberDropDown').removeClass('remove');
    $('#activeSystemUserCheckBox').removeClass('remove');
  }


}
