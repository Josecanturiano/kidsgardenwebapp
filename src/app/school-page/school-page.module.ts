import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolPagePageRoutingModule } from './school-page-routing.module';

import { SchoolPagePage } from './school-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolPagePageRoutingModule,
  ],
  declarations: [SchoolPagePage]
})
export class SchoolPagePageModule {}
