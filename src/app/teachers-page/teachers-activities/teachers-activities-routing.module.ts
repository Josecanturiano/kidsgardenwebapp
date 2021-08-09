import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeachersActivitiesComponent} from './teachers-activities/teachers-activities.component';

const routes: Routes = [
  {path: '', component: TeachersActivitiesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersActivitiesRoutingModule {
}
