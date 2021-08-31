import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {PrimengModule} from './primeng.module';
import {TextMaskModule} from 'angular2-text-mask';
import {NgxCaptureModule} from 'ngx-capture';
import {ReportBySectionComponent} from './shared/components/report-by-section/report-by-section.component';
import {RippleModule} from 'primeng/ripple';
import {TooltipModule} from 'primeng/tooltip';
import {AsignActivityToSectionComponent} from './shared/components/asign-activity-to-section/asign-activity-to-section.component';

@NgModule({
  declarations: [AppComponent, ReportBySectionComponent, AsignActivityToSectionComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    ReactiveFormsModule,
    TextMaskModule,
    FormsModule,
    NgxCaptureModule,
    RippleModule,
    TooltipModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
