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

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MaterialModule,
    NgxCaptureModule,
    IonicModule,
    PrimengModule
  ],
  declarations: [
    ActivitiesListComponent,
    OrderNumbersComponent,
    SelectFruitsComponent
  ],
})
export class ActivitiesModule { }
