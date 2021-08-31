import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeachersActivitiesRoutingModule} from './teachers-activities-routing.module';
import {TeachersActivitiesComponent} from './teachers-activities/teachers-activities.component';
import {MaterialModule} from '../../material.module';
import {NgxCaptureModule} from 'ngx-capture';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PrimengModule} from '../../primeng.module';
import {TextMaskModule} from 'angular2-text-mask';
import {ActivitiesListComponent} from '../../school-page/activities/activities-list/activities-list.component';
import {ActivitiesFormComponent} from '../../school-page/activities/activities-form/activities-form.component';
import {OrderNumbersComponent} from '../../school-page/activities/activities-components/order-numbers/order-numbers.component';
import {SelectFruitsComponent} from '../../school-page/activities/activities-components/select-fruits/select-fruits.component';


@NgModule({
  declarations: [
    TeachersActivitiesComponent,
    OrderNumbersComponent,
    SelectFruitsComponent
  ],
  imports: [
    CommonModule,
    TeachersActivitiesRoutingModule,
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
  ]
})
export class TeachersActivitiesModule {
}
