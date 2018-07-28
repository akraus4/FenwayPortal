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
  currentTeamMemberId;
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
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    this.removeSystemFields();
    this.removeSystemUserFields();
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
    this.activeValue = true;
    $('#editSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  }

  // addUserButtonClicked() {
  //   this.isSystemAdd = false;
  //   this.isSystemEdit = false;
  //   this.isSystemUserAdd = true;
  //   this.isSystemUserEdit = false;
  //   this.readOnly = false;
  //   this.submitButtonLbl = 'Add';

  //   // $('#selectSystemDropDown').addClass('remove');
  //   $('#typeTextField').addClass('remove');
  //   $('#selectTeamDropDown').addClass('remove');
  //   $('#activeCheckBox').addClass('remove');
  //   this.activeSystemUserValue = true;
  //   this.systemUserTextFieldValue = undefined;
  //   this.teamMemberValue = undefined;

  //   $('#editSystemButton').addClass('remove');
  //   $('#addSystemButton').addClass('remove');

  //   this.addSystemUserFields();
  //   $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  // }

  editSystemButtonClicked() {
    this.isSystemAdd = false;
    this.isSystemEdit = true;
    this.isSystemUserAdd = false;
    this.isSystemUserEdit = false;
    this.submitButtonLbl = 'Update';
    this.readOnly = false;
    $('#addSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
    this.systemTextFieldValue = this.currentSystem.agileSystemName;
  }

  //#endregion Top button click events

  //#region Get methods

  getAllSystems() {
    this.metricsService.getAll('AgileSystems', 'workTeam', '')
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.systemSelectBoxDataSource = results;
        console.log('Systems ===== ' + JSON.stringify(this.systemSelectBoxDataSource));
      });
  }

  getAllWorkTeams() {
    this.metricsService.getAll('WorkTeams', '', '')
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.teamSelectBoxDataSource = results;
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
      });
  }

  getAllSystemUsersBySystem(systemId) {
    console.log(systemId);
    let condition = `agileSystem=${systemId}`;
    this.metricsService.getAll('AgileSystemUsers', 'agileSystem,workTeamMember,workTeamMember.workUser', condition)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.currentSystemUsers = results;
        console.log(JSON.stringify(results));
        this.getAllTeamMembersByTeam(this.currentSystem.workTeam.workTeamId);
      });
  }

  getAllTeamMembersByTeam(teamId) {
    console.log('Team id = ' + teamId);
    let condition = `workTeam=${teamId}`;
    this.metricsService.getAll('WorkTeamMembers', 'workTeam,workUser', condition)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.systemUserGridDataSource = [];
        this.currentTeamMembers = results;
        console.log(JSON.stringify(results));
        var currentTeamMember;
        var teamMembers = [];
        var i = 0;
        for (let teamMember of results) {
          currentTeamMember = '';
          for (let systemUser of this.currentSystemUsers) {
            var activeView;
            if (systemUser.active == 1){
              activeView = 'True';
            } else if (systemUser.active == 0) {
              activeView = 'False';
            } 
            if (systemUser.workTeamMember.workTeamMemberId == teamMember.workTeamMemberId) {
              let tm = {
                'workTeamMemberId': teamMember.workTeamMemberId,
                'fullName': teamMember.workUser.firstname + ' ' + teamMember.workUser.lastname,
                'workUser': teamMember.workUser,
                'workTeam': teamMember.workTeam,

                'agileSystemUserId': systemUser.agileSystemUserId,
                'agileSystemUserName': systemUser.agileSystemUserName,
                'activeView': activeView,
                'active': systemUser.active
              }
              currentTeamMember = tm;
              console.log("TM = " + JSON.stringify(tm));
              this.systemUserGridDataSource.push(tm);
            }
            if (currentTeamMember == '' && this.currentSystemUsers.length <= i) {
              activeView = '';
              let tm = {
                'workTeamMemberId': teamMember.workTeamMemberId,
                'fullName': teamMember.workUser.firstname + ' ' + teamMember.workUser.lastname,
                'workUser': teamMember.workUser,
                'workTeam': teamMember.workTeam,

                'agileSystemUserId': '',
                'agileSystemUserName': '',
                'activeView': activeView,
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
    // this.metricsService.showLoadingPanel();
    this.readOnly = false;
    this.isSystemUserEdit = true;
    var component = e.component,
      prevClickTime = component.lastClickTime;
    component.lastClickTime = new Date();
    let selectedData = this.dataGrid.instance.getSelectedRowsData();
    console.log(e.key.active);

    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      //Double click code
      console.log(e.key.workTeamMemberId);
      $('#editSystemButton').addClass('remove');
      $('#addSystemButton').addClass('remove');
      this.currentSystemUserId = e.key.agileSystemUserId;
      this.submitButtonLbl = 'Update';
      this.addSystemUserFields();
      this.removeSystemFields();
      $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
      this.activeSystemUserValue = e.key.active;
      this.systemUserTextFieldValue = e.key.agileSystemUserName;
      this.currentTeamMemberId = e.key.workTeamMemberId;
      this.teamMemberValue = e.key.fullName;
    }
    else {
      //Single click code
    }
  }

  systemDropDownValueChanged(e) {
    var i = 0;
    if (this.isSystemEmpty) {
      this.isSystemEmpty = false;
    } else {
      $('#editSystemButton').removeClass('remove');
      $('#typeTextField').removeClass('remove');
      $('#selectTeamDropDown').removeClass('remove');
      $('#activeCheckBox').removeClass('remove');
      for (let system of this.systemSelectBoxDataSource) {
        if (e == system.agileSystemId) {
          this.currentSystem = system;
          this.systemTextFieldValue = system.agileSystemName;
          this.typeValue = system.agileSystemType;
          console.log(`Work Team 1 = ${system.workTeam.workTeamId}`)
          this.teamValue = system.workTeam.workTeamId;
          this.activeValue = system.active;
          this.getAllSystemUsersBySystem(system.agileSystemId)
        }
      }
    }
    if (this.systemDropDownValue == undefined) {
      $('#editSystemButton').addClass('remove');
      $('#typeTextField').addClass('remove');
      $('#selectTeamDropDown').addClass('remove');
      $('#activeCheckBox').addClass('remove');
    }
    // console.log(this.currentSystem.workTeam.workTeamId);

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

  checkBoxSystemUserToggled(e) {
    if (this.systemUserTextFieldValue != undefined && this.teamMemberValue != undefined && this.activeSystemUserValue != undefined) {
      this.submitButtonDisabled = false;
    } else {
      this.submitButtonDisabled = true;
    }
  }

  //#endregion System value changes


  //#region Submit Cancel button click events

  confirmYesButtonClicked() {
    this.metricsService.showLoadingPanel();
    if (this.isSystemAdd) {
      this.saveSystem();
    } else if (this.isSystemEdit) {
      this.updateSystem();
    } else if (this.isSystemUserAdd) {
      this.saveSystemUser();
    } else if (this.isSystemUserEdit) {
      console.log('SystemUser = ' + this.currentSystemUserId);
      if (this.currentSystemUserId != '') {
        this.updateSystemUser();
      } else {
        this.saveSystemUser();
      }
    }
  }

  cancelAddButtonClicked() {
    this.readOnly = true;
    this.removeSystemUserFields();
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');

    if (this.isSystemUserAdd) {
      this.addSystemFields();
    }

    if (this.systemDropDownValue != undefined) {
      $('#editSystemButton').removeClass('remove');
      $('#addSystemButton').removeClass('remove');
      this.typeValue = this.currentSystem.agileSystemType;
      this.teamValue = this.currentSystem.workTeam.workTeamId;
      this.activeValue = this.currentSystem.active;
    } else {
      this.removeSystemFields();
    }
  }



  confirmNoClicked() {
    this.modalService.hide(1);
  }

  saveSystem() {
    let system = {
      'agileSystemName': this.systemTextFieldValue,
      'agileSystemType': this.typeValue,
      'workTeam': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.save('AgileSystems', system)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        $('#selectSystemDropDown').removeClass('remove');
        $('#systemTextField').addClass('remove');
        this.readOnly = true;
        this.currentSystem = system;
        this.getAllSystems();
        this.getAllTeamMembersByTeam(system.workTeam.workTeamId);
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
      });
  }

  updateSystem() {
    let system = {
      'agileSystemId': this.currentSystem.agileSystemId,
      'agileSystemName': this.systemTextFieldValue,
      'agileSystemType': this.typeValue,
      'workTteam': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.update('AgileSystems', system.agileSystemId, system)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.readOnly = true;
        $('#selectSystemDropDown').removeClass('remove');
        $('#systemTextField').addClass('remove');
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        
        this.currentSystem = system;
        this.systemDropDownValue = system.agileSystemId;
        this.getAllSystems();
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource));
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
      });
  }

  saveSystemUser() {
    let systemUser = {
      'agileSystemUserName': this.systemUserTextFieldValue,
      'agileSystem': this.systemDropDownValue,
      'workTeamMember': this.currentTeamMemberId,
      'active': this.activeSystemUserValue
    }
    this.metricsService.save('AgileSystemUsers', systemUser)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        $('#systemUserTextField').addClass('remove');
        $('#addSystemButton').removeClass('remove');
        this.addSystemFields();
        this.removeSystemUserFields();
        this.readOnly = true;
        this.getAllSystemUsersBySystem(this.currentSystem.agileSystemId);
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
      });
  }

  updateSystemUser() {
    let systemUser = {
      'agileSystemUserId': this.currentSystemUserId,
      'agileSystemUserName': this.systemUserTextFieldValue,
      'agileSystem': this.systemDropDownValue,
      'workTeamMember': this.currentTeamMemberId,
      'active': this.activeSystemUserValue
    }
    console.log(`System User = ${JSON.stringify(systemUser)}`)
    this.metricsService.update('AgileSystemUsers', systemUser.agileSystemUserId, systemUser)
      .map(res => { return res.json(); })
      .subscribe((results) => {
        this.readOnly = true;
        $('#systemTextField').addClass('remove');
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
        $('#editSystemButton').removeClass('remove');
        $('#addSystemButton').removeClass('remove');
        this.addSystemFields();
        this.removeSystemUserFields();
        this.getAllSystemUsersBySystem(this.currentSystem.agileSystemId);
        this.modalService.hide(1);
        this.metricsService.hideLoadingPanel();
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
    $('#teamMemberTextField').addClass('remove');
    $('#activeSystemUserCheckBox').addClass('remove');
  }

  addSystemUserFields() {
    $('#systemUserTextField').removeClass('remove');
    $('#teamMemberTextField').removeClass('remove');
    $('#activeSystemUserCheckBox').removeClass('remove');
  }


}
