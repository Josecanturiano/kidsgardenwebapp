import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentGamesComponent} from './student-games/student-games.component';
import {SelectFruitsComponent} from '../../school-page/activities/activities-components/select-fruits/select-fruits.component';
import {OrderNumbersComponent} from '../../school-page/activities/activities-components/order-numbers/order-numbers.component';

const routes: Routes = [
  { path: '', component: StudentGamesComponent },
  { path: '1', component: OrderNumbersComponent },
  { path: '2', component: SelectFruitsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentGamesRoutingModule { }
