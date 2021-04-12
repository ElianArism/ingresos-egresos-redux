import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  ingresoEgresoSubs: Subscription;
  constructor(
    private _store: Store<AppState>, 
    private _ingEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this._store.select('user')
      .pipe(
        filter(({user}) => user !== null)
      )
      .subscribe(({user}) => {
        this.ingresoEgresoSubs = this._ingEgresoService.initIngresosEgresosListener(user.uid)
        .subscribe((ingresosEgresosFirebase: IngresoEgreso[]) => {
          console.log(ingresosEgresosFirebase);
          this._store.dispatch( ingresoEgresoActions.setItems({items: ingresosEgresosFirebase}) ); 
        });
      });
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
    this.ingresoEgresoSubs?.unsubscribe();
  }
}
