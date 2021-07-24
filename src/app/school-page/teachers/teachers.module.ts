import { PrimengModule } from '../../primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { MaterialModule } from 'src/app/material.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersFormComponent } from './teachers-form/teachers-form.component';
import { TeachersViewComponent } from './teachers-view/teachers-view.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    TeachersListComponent,
    TeachersFormComponent,
    TeachersViewComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    PrimengModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule  
  ],  
})
export class TeachersModule { }
