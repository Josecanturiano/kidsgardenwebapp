import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsPagePage } from './students-page.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsPagePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./student-home-page/student-home-page.module').then( m => m.StudentHomePageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./student-profile/student-profile.module').then( m => m.StudentProfileModule),
      },
      {
        path: 'games',
        loadChildren: () => import('./student-game/student-game.module').then( m => m.StudentGameModule),
      },
      {
        path: 'activities',
        loadChildren: () => import('./student-activities/student-activities.module').then( m => m.StudentActivitiesModule),
      },
      {
        path: 'evaluations',
        loadChildren: () => import('./student-evaluations/student-evaluations.module').then( m => m.StudentEvaluationsModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsPagePageRoutingModule {}
