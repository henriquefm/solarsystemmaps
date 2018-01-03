import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { SpaceThing } from './../shared/models/spacething.model';
import { CatalogService } from './../shared/catalog.service';

/**
 * A MatCard that show information about the real and model sizes of the planet and its orbit
 */
@Component({
  selector: 'ssm-planetdetailscard',
  templateUrl: './planetdetailscard.component.html',
  styleUrls: ['./planetdetailscard.component.css']
})
export class PlanetdetailscardComponent implements OnInit {

  focusedPlanet$: Observable<SpaceThing>;
  dataSource$: PlanetDetailDataSource;
  displayedColumns = ['key', 'value'];

  constructor(private catalog: CatalogService) {
    
    this.focusedPlanet$ = this.catalog.focusedPlanetStore;

    this.dataSource$ = new PlanetDetailDataSource(this.catalog.focusedPlanetStore);

  }

  ngOnInit() {
  }

}

interface TableData{
  key: string;
  value: number;
}


class PlanetDetailDataSource extends DataSource<TableData> {
  

  constructor(private planet$: Observable<SpaceThing>) {
    super();
  }

  connect(): Observable<TableData[]> {

    return this.planet$.flatMap(planet => {
      let realRadius = {key: 'Real radius', value: planet.radius};
      let modelRadius = {key: 'Model radius', value: planet.modelRadius};
      let realOrbit = {key: 'Real orbit', value: planet.orbitSemiMajorAxis};
      let modelOrbit = {key: 'Model orbit', value: planet.modelOrbitSemiMajorAxis};
      return Observable.of([realRadius, modelRadius, realOrbit, modelOrbit]);
    })

  }

  disconnect() {}
}

