import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bigvalue'
})
export class BigvaluePipe implements PipeTransform {


  transform(valeur: number, args?: any): string {
    let res: string = "";
  
    if (valeur < 1000) {
      res = valeur.toFixed(2);
    } else if (valeur < 1000000) {
      res = (valeur / 1000).toFixed(2) + "K";
    } else if (valeur < 1000000000) {
      res = (valeur / 1000000).toFixed(2) + "M";
    } else if (valeur < 1000000000000) {
      res = (valeur / 1000000000).toFixed(2) + "Md";
    } else if (valeur < 1000000000000000) {
      res = (valeur / 1000000000000).toFixed(2) + "T";
    } else if (valeur < 1000000000000000000) {
      res = (valeur / 1000000000000000).toFixed(2) + "Q";
    } else {
      res = (valeur / 1000000000000000000).toFixed(2) + "Qi";
    }
  
    return res;
  }

}
