import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentGamesComponent} from './student-games/student-games.component';
import {IonicModule} from '@ionic/angular';
import {ActivitiesRoutingModule} from '../../school-page/activities/activities-routing.module';
import {MaterialModule} from '../../material.module';
import {NgxCaptureModule} from 'ngx-capture';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from '../../primeng.module';
import {TextMaskModule} from 'angular2-text-mask';
import {StudentGamesRoutingModule} from './student-games-routing.module';


@NgModule({
  declarations: [
    StudentGamesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    PrimengModule,
    TextMaskModule,
    ReactiveFormsModule,
    StudentGamesRoutingModule
  ]
})
export class StudentGameModule {
}
