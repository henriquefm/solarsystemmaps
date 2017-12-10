import { Injectable } from '@angular/core';

@Injectable()
export class AssetService {

  constructor() { }

  getPlanetImageSrc(planetName: string): string {
    return 'assets/images/' + planetName + '.jpg';
  }
  
  
  getPlanetBodySizeFactorInImage(planetName: string): number{
    if(planetName == 'Saturn'){
      return 0.625;
    }
    return 1;
  }

}
