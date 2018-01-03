
/** It can be a planet or the Sun */
export class SpaceThing {

    //Model
    public ellipse: google.maps.Polygon;
    public modelRadius: number;
    public modelOrbitSemiMajorAxis: number;
    

    constructor(public name: string,
        public radius: number,
        public orbitSemiMajorAxis: number,
        public eccentricity?: number) { }

}