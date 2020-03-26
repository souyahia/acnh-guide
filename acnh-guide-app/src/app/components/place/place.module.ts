import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceComponent } from './place.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [PlaceComponent],
  exports: [PlaceComponent]
})
export class PlaceComponentModule {}