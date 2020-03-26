import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FishPageRoutingModule } from './fish-routing.module';

import { FishPage } from './fish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FishPageRoutingModule
  ],
  declarations: [FishPage]
})
export class FishPageModule {}
