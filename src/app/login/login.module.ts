import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingUpUserComponent } from './sing-up-user/sing-up-user.component';
import { SingUpSchoolComponent } from './sing-up-school/sing-up-school.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    LoginPageComponent,
    SingUpUserComponent,
    SingUpSchoolComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
  ]
})
export class LoginModule { }
