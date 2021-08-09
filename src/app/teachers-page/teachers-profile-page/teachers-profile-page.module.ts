import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersProfilePageRoutingModule } from './teachers-profile-page-routing.module';
import {TeachersProfileComponent} from './teachers-profile/teachers-profile.component';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';
import {PrimengModule} from '../../primeng.module';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TeachersProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersProfilePageRoutingModule
  ]
})
export class TeachersProfilePageModule { }
