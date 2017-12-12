import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';

@Component({
  selector: 'ssm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Solar System Maps'

  constructor(private dialog: MatDialog){}

  openHelp(){
    this.dialog.open(HelpdialogComponent, {
      width: '600px'
    });
  }
}
