import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentActivitiesGridComponent} from './student-activities-grid/student-activities-grid.component';

const routes: Routes = [
  { path: '', component: StudentActivitiesGridComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentActivitiesRoutingModule { }
