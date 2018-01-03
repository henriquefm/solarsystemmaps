import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';


import { Stuff } from './../shared/models/stuff.model';
import { SpaceThing } from './../shared/models/spacething.model';

import { MODEL_SELECTED, PlanetModelState, PLANET_FOCUSED } from './../shared/ngrx/reducer';
import { SolarSystem } from './../shared/models/solarsystem.model';
import { CatalogService } from './../shared/catalog.service';
import { MathService } from './../shared/math.service';

import { } from 'googlemaps';

/**
 * The main component. It draws the map with all the orbits, and listens to changes to the planet model and clicks on the map.
 */
@Component({
  selector: 'ssm-mapwrapper',
  templateUrl: './mapwrapper.component.html',
  styleUrls: ['./mapwrapper.component.scss']
})
export class MapwrapperComponent implements OnInit {

  private map: google.maps.Map;
  private sunCircle: google.maps.Circle;
  private center: google.maps.LatLng;

  //private solarSystem: SolarSystem;
  private modelSolarSystem: SolarSystem;

  constructor(private catalog: CatalogService,
              private math: MathService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {

    window['gMapsLoaded'].then(() => {
      
      this.initMap();
      
      let mapReadyPromise = new Promise((resolve, reject) => {
        google.maps.event.addListenerOnce(this.map, 'idle', resolve);
      });

      mapReadyPromise.then(() => {
        this.catalog.store.dispatch({ type: MODEL_SELECTED, payload: {
          selectedPlanet: this.catalog.getEarth(),
          selectedStuff: this.catalog.getDefaultStuff()
        } });
      })

    });


    this.catalog.planetModelStore
      .filter(newState => newState !== undefined && !( Object.keys(newState).length === 0 && newState.constructor === Object) )
      .subscribe(newState => {
        this.redrawModel(newState);
      });


  }

  initMap() {

    this.center = this.catalog.getRandomCity();

    // Create the map.
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: this.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.map.addListener('click', (e) => {
      this.recenter(e.latLng);
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        let geolocationCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(geolocationCenter);
        this.recenter(geolocationCenter);
      });
    }


  }

  redrawModel(newState: PlanetModelState) {
    let selectedPlanet: SpaceThing = newState.selectedPlanet;
    let selectedStuff: Stuff = newState.selectedStuff;

    if(this.modelSolarSystem){
      this.sunCircle.setMap(null);
      this.modelSolarSystem.planets.forEach(planet => {
        planet.ellipse.setMap(null);
        //ellipse.set('map', null);
        planet.ellipse = null;
      });      
    }
    
    if (!this.map.getBounds().contains(this.center)) {
      this.center = this.map.getCenter();
    }

    this.modelSolarSystem = this.math.getModelSolarSystem(selectedPlanet.radius, selectedStuff.radius, this.center);
    this.modelSolarSystem.planets.reverse();

    this.sunCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.9,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.8,
      map: this.map,
      center: this.center,
      radius: this.modelSolarSystem.sun.modelRadius,
      clickable: false
    });
    

    this.modelSolarSystem.planets.forEach((planet) => {
      
      planet.ellipse = new google.maps.Polygon({
        paths: this.math.getEllipsePoints(planet.modelOrbitSemiMajorAxis, planet.eccentricity, this.center),
        map: this.map,
        strokeColor: '#A2A5FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0,
        clickable: true
      });

      planet.ellipse.addListener('mouseover', (v) => {
        
        this.catalog.store.dispatch({
          type: PLANET_FOCUSED,
          // Avoid Circular structure
          payload: Object.assign({}, planet, {ellipse: undefined})
        });

        this.changeDetectorRef.detectChanges();
          
        planet.ellipse.setOptions({
          strokeColor: '#0000FF',
        });
      });
      planet.ellipse.addListener('mouseout', (v) => {
        planet.ellipse.setOptions({
          strokeColor: '#A2A5FF',
        });
      });
      planet.ellipse.addListener('click', (e) => {
        this.recenter(e.latLng);
      });
    });
  }

  recenter(latLng) {
    this.center = latLng;
    
    if( ! this.modelSolarSystem ){
      return;
    }
    
    this.sunCircle.setCenter(this.center);
    
    this.modelSolarSystem.planets.forEach((planet) => {
      planet.ellipse.setPath( this.math.getEllipsePoints(planet.modelOrbitSemiMajorAxis, planet.eccentricity, this.center) )
    });
    
  }

  setPlanetDetails(planet: SpaceThing) {
    //this.focusedPlanet = planet;
    //this.changeDetectorRef.detectChanges();
  }

}
