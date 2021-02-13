import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivitiesPageRoutingModule } from './activities.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ActivitiesPageRoutingModule
  ],
  declarations: []
})
export class ActivitiesPageModule { }
