import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StudentsPagePageRoutingModule} from './students-page-routing.module';

import {StudentsPagePage} from './students-page.page';
import {StudentActivitiesGridComponent} from './student-activities/student-activities-grid/student-activities-grid.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPagePageRoutingModule,
    MaterialModule
  ],
  declarations: [
    StudentsPagePage,
    StudentActivitiesGridComponent
  ]
})
export class StudentsPagePageModule {
}
