import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

// import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngresos } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  // Chart 
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];

  public doughnutChartData: MultiDataSet = [[]];

  // public doughnutChartType: ChartType = 'doughnut';

  ingresos: number = 0; 
  egresos: number = 0; 
  totalEgresos: number = 0; 
  totalIngresos: number = 0;

  constructor(private _store: Store<AppStateWithIngresos>) {}

  ngOnInit(): void {
    this._store.select('ingresosEgresos').subscribe(({items}) => {
      this.generarEstadistica(items); 
    })
  }

  generarEstadistica(IngEgresos: IngresoEgreso[]) {
    this.egresos = 0; 
    this.ingresos = 0; 
    this.totalEgresos = 0; 
    this.totalIngresos = 0;
    for (let i = 0; i < IngEgresos.length; i++) {
      if(IngEgresos[i].tipo === 'ingreso') {
        this.totalIngresos += IngEgresos[i].monto;
      } else {
        this.totalEgresos += IngEgresos[i].monto;
      }

      this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]]

    }
  }

}
