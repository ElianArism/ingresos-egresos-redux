import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { ChartsModule } from 'ng2-charts';

// NGRX 
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IngresoEgresoPipe } from '../pipes/ingreso-egreso.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    IngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    SharedModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer), //cargar perezosamente este apartado del store
    
    DashboardRoutesModule,
    ChartsModule
  ]
})
export class IngresoEgresoModule { }
