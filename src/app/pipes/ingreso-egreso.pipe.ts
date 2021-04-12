import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    //con slice creas una copia del array para no mutar datos y con sort los ordenas 
    return items.slice().sort((a, b) => {
      if(a.tipo === 'Ingreso') return -1; // coloca item al final del array
      else return 1; // coloca item al principio del array
    });
  }

}
