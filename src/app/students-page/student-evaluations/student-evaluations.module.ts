import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentEvaluationsRoutingModule} from './student-evaluations-routing.module';
import {Routes} from '@angular/router';
import {StudentEvaluationGridComponent} from './student-evaluation-grid/student-evaluation-grid.component';
import {IonicModule} from '@ionic/angular';
import {StudentCompleteEvaluationComponent} from './student-complete-evaluation/student-complete-evaluation.component';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [
    StudentEvaluationGridComponent,
    StudentCompleteEvaluationComponent
  ],
  imports: [
    CommonModule,
    StudentEvaluationsRoutingModule,
    IonicModule,
    MaterialModule
  ]
})
export class StudentEvaluationsModule { }
