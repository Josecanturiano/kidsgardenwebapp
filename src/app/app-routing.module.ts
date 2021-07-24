import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'school',
    loadChildren: () => import('./school-page/school-page.module').then( m => m.SchoolPagePageModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./students-page/students-page.module').then( m => m.StudentsPagePageModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers-page/teachers-page.module').then( m => m.TeachersPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule )
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
