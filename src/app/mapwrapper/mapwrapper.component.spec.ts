import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapwrapperComponent } from './mapwrapper.component';

describe('MapwrapperComponent', () => {
  let component: MapwrapperComponent;
  let fixture: ComponentFixture<MapwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
