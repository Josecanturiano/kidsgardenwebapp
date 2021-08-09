import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersPagePage } from './teachers-page.page';

const routes: Routes = [
  {
    path: '',
    component: TeachersPagePage,
    children: [
      {
        path: 'activities',
        loadChildren: () => import('./teachers-activities/teachers-activities.module').then( m => m.TeachersActivitiesModule)
      },
      {
        path: 'evaluations',
        loadChildren: () => import('./teachers-evaluations/teachers-evaluations.module').then( m => m.TeachersEvaluationsModule)
      },
      {
        path: 'section',
        loadChildren: () => import('./teachers-sections-page/teachers-sections-page.module').then( m => m.TeachersSectionsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./teachers-profile-page/teachers-profile-page.module').then( m => m.TeachersProfilePageModule)
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersPagePageRoutingModule {}
