import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RainComponent } from './rain.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [RainComponent],
  exports: [RainComponent]
})
export class RainComponentModule {}