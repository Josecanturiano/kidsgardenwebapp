import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderNumbersComponent } from './activities-components/order-numbers/order-numbers.component';
import { SelectFruitsComponent } from './activities-components/select-fruits/select-fruits.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesListComponent
  },
  {
    path: '1',
    component: OrderNumbersComponent
  },
  {
    path: '2',
    component: SelectFruitsComponent
  },
  {
    path: 'add',
    component: CreateActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
