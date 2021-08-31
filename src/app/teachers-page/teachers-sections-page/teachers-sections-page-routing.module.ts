import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherSectionComponent} from './teacher-section/teacher-section.component';
import {StudentViewComponent} from '../../school-page/students/student-view/student-view.component';

const routes: Routes = [
  { path: '', component: TeacherSectionComponent },
  { path: 'view/:id', component: StudentViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersSectionsPageRoutingModule { }
