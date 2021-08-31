import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeachersActivitiesComponent} from './teachers-activities/teachers-activities.component';
import {ActivitiesListComponent} from '../../school-page/activities/activities-list/activities-list.component';
import {ActivityDetailComponent} from '../../school-page/activities/activity-detail/activity-detail.component';
import {ActivitiesFormComponent} from '../../school-page/activities/activities-form/activities-form.component';

const routes: Routes = [
  {path: '', component: ActivitiesListComponent},
  {path: 'view/:id', component: ActivityDetailComponent},
  {path: '', component: ActivitiesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersActivitiesRoutingModule {
}
