import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeimagesComponent } from './sizeimages.component';

describe('SizeimagesComponent', () => {
  let component: SizeimagesComponent;
  let fixture: ComponentFixture<SizeimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
