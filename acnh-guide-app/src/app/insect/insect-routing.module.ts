import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsectPage } from './insect.page';

const routes: Routes = [
  {
    path: '',
    component: InsectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsectPageRoutingModule {}
