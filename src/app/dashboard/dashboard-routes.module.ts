import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { dashboardRouter } from './dashboard.routes';

import { DashboardComponent } from './dashboard.component';


const rutasHijas: Routes = [
  {
    path: '', component: DashboardComponent, children: dashboardRouter, 
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
  ], 
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
