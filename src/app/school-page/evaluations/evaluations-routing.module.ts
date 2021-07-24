import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import { EvaluationsListComponent } from './evaluations-list/evaluations-list.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationsListComponent
  },
  {
    path: 'add',
    component: EvaluationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
