import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsListComponent } from './students-list/students-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../material.module';
import { StudentsFormComponent } from './students-form/students-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPageRoutingModule,
    MaterialModule
  ],
  declarations: [
    StudentsListComponent,
    StudentsFormComponent
  ]
})
export class StudentsPageModule {}
