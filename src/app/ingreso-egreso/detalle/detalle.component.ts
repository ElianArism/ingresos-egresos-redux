import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppStateWithIngresos } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy{
  listaIngresosEgresos: IngresoEgreso[] = []; 
  private subsList: Subscription;
  constructor(private _store: Store<AppStateWithIngresos>, private _ingEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subsList = this._store.select('ingresosEgresos').subscribe(({items}) => this.listaIngresosEgresos = items);
  }

  ngOnDestroy() {
    this.subsList.unsubscribe();
  }

  borrar(id: string) {
    this._ingEgresoService.borrarIngresoEgreso(id)
    .then(() => Swal.fire('Borrado', `El item fue borrado exitosamente`, 'info'))
    .catch(err => Swal.fire('Error',  `${err.message}`, 'error'))
  }

}
