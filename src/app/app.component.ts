import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HelpdialogComponent } from './helpdialog/helpdialog.component';
import { InitialdialogComponent } from './initialdialog/initialdialog.component';

@Component({
  selector: 'ssm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Solar System Maps'

  constructor(private dialog: MatDialog){}

  ngOnInit(){
    
    // workaround for https://github.com/angular/angular/issues/15634
    setTimeout(() => {
      this.dialog.open(InitialdialogComponent, {
        width: '600px'
      });
    });
  }

  openHelp(){
    this.dialog.open(HelpdialogComponent, {
      width: '600px'
    });
  }
}
