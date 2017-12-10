import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { Store } from '@ngrx/store';

import { PlanetModelState, PlanetModelStore } from './ngrx/reducer';
import { Stuff } from './models/stuff.model';
import { SolarSystem } from './models/solarsystem.model';
import { SpaceThing } from './models/spacething.model';

@Injectable()
export class CatalogService {

  public planetModelStore: Observable<PlanetModelState>;
  public focusedPlanetStore: Observable<SpaceThing>;
  
  constructor(public store: Store<PlanetModelStore>) {
    this.planetModelStore = this.store.select(s => s.planetModel);
    this.focusedPlanetStore = this.store.select(s => s.focusedPlanet);
  }


  /*
  *   SPACE THINGS
  */

  private sun = new SpaceThing('Sun', 695700000, 0);

  private mercury = new SpaceThing('Mercury', 2440000, 57910000000, 0.206);
  private venus = new SpaceThing('Venus', 6052000, 108200000000, 0.007);
  private earth = new SpaceThing('Earth', 6371000, 149600000000, 0.0167);
  private mars = new SpaceThing('Mars', 3390000, 227900000000, 0.093);
  private jupiter = new SpaceThing('Jupiter', 69911000, 778500000000, 0.048);
  private saturn = new SpaceThing('Saturn', 58232000, 1429000000000, 0.056);
  private uranus = new SpaceThing('Uranus', 25362000, 2877000000000, 0.047);
  private neptune = new SpaceThing('Neptune', 24662000, 4498000000000, 0.009);
  private pluto = new SpaceThing('Pluto', 1186000, 5906380000000, 0.248);

  private solarSystem = new SolarSystem(this.sun, [this.mercury, this.venus, this.earth, this.mars, this.jupiter,
        this.saturn, this.uranus, this.neptune, this.pluto]);


  getSolarSystem(): SolarSystem {
    return this.solarSystem;
  }

  getEarth(): SpaceThing {
    return this.earth;
  }

  getSun(): SpaceThing {
    return this.sun;
  }

  /*
  *   STUFF
  */

  private basketBall = new Stuff('Basketball', 0.1213);
  private tennisBall = new Stuff('Tennis ball', 0.03375);

  getStuffs(): Stuff[] {
    return [this.tennisBall, this.basketBall];
  }

  getDefaultStuff(): Stuff {
    return this.basketBall;
  }

  /*
  *   CITIES
  */

  cities = [{ lat: -22.971193, lng: -43.1825088 }, //Rio
            { lat: 40.782, lng: -73.965 }, //NY
            { lat: 34.052, lng: -118.256 }, //LA
            { lat: 48.8582756, lng: 2.2945214 }, //Paris
            { lat: 51.5007304, lng: -0.1246028 }, //London
            { lat: -33.8567955, lng: 151.2155381 }, //Sydney,
            ];

  getRandomCity(): google.maps.LatLng {

    let randomCity = this.cities[Math.floor(Math.random() * this.cities.length)];

    return new google.maps.LatLng(randomCity.lat, randomCity.lng);
  }

}
