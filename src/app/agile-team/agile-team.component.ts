import { Component, OnInit } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule } from 'devextreme-angular'

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  systemSelectBoxDataSource = ["System 1", "System 2", "System 3"];
  teamSelectBoxDataSource = ["Team 1", "Team 2", "Team 3"];
  constructor() { }

  ngOnInit() {
  }

  addSystemButtonClicked() {
    alert("The Add Button was clicked");
  }

  editSystemButtonClicked() {
    alert("The Edit Button was clicked");
  }

  checkBoxToggled(e) {
    if(e.value == true){
      alert("Checkbox Checked")
    }
    else{
      alert("Checkbox Unchecked")
    }
  };

  submitButtonClicked() {
    alert("The Submit Button was clicked");
  }

  cancelButtonClicked() {
    alert("The Cancel Button was clicked");
  }

}