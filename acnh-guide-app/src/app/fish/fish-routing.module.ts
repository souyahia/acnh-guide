import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FishPage } from './fish.page';

const routes: Routes = [
  {
    path: '',
    component: FishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FishPageRoutingModule {}
