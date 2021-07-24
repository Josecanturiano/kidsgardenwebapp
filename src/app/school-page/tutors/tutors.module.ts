import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorsRoutingModule } from './tutors-routing.module';
import { TutorsListComponent } from './tutors-list/tutors-list.component';
import { PrimengModule } from 'src/app/primeng.module';
import { MaterialModule } from 'src/app/material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TutorsFormComponent } from './tutors-form/tutors-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { TutorsViewComponent } from './tutors-view/tutors-view.component';


@NgModule({
  declarations: [
    TutorsListComponent,
    TutorsFormComponent,
    ConfirmDialogComponent,
    TutorsViewComponent
  ],
  imports: [
    CommonModule,
    TutorsRoutingModule,
    PrimengModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TutorsModule { }
