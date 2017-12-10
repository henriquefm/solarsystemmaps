import { MathService } from './../shared/math.service';
import { AssetService } from './../shared/asset.service';
import { SpaceThing } from './../shared/models/spacething.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { CatalogService } from './../shared/catalog.service';

const DEFAULT_EARTH_SIZE = 120;
const DEFAULT_BLOCK_SIZE = 170;

@Component({
  selector: 'ssm-sizeimages',
  templateUrl: './sizeimages.component.html',
  styleUrls: ['./sizeimages.component.css']
})
export class SizeimagesComponent implements OnInit {

  planet$: Observable<SpaceThing>;

  constructor(private catalog: CatalogService,
              private assets: AssetService,
              private math: MathService) {
    this.planet$ = this.catalog.focusedPlanetStore;
  }

  ngOnInit() {
  }

  get earth(): SpaceThing{ 
    return this.catalog.getEarth();
  }

  get earthImageSrc(){
    return this.assets.getPlanetImageSrc( this.earth.name );
  }

  get earthImageSize(){
    return DEFAULT_EARTH_SIZE;
  }

  get earthImageOuterTop(){
    return ( DEFAULT_BLOCK_SIZE - DEFAULT_EARTH_SIZE ) / 2;
  }

  getPlanetImageSrc(planetName: string){
    return this.assets.getPlanetImageSrc(planetName);
  }

  getPlanetImageSize(planet: SpaceThing){
    return this.math.getPlanetImageSize(planet, DEFAULT_EARTH_SIZE);
  }

  getPlanetImageOuterTop(planet: SpaceThing){
    return ( DEFAULT_BLOCK_SIZE - this.getPlanetImageSize(planet) ) / 2;
  }

}
