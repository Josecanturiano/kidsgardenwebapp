import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolPagePage } from './school-page.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolPagePage,
    children: [
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule),
      },
      {
        path: 'tutors',
        loadChildren: () => import('./tutors/tutors.module').then( m => m.TutorsModule)
      },
      {
        path: 'sections',
        loadChildren: () => import('./sections/sections.module').then( m => m.SectionsModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then( m => m.TeachersModule)
      },
      {
        path: 'assistants',
        loadChildren: () => import('./assistant/assistants.module').then( m => m.AssistantsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('./activities/activities.module').then( m => m.ActivitiesModule)
      },
      {
        path: 'evaluations',
        loadChildren: () => import('./evaluations/evaluations.module').then( m => m.EvaluationsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolPagePageRoutingModule {}
