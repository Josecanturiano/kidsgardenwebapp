import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
	{ path: '', component: StudentsListComponent },
	// { path: 'edit/:id', component: StudentFormComponent },
	{ path: 'add', component: StudentsFormComponent },
	{ path: 'view/:id', component: StudentViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsPageRoutingModule {}
