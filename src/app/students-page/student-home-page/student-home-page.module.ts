import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentHomePageRoutingModule } from './student-home-page-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';


@NgModule({
  declarations: [
    StudentHomeComponent
  ],
  imports: [
    CommonModule,
    StudentHomePageRoutingModule
  ]
})
export class StudentHomePageModule { }
