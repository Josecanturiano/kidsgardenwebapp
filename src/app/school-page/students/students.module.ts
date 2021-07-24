import { PrimengModule } from '../../primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsListComponent } from './students-list/students-list.component';
import { MaterialModule } from '../../material.module';
import { StudentsFormComponent } from './students-form/students-form.component';
import { TextMaskModule } from 'angular2-text-mask';
import { StudentViewComponent } from './student-view/student-view.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPageRoutingModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StudentsListComponent,
    StudentsFormComponent,
    StudentViewComponent,
    ConfirmDialogComponent
  ]
})
export class StudentsPageModule {}
