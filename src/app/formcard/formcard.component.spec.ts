import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcardComponent } from './formcard.component';

describe('FormcardComponent', () => {
  let component: FormcardComponent;
  let fixture: ComponentFixture<FormcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
