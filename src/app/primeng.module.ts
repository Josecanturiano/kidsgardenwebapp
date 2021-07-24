import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  exports: [
    TableModule,
    ChartModule,
    AutoCompleteModule,
    CalendarModule
  ]
})
export class PrimengModule { }
