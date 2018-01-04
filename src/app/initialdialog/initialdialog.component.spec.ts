import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialdialogComponent } from './initialdialog.component';

describe('InitialdialogComponent', () => {
  let component: InitialdialogComponent;
  let fixture: ComponentFixture<InitialdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
