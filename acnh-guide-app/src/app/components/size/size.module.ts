import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SizeComponent } from './size.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [SizeComponent],
  exports: [SizeComponent]
})
export class SizeComponentModule {}