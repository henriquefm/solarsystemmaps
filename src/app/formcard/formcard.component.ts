import { MODEL_SELECTED } from './../shared/ngrx/reducer';
import { Stuff } from './../shared/models/stuff.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SpaceThing } from './../shared/models/spacething.model';
import { SolarSystem } from './../shared/models/solarsystem.model';

import { CatalogService } from './../shared/catalog.service';

@Component({
  selector: 'ssm-formcard',
  templateUrl: './formcard.component.html',
  styleUrls: ['./formcard.component.scss']
})
export class FormcardComponent implements OnInit {

  planetModelForm: FormGroup;

  solarSystem: SolarSystem;
  stuffs: Stuff[];

  constructor(private fb: FormBuilder,
    private catalog: CatalogService) {

    this.planetModelForm = this.fb.group({
      'planet': '',
      'stuff': ''
    });

    this.solarSystem = this.catalog.getSolarSystem();
    this.stuffs = this.catalog.getStuffs();

  }

  ngOnInit() {
    this.planetModelForm.patchValue({
      'planet': this.catalog.getEarth(),
      'stuff': this.catalog.getDefaultStuff()
    })
  }

  onSubmit() {
    this.catalog.store.dispatch({
      type: MODEL_SELECTED,
      payload: {
        selectedPlanet: this.planetModelForm.get('planet').value,
        selectedStuff: this.planetModelForm.get('stuff').value
      }
    });

  }

}
