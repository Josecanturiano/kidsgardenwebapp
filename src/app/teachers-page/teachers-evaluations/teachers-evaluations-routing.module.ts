import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeachersEvaluationComponent} from './teachers-evaluation/teachers-evaluation.component';

const routes: Routes = [
  {path: '', component: TeachersEvaluationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersEvaluationsRoutingModule {
}
