import { AssetService } from './asset.service';
import { CatalogService } from './catalog.service';
import { Injectable } from '@angular/core';

import { SolarSystem } from './models/solarsystem.model';
import { SpaceThing } from './models/spacething.model';

import { } from 'googlemaps';

@Injectable()
export class MathService {

  constructor(private catalog: CatalogService,
              private asset: AssetService) { }

  getModelSolarSystem(planetRadius: number, stuffRadius: number, rightFocus: google.maps.LatLng): SolarSystem{
    let factor = planetRadius / stuffRadius;
    
    let solarSystem = this.catalog.getSolarSystem();
    
    let sun = solarSystem.sun;
    let modelSun = new SpaceThing(sun.name, sun.radius, sun.orbitSemiMajorAxis);
    modelSun.modelRadius = sun.radius / factor;
 
    let modelPlanets: SpaceThing[] = [];
    solarSystem.planets.forEach(planet => {
      let modelPlanet = new SpaceThing(planet.name, planet.radius, planet.orbitSemiMajorAxis, planet.eccentricity);
      modelPlanet.modelRadius = planet.radius / factor;
      modelPlanet.modelOrbitSemiMajorAxis = planet.orbitSemiMajorAxis / factor;
      /*modelPlanet.ellipse = new google.maps.Polygon({
        paths: this.getEllipsePoints(modelPlanet.modelOrbitSemiMajorAxis, modelPlanet.eccentricity, rightFocus)
      })*/
      modelPlanets.push(modelPlanet);
    });
    
    return new SolarSystem(modelSun, modelPlanets);
  }


  getEllipsePoints(semiMajorAxis: number, eccentricity: number, rightFocus: google.maps.LatLng): google.maps.LatLng[]{
    
    let semiMinorAxis = semiMajorAxis * Math.sqrt( 1 - Math.pow( eccentricity, 2 ) );
    
    let distanceCenterFocus =  semiMajorAxis * eccentricity;
    let center = google.maps.geometry.spherical.computeOffset(rightFocus, distanceCenterFocus, -90);
    
    let points: google.maps.LatLng[] = [];
    
    for(let angle = 0; angle < 360; angle++){
      let angleRadians = angle * Math.PI / 180;
      let degreesFromNorth = 90 - angle;
      let r = semiMajorAxis * semiMinorAxis / Math.sqrt( Math.pow(semiMinorAxis * Math.cos(angleRadians), 2) + Math.pow(semiMajorAxis * Math.sin(angleRadians), 2) )
      
      points.push( google.maps.geometry.spherical.computeOffset(center, r, degreesFromNorth) );
    }
    
    return points;
  }

  getPlanetImageSize(planet: SpaceThing, earthImageSize: number){
    let earth = this.catalog.getEarth();
    let planetBodySizeFactorInImage = this.asset.getPlanetBodySizeFactorInImage(planet.name);
    //let planetBodySizeFactorInImage = 1;
    
    let factor = planet.radius / earth.radius;
    
    //return earthImageSize * factor / planetBodySizeFactorInImage;
    return earthImageSize * factor;
    
  }

}
