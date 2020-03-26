import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsectPageRoutingModule } from './insect-routing.module';

import { InsectPage } from './insect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsectPageRoutingModule
  ],
  declarations: [InsectPage]
})
export class InsectPageModule {}
