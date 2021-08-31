import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentEvaluationGridComponent} from './student-evaluation-grid/student-evaluation-grid.component';
import {StudentCompleteEvaluationComponent} from './student-complete-evaluation/student-complete-evaluation.component';

const routes: Routes = [
  { path: '', component: StudentEvaluationGridComponent },
  { path: 'completeEvaluation/:id', component: StudentCompleteEvaluationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentEvaluationsRoutingModule { }
