import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { IonicModule } from '@ionic/angular';
import { StudentsPageRoutingModule } from '../students/students-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { PrimengModule } from 'src/app/primeng.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionsFormComponent } from './sections-form/sections-form.component';
import { SectionViewComponent } from './section-view/section-view.component';
import { AddStudentToSectionComponent } from './add-student-to-section/add-student-to-section.component';
import {MultiSelectModule} from 'primeng/multiselect';


@NgModule({
  declarations: [
    SectionsListComponent,
    SectionsFormComponent,
    SectionViewComponent,
    AddStudentToSectionComponent
  ],
    imports: [
        CommonModule,
        SectionsRoutingModule,
        IonicModule,
        StudentsPageRoutingModule,
        MaterialModule,
        PrimengModule,
        TextMaskModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule,
    ]
})
export class SectionsModule { }
