import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FishTabPage } from './fishTab.page';

import { AvailabilityComponentModule } from '../components/availability/availability.module';
import { AvailabilityComponent } from '../components/availability/availability.component';
import { FrequencyComponentModule } from '../components/frequency/frequency.module';
import { FrequencyComponent } from '../components/frequency/frequency.component';
import { PlaceComponentModule } from '../components/place/place.module';
import { PlaceComponent } from '../components/place/place.component';
import { RainComponentModule } from '../components/rain/rain.module';
import { RainComponent } from '../components/rain/rain.component';
import { SizeComponentModule } from '../components/size/size.module';
import { SizeComponent } from '../components/size/size.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvailabilityComponentModule,
    FrequencyComponentModule,
    PlaceComponentModule,
    RainComponentModule,
    SizeComponentModule,
    RouterModule.forChild([{ path: '', component: FishTabPage }])
  ],
  declarations: [FishTabPage],
  entryComponents: [
    AvailabilityComponent,
    FrequencyComponent,
    PlaceComponent,
    RainComponent,
    SizeComponent
  ]
})
export class FishTabPageModule {}
