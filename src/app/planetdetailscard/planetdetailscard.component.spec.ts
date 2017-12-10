import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetdetailscardComponent } from './planetdetailscard.component';

describe('PlanetdetailscardComponent', () => {
  let component: PlanetdetailscardComponent;
  let fixture: ComponentFixture<PlanetdetailscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetdetailscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetdetailscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
