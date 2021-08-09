import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileRoutingModule } from './student-profile-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    StudentProfileComponent
  ],
  imports: [
    CommonModule,
    StudentProfileRoutingModule,
    IonicModule,
    MaterialModule
  ]
})
export class StudentProfileModule { }
