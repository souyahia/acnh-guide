import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsectTabPage } from './insectTab.page';

import { AvailabilityComponentModule } from '../components/availability/availability.module';
import { AvailabilityComponent } from '../components/availability/availability.component';
import { FrequencyComponentModule } from '../components/frequency/frequency.module';
import { FrequencyComponent } from '../components/frequency/frequency.component';
import { PlaceComponentModule } from '../components/place/place.module';
import { PlaceComponent } from '../components/place/place.component';
import { RainComponentModule } from '../components/rain/rain.module';
import { RainComponent } from '../components/rain/rain.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvailabilityComponentModule,
    FrequencyComponentModule,
    PlaceComponentModule,
    RainComponentModule,
    RouterModule.forChild([{ path: '', component: InsectTabPage }])
  ],
  declarations: [InsectTabPage],
  entryComponents: [
    AvailabilityComponent,
    FrequencyComponent,
    PlaceComponent,
    RainComponent
  ]
})
export class InsectTabPageModule {}
