import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
//import { NumberFormatStyle } from '@angular/common/src/facade/intl';

@Pipe({
  name: 'length'
})
//export class LengthPipe implements PipeTransform {
  export class LengthPipe extends DecimalPipe {

  transform(value: any, digits?: any): any {
    
    //Adapted from http://numeraljs.com/
    let abs = Math.abs(value);
    
    let unit = ' m';
    if( abs < 1 ){
      unit = ' cm';
      value = value / Math.pow(10, -2);
      abs = Math.abs(value);
    }else if(abs >= Math.pow(10, 3)){
      unit = ' km';
      value = value / Math.pow(10, 3);
      abs = Math.abs(value);
    }
    
    let sufix = '';
    if (abs >= Math.pow(10, 12)) {
      // trillion
      sufix = ' trillion';
      value = value / Math.pow(10, 12);
    } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)) {
      // billion
      sufix = ' billion';
      value = value / Math.pow(10, 9);
    } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6)) {
      // million
      sufix = ' million';
      value = value / Math.pow(10, 6);
    } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3)) {
      // thousand
      sufix = ' thousand';
      value = value / Math.pow(10, 3);
    }

    let decimalPipe = super.transform(value, digits);

    //return DecimalPipe.transform(value, NumberFormatStyle.Decimal, digits) + sufix + unit;
    return decimalPipe + sufix + unit;

  }

}
