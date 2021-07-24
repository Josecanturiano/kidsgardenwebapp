import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeachersPagePageRoutingModule } from './teachers-page-routing.module';

import { TeachersPagePage } from './teachers-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeachersPagePageRoutingModule
  ],
  declarations: [TeachersPagePage]
})
export class TeachersPagePageModule {}
