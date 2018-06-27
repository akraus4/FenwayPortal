import { Component, OnInit } from '@angular/core';
import { DxSelectBoxModule, DxButtonModule, DxCheckBoxModule, DxTextBoxModule, DxDataGridModule} from 'devextreme-angular'

@Component({
  selector: 'app-agile-team',
  templateUrl: './agile-team.component.html',
  styleUrls: ['./agile-team.component.css']
})
export class AgileTeamComponent implements OnInit {
  selectBoxDataSource = [ "Item 1", "Item 2", "Item 3" ];
  constructor() { }

  ngOnInit() {
  }

  buttonClicked() {
    alert("The Button was clicked");
}

checkBoxToggled(e) {
  alert(e.value);
};

}
