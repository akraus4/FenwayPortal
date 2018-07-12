import { Component, OnInit, TemplateRef } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule } from 'devextreme-angular';
import * as $ from 'jquery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  systemSelectBoxDataSource = ['System 1', 'System 2', 'System 3'];
  teamSelectBoxDataSource = ['Team 1', 'Team 2', 'Team 3'];
  buttonLbl: string;
  readOnly;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    $('#systemTextField').addClass('remove');
    $('#typeTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#activeCheckBox').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
    this.readOnly = true;
  }


  openModal(agileWork: TemplateRef<any>) {
    this.modalRef = this.modalService.show(agileWork);
  }


  addSystemButtonClicked() {
    // alert("The Add Button was clicked");
    this.buttonLbl = 'Add';
    this.readOnly = false;
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
    this.buttonLbl = 'Update';
    this.readOnly = false;
    $('#addSystemButton').addClass('remove');
    $('#selectSystemDropDown').addClass('remove');
    $('#systemTextField').removeClass('remove');
    $('#typeTextField').removeClass('remove');
    $('#selectTeamDropDown').removeClass('remove');
    $('#activeCheckBox').removeClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').removeClass('remove');
  }

  checkBoxToggled(e) {
    if (e.value === true) {
      alert('Checkbox Checked');
    } else {
      alert('Checkbox Unchecked');
    }
  }

  cancelButtonClicked() {
    // alert("The Cancel Button was clicked"
    this.readOnly = true;
    $('#editSystemButton').removeClass('remove');
    $('#addSystemButton').removeClass('remove');
    $('#selectSystemDropDown').removeClass('remove');
    $('#systemTextField').addClass('remove');
    $('#selectTeamDropDown').addClass('remove');
    $('#typeTextField').addClass('remove');
    $('#activeCheckBox').addClass('remove');
    $('#agileTeamSubmitCancelBtnContainer').addClass('remove');
  }

  confirmNoClicked() {
    this.modalService.hide(1);
  }
}
