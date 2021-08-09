import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherSectionComponent} from '../teachers-sections-page/teacher-section/teacher-section.component';
import {TeachersProfileComponent} from './teachers-profile/teachers-profile.component';

const routes: Routes = [
  { path: '', component: TeachersProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersProfilePageRoutingModule { }
