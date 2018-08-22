import { Component, OnInit, Inject, TemplateRef, ViewChild } from '@angular/core'
import { DxDataGridComponent } from 'devextreme-angular'
import * as $ from 'jquery'
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service'
import { MetricsService } from '../services/metrics.service'
import notify from 'devextreme/ui/notify'
import { confirm } from 'devextreme/ui/dialog'

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  metricsService: any
  submitButtonLbl: string
  modalRef: BsModalRef

  //  Current Values
  currentTeamMemberId //  Used to identify team member when a user is saved/updated.
  currentSystemUsers // Used for loop to attach system user to team member.
  currentSystemUserId // Used to attach the system users id to object when updating.
  currentSystem

  // NgModels
  activeValue: boolean
  newSystemValue: any
  systemValue: any
  typeValue: any
  systemDropDownValue: any
  systemTextFieldValue: any
  teamValue: any
  systemUserTextFieldValue: any
  teamMemberValue: any
  activeSystemUserValue: any

  // Datasources
  systemUserGridDataSource = []
  systemSelectBoxDataSource
  teamSelectBoxDataSource

  // Flags
  isSystemEmpty: boolean = true
  isSystemAdd: boolean = false
  isSystemEdit: boolean = false
  isSystemUserEdit: boolean = false
  readOnly: boolean
  submitButtonDisabled: boolean

  constructor (private modalService: BsModalService, @Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
  }

  ngOnInit () {
    this.readOnly = true
    this.activeValue = false
    // this.submitButtonDisabled = true
    $('#editSystemButton').addClass('remove')
    $('#systemTextField').addClass('remove')
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove')
    this.removeSystemFields()
    this.removeSystemUserFields()
    this.getAllSystems()
    this.getAllWorkTeams()
  }

  openModal (submitConfirmationModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(submitConfirmationModal)
  }

  // #region Top button click events

  addSystemButtonClicked () {
    this.isSystemAdd = true
    this.isSystemEdit = false
    this.isSystemUserEdit = false
    this.submitButtonLbl = 'Add'
    this.readOnly = false
    this.systemTextFieldValue = undefined
    this.typeValue = undefined
    this.teamValue = undefined
    this.activeValue = true
    $('#editSystemButton').addClass('remove')
    $('#selectSystemDropDown').addClass('remove')
    $('#systemTextField').removeClass('remove')
    $('#typeTextField').removeClass('remove')
    $('#selectTeamDropDown').removeClass('remove')
    $('#activeCheckBox').removeClass('remove')
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove')
  }

  editSystemButtonClicked () {
    this.isSystemAdd = false
    this.isSystemEdit = true
    this.isSystemUserEdit = false
    this.submitButtonLbl = 'Update'
    this.readOnly = false
    $('#addSystemButton').addClass('remove')
    $('#selectSystemDropDown').addClass('remove')
    $('#systemTextField').removeClass('remove')
    $('#typeTextField').removeClass('remove')
    $('#selectTeamDropDown').removeClass('remove')
    $('#activeCheckBox').removeClass('remove')
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove')
    this.systemTextFieldValue = this.currentSystem.agileSystemName
  }

  // #endregion Top button click events

  // #region Get methods

  getAllSystems () {
    this.metricsService.getAll('AgileSystems', 'workTeam', '')
      .subscribe((results) => {
        this.systemSelectBoxDataSource = results
        console.log('Systems ===== ' + JSON.stringify(this.systemSelectBoxDataSource))
      })
  }

  getAllWorkTeams () {
    this.metricsService.getAll('WorkTeams', '', '')
      .subscribe((results) => {
        this.teamSelectBoxDataSource = results
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource))
      })
  }

  getAllSystemUsersBySystem (systemId) {
    console.log(systemId)
    let condition = `agileSystem=${systemId}`
    this.metricsService.getAll('AgileSystemUsers', 'agileSystem,workTeamMember,workTeamMember.workUser', condition)
      .subscribe((results) => {
        this.currentSystemUsers = results
        console.log(`GetAllSystemUsersBySystem Results === ${JSON.stringify(results)}`)
        this.getAllTeamMembersByTeam(this.currentSystem.workTeam.workTeamId)
      })
  }

  getAllTeamMembersByTeam (teamId) {
    let condition = `workTeam=${teamId}`
    this.metricsService.getAll('WorkTeamMembers', 'workTeam,workUser', condition)
      .subscribe((results) => {
        console.log(`GetAllTeamMembersByTeam Results ==== ${JSON.stringify(results)}`)
        this.systemUserGridDataSource = [] // Clears grid
        let currentTeamMember // Used to determine if the team member has a system user connected to it.
        for (let teamMember of results) {
          currentTeamMember = ''
          let teamMemberUserActiveView
          if (teamMember.active === 1) {
            teamMemberUserActiveView = 'True'
          } else if (teamMember.active === 0) {
            teamMemberUserActiveView = 'False'
          }
          for (let systemUser of this.currentSystemUsers) {
            // Populates grid with True or False instead of 1 or 0.
            let systemUserActiveView
            if (systemUser.active === 1) {
              systemUserActiveView = 'True'
            } else if (systemUser.active === 0) {
              systemUserActiveView = 'False'
            }
            // If a team member is connected to a system user.
            if (systemUser.workTeamMember.workTeamMemberId === teamMember.workTeamMemberId) {
              let member = {
                'workTeamMemberId': teamMember.workTeamMemberId,
                'fullName': teamMember.workUser.firstname + ' ' + teamMember.workUser.lastname,
                'workUser': teamMember.workUser,
                'workTeam': teamMember.workTeam,
                'workTeamMemberActive': teamMember.active,
                'teamMemberUserActiveView': teamMemberUserActiveView,

                'agileSystemUserId': systemUser.agileSystemUserId,
                'agileSystemUserName': systemUser.agileSystemUserName,
                'systemUserActiveView': systemUserActiveView,
                'systemUserActive': systemUser.active
              }
              currentTeamMember = member
              this.systemUserGridDataSource.push(member)
            }
          }
          // If the the team member isn't connected to a system user.
          if (currentTeamMember === '') {
            let memberNoSystemUser = {
              'workTeamMemberId': teamMember.workTeamMemberId,
              'fullName': teamMember.workUser.firstname + ' ' + teamMember.workUser.lastname,
              'workUser': teamMember.workUser,
              'workTeam': teamMember.workTeam,
              'workTeamMemberActive': teamMember.active,
              'teamMemberUserActiveView': teamMemberUserActiveView,

              'agileSystemUserId': '',
              'agileSystemUserName': '',
              'systemUserActiveView': '',
              'systemUserActive': 0
            }
            this.systemUserGridDataSource.push(memberNoSystemUser)
          }
        }
        this.metricsService.hideLoadingPanel()
      })

  }

  // #endregion Get methods

  // #region Value changes

  // Grid double click event
  onRowClick (e) {
    //  this.metricsService.showLoadingPanel()
    this.readOnly = false
    let component = e.component, prevClickTime = component.lastClickTime;
    component.lastClickTime = new Date()
    let selectedData = this.dataGrid.instance.getSelectedRowsData()
    console.log(e.key.active)

    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      // Double click code
      // this.submitButtonDisabled = true
      this.isSystemAdd = false
      this.isSystemEdit = false
      this.isSystemUserEdit = true
      $('#editSystemButton').addClass('hide')
      $('#addSystemButton').addClass('hide')
      $('#agileTeamSubmitCancelBtnContainer').removeClass('remove')
      this.addSystemUserFields()
      this.removeSystemFields()
      // $('#selectSystemDropDown').addClass('hide')
      this.currentSystemUserId = e.key.agileSystemUserId
      this.submitButtonLbl = 'Update'
      if (e.key.systemUserActiveView !== '') {
        this.activeSystemUserValue = e.key.systemUserActive
      } else {
        this.activeSystemUserValue = 1
      }
      this.systemUserTextFieldValue = e.key.agileSystemUserName
      this.currentTeamMemberId = e.key.workTeamMemberId
      this.teamMemberValue = e.key.fullName
      // if (e.key.agileSystemUserName !== '' && this.teamMemberValue !== '') {
      //   this.submitButtonDisabled = false
      // }
    } else {
      // Single click code
    }
  }

  systemDropDownValueChanged (e) {
    let i = 0
    if (this.isSystemEmpty) {
      this.isSystemEmpty = false
    } else {
      $('#editSystemButton').removeClass('remove')
      $('#typeTextField').removeClass('remove')
      $('#selectTeamDropDown').removeClass('remove')
      $('#activeCheckBox').removeClass('remove')
      for (let system of this.systemSelectBoxDataSource) {
        if (e === system.agileSystemId) {
          this.currentSystem = system
          this.systemTextFieldValue = system.agileSystemName
          this.typeValue = system.agileSystemType
          console.log(`Work Team 1 = ${system.workTeam.workTeamId}`)
          this.teamValue = system.workTeam.workTeamId
          this.activeValue = system.active
          this.getAllSystemUsersBySystem(system.agileSystemId)
        }
      }
    }
    if (this.systemDropDownValue === undefined) {
      $('#editSystemButton').addClass('remove')
      $('#typeTextField').addClass('remove')
      $('#selectTeamDropDown').addClass('remove')
      $('#activeCheckBox').addClass('remove')
    }
    //  console.log(this.currentSystem.workTeam.workTeamId)

  }

  // Enable submit button once all fields have values.
  systemTextFieldValueChanged (e) {
    // if (this.systemTextFieldValue !== undefined && this.typeValue !== undefined && this.teamValue !== undefined && this.activeValue !== undefined) {
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  typeValueChanged (e) {
    // if (this.systemTextFieldValue !== undefined && this.typeValue !== undefined && this.teamValue !== undefined && this.activeValue !== undefined) {
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  teamValueChanged (e) {
    // if ((this.systemTextFieldValue !== undefined || this.systemTextFieldValue !== '') && this.typeValue !== undefined && this.teamValue !== undefined && this.activeValue !== undefined) {
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  checkBoxToggled (e) {
    // if (this.systemTextFieldValue !== undefined && this.typeValue !== undefined && this.teamValue !== undefined && this.activeValue !== undefined) {
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  systemUserTextFieldValueChanged (e) {
    // if (e.value !== '' && this.teamMemberValue !== undefined && this.activeSystemUserValue !== undefined) {
    //   console.log('here 1')
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  checkBoxSystemUserToggled (e) {
    // if (this.systemUserTextFieldValue !== '' && this.teamMemberValue !== undefined && this.activeSystemUserValue !== undefined) {
    //   console.log('here 2')
    //   this.submitButtonDisabled = false
    // } else {
    //   this.submitButtonDisabled = true
    // }
  }

  // #endregion System value changes

  // #region Submit/Cancel/Confirmation button click events

  confirmYesButtonClicked () {
    this.metricsService.showLoadingPanel()
    if (this.isSystemAdd) {
      this.saveSystem()
    } else if (this.isSystemEdit) {
      this.updateSystem()
    } else if (this.isSystemUserEdit) {
      if (this.currentSystemUserId !== '') {
        this.updateSystemUser()
      } else {
        this.saveSystemUser()
      }
    }
  }

  cancelAddButtonClicked () {
    this.readOnly = true
    this.removeSystemUserFields()
    $('#selectSystemDropDown').removeClass('remove')
    $('#systemTextField').addClass('remove')
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove')

    if (this.systemDropDownValue !== undefined) {
      $('#editSystemButton').removeClass('remove')
      $('#addSystemButton').removeClass('remove')
      $('#editSystemButton').removeClass('hide')
      $('#addSystemButton').removeClass('hide')
      this.typeValue = this.currentSystem.agileSystemType
      this.teamValue = this.currentSystem.workTeam.workTeamId
      this.activeValue = this.currentSystem.active
    } else {
      this.removeSystemFields()
    }
  }

  submitButtonClick () {
    let that = this
    if (this.isSystemUserEdit) {
      if (this.systemUserTextFieldValue !== '' && this.teamMemberValue !== undefined && this.activeSystemUserValue !== undefined) {
        const result = confirm('Are you sure you want to save System User?', 'Confirm changes')
        result.then(function (dialogResult) {
          if (dialogResult) {
            if (that.currentSystemUserId !== '') {
              that.updateSystemUser()
            } else {
              that.saveSystemUser()
            }
          }
        })
      } else {
        notify('All fields must have a value!', 'error', 600)
      }
    } else if (this.isSystemAdd || this.isSystemEdit) {
      if (this.systemTextFieldValue !== undefined && this.typeValue !== undefined && this.teamValue !== undefined && this.systemTextFieldValue !== '' && this.typeValue !== '' && this.teamValue !== '' && this.activeValue !== undefined) {
        console.log(`systemTextFieldValue ==== ${this.systemTextFieldValue}`)
        console.log(`typeValue ==== ${this.typeValue}`)
        console.log(`teamValue ==== ${this.teamValue}`)
        const result = confirm('Are you sure you want to save System?', 'Confirm changes')
        result.then(function (dialogResult) {
          if (dialogResult) {
            if (that.isSystemAdd) {
              that.saveSystem()
            } else if (that.isSystemEdit) {
              that.updateSystem()
            }
          }
        })
      } else {
        notify('All fields must have a value!', 'error', 600)
      }
    }
  }

  confirmNoClicked () {
    this.modalService.hide(1)
  }

  saveSystem () {
    this.metricsService.showLoadingPanel()
    let system = {
      'agileSystemName': this.systemTextFieldValue,
      'agileSystemType': this.typeValue,
      'workTeam': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.save('AgileSystems', system)
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove')
        $('#selectSystemDropDown').removeClass('remove')
        $('#systemTextField').addClass('remove')
        this.readOnly = true
        this.currentSystem = system
        this.getAllSystems()
        this.getAllTeamMembersByTeam(system.workTeam.workTeamId)
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource))
        this.modalService.hide(1)
        this.metricsService.hideLoadingPanel()
      })
  }

  updateSystem () {
    let system = {
      'agileSystemId': this.currentSystem.agileSystemId,
      'agileSystemName': this.systemTextFieldValue,
      'agileSystemType': this.typeValue,
      'workTteam': this.teamValue,
      'active': this.activeValue
    }
    this.metricsService.update('AgileSystems', system.agileSystemId, system)
      .subscribe((results) => {
        this.readOnly = true
        $('#selectSystemDropDown').removeClass('remove')
        $('#systemTextField').addClass('remove')
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove')

        this.currentSystem = system
        this.systemDropDownValue = system.agileSystemId
        this.getAllSystems()
        console.log('WorkTeams ===== ' + JSON.stringify(this.teamSelectBoxDataSource))
        this.modalService.hide(1)
        this.metricsService.hideLoadingPanel()
      })
  }

  saveSystemUser () {
    this.metricsService.showLoadingPanel()
    let systemUser = {
      'agileSystemUserName': this.systemUserTextFieldValue,
      'agileSystem': this.systemDropDownValue,
      'workTeamMember': this.currentTeamMemberId,
      'active': this.activeSystemUserValue
    }
    this.metricsService.save('AgileSystemUsers', systemUser)
      .subscribe((results) => {
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove')
        $('#systemUserTextField').addClass('remove')
        $('#addSystemButton').removeClass('remove')
        this.addSystemFields()
        this.removeSystemUserFields()
        this.readOnly = true
        this.getAllSystemUsersBySystem(this.currentSystem.agileSystemId)
        this.modalService.hide(1)
        this.metricsService.hideLoadingPanel()
      })
  }

  updateSystemUser () {
    let systemUser = {
      'agileSystemUserId': this.currentSystemUserId,
      'agileSystemUserName': this.systemUserTextFieldValue,
      'agileSystem': this.systemDropDownValue,
      'workTeamMember': this.currentTeamMemberId,
      'active': this.activeSystemUserValue
    }
    console.log(`System User = ${JSON.stringify(systemUser)}`)
    this.metricsService.update('AgileSystemUsers', systemUser.agileSystemUserId, systemUser)
      .subscribe((results) => {
        this.readOnly = true
        $('#systemTextField').addClass('remove')
        $('#agileTeamSubmitCancelBtnContainer').addClass('remove')
        $('#editSystemButton').removeClass('remove')
        $('#addSystemButton').removeClass('remove')
        this.addSystemFields()
        this.removeSystemUserFields()
        this.getAllSystemUsersBySystem(this.currentSystem.agileSystemId)
        this.modalService.hide(1)
        this.metricsService.hideLoadingPanel()
      })
  }

  // #endregion Submit Cancel button click events

  removeSystemFields () {
    $('#typeTextField').addClass('remove')
    $('#selectTeamDropDown').addClass('remove')
    $('#activeCheckBox').addClass('remove')
  }

  addSystemFields () {
    $('#typeTextField').removeClass('remove')
    $('#selectTeamDropDown').removeClass('remove')
    $('#activeCheckBox').removeClass('remove')
  }

  removeSystemUserFields () {
    $('#systemUserTextField').addClass('remove')
    $('#teamMemberTextField').addClass('remove')
    $('#activeSystemUserCheckBox').addClass('remove')
  }

  addSystemUserFields () {
    $('#systemUserTextField').removeClass('remove')
    $('#teamMemberTextField').removeClass('remove')
    $('#activeSystemUserCheckBox').removeClass('remove')
  }

}
