import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPagePageRoutingModule } from './students-page-routing.module';

import { StudentsPagePage } from './students-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsPagePageRoutingModule
  ],
  declarations: [StudentsPagePage]
})
export class StudentsPagePageModule {}
