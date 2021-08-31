import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationsListComponent } from './evaluations-list/evaluations-list.component';
import {EvaluationDetailComponent} from './evaluation-detail/evaluation-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsListComponent
  },
  {
    path: 'add',
    component: EvaluationFormComponent
  },
  {
    path: 'view/:id',
    component: EvaluationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
