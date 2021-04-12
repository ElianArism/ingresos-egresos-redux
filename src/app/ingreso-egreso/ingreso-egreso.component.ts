import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from "../shared/ui.actions";

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  loadingSubs: Subscription;
  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean;

  constructor( private _fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService, private _store: Store<AppState> ) { }

  ngOnInit(): void {
    this.ingresoForm = this._fb.group({
      descripcion: ['', Validators.required], 
      monto: ['', Validators.required], 
    })

    this.loadingSubs = this._store.select('ui').subscribe(isLoading => {
      this.loading = isLoading.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    if(this.ingresoForm.invalid) return;

    this._store.dispatch( ui.isLoading() );

    const { descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo); 

    setTimeout(() => {
      this._store.dispatch( ui.stopLoading() );
    }, 1000);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( (ref) => {
      console.log(`exito!`, ref);
      this.ingresoForm.reset();
    })
    .catch(err => {Swal.fire('error', `${err}`, 'error'); this._store.dispatch( ui.stopLoading() );});
  
  }

}
