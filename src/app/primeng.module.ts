import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  exports: [
    TableModule,
    ChartModule,
    AutoCompleteModule,
    CalendarModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule
  ]
})
export class PrimengModule { }
