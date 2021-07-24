import { PrimengModule } from '../../primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';


@NgModule({
  declarations: [
    DashboardChartsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimengModule
  ]
})
export class DashboardModule { }
