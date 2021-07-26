import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { OrderNumbersComponent } from './activities-components/order-numbers/order-numbers.component';
import { MaterialModule } from '../../material.module';
import { SelectFruitsComponent } from './activities-components/select-fruits/select-fruits.component';
import { NgxCaptureModule } from 'ngx-capture';
import {IonicModule} from '@ionic/angular';
import {PrimengModule} from '../../primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {ActivitiesFormComponent} from './activities-form/activities-form.component';

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MaterialModule,
    NgxCaptureModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ActivitiesListComponent,
    ActivitiesFormComponent,
    OrderNumbersComponent,
    SelectFruitsComponent
  ],
})
export class ActivitiesModule { }
