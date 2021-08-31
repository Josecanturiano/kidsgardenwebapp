import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationsListComponent } from './evaluations-list/evaluations-list.component';
import { NgxCaptureModule } from 'ngx-capture';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrimengModule } from 'src/app/primeng.module';
import { TextMaskModule } from 'angular2-text-mask';
import {EvaluationDetailComponent} from './evaluation-detail/evaluation-detail.component';


@NgModule({
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    MaterialModule,
    NgxCaptureModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EvaluationsListComponent,
    EvaluationFormComponent,
    EvaluationDetailComponent
  ],
})

export class EvaluationsModule { }
