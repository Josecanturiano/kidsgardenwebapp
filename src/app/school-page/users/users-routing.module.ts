import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersFormComponent } from './teachers-form/teachers-form.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { TeachersViewComponent } from './teachers-view/teachers-view.component';

const routes: Routes = [
  { path: '', component: TeachersListComponent },
  { path: 'add', component: TeachersFormComponent },
  { path: 'view/:id', component: TeachersViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
