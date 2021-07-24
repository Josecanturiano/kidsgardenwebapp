import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionViewComponent } from './section-view/section-view.component';
import { SectionsListComponent } from './sections-list/sections-list.component';

const routes: Routes = [
  { path: '', component: SectionsListComponent },
  { path: 'view/:id', component: SectionViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
