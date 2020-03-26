import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailabilityComponent } from './availability.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [AvailabilityComponent],
  exports: [AvailabilityComponent]
})
export class AvailabilityComponentModule {}