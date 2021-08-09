import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeachersSectionsPageRoutingModule} from './teachers-sections-page-routing.module';
import {TeacherSectionComponent} from './teacher-section/teacher-section.component';
import {SectionsRoutingModule} from '../../school-page/sections/sections-routing.module';
import {IonicModule} from '@ionic/angular';
import {MaterialModule} from '../../material.module';
import {PrimengModule} from '../../primeng.module';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TeacherSectionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    PrimengModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    TeachersSectionsPageRoutingModule
  ]
})
export class TeachersSectionsPageModule {
}
