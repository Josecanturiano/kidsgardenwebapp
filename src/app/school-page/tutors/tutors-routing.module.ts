import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorsFormComponent } from './tutors-form/tutors-form.component';
import { TutorsListComponent } from './tutors-list/tutors-list.component';
import { TutorsViewComponent } from './tutors-view/tutors-view.component';

const routes: Routes = [
  { path: '', component: TutorsListComponent },
  { path: 'add', component: TutorsFormComponent },
  { path: 'view/:id', component: TutorsViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorsRoutingModule { }
