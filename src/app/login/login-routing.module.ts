import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SingUpSchoolComponent } from './sing-up-school/sing-up-school.component';
import { SingUpUserComponent } from './sing-up-user/sing-up-user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'sign-up-school',
    component: SingUpSchoolComponent
  },
  {
    path: 'sign-up-user',
    component: SingUpUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
