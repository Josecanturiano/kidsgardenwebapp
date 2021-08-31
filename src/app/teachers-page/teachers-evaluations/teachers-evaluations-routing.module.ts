import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeachersEvaluationComponent} from './teachers-evaluation/teachers-evaluation.component';
import {EvaluationsListComponent} from '../../school-page/evaluations/evaluations-list/evaluations-list.component';
import {EvaluationFormComponent} from '../../school-page/evaluations/evaluation-form/evaluation-form.component';
import {EvaluationDetailComponent} from '../../school-page/evaluations/evaluation-detail/evaluation-detail.component';

const routes: Routes = [
  {path: '', component: EvaluationsListComponent},
  {path: 'add', component: EvaluationFormComponent},
  {path: 'view/:id', component: EvaluationDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersEvaluationsRoutingModule {
}
