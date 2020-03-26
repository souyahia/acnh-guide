import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrequencyComponent } from './frequency.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [FrequencyComponent],
  exports: [FrequencyComponent]
})
export class FrequencyComponentModule {}