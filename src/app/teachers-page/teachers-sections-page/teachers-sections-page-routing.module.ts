import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherSectionComponent} from './teacher-section/teacher-section.component';

const routes: Routes = [
  { path: '', component: TeacherSectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersSectionsPageRoutingModule { }
