import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentHomePageRoutingModule } from './student-home-page-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    StudentHomeComponent
  ],
  imports: [
    CommonModule,
    StudentHomePageRoutingModule,
    IonicModule,
    MaterialModule
  ]
})
export class StudentHomePageModule { }
