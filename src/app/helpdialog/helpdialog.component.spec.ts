import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdialogComponent } from './helpdialog.component';

describe('HelpdialogComponent', () => {
  let component: HelpdialogComponent;
  let fixture: ComponentFixture<HelpdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
