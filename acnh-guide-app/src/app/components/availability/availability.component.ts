import { Component, OnInit } from '@angular/core';

import { PopoverController, NavParams } from '@ionic/angular';

import { FishTabPage } from 'src/app/fishTab/fishTab.page';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit {

  private _controller: PopoverController;
  private _tab: FishTabPage;

  private _selectedIndex: number;

  constructor(
    private navParams: NavParams
  ) {
    this._controller = this.navParams.get('controller');
    this._tab = this.navParams.get('tab');
    this.selectedIndex = this.getIndexFromAvailability(this._tab.availability);
   }

  ngOnInit() {}

  public async onClickItem(index: number): Promise<void> {
    if (index === this.selectedIndex) { this._controller.dismiss(); }
    this.selectedIndex = index;
    this._tab.onSelectAvailability(this.getAvailabilityFromIndex(this.selectedIndex));
    await this._controller.dismiss();
  }

  public async onClickClose(): Promise<void> {  await this._controller.dismiss(); }

  private getAvailabilityFromIndex(index: number): Utils.CollectibleArrays.Availability {
    switch(index) {
      case 0: return Utils.CollectibleArrays.Availability.ALL;
      case 1: return Utils.CollectibleArrays.Availability.AVAILABLE;
      case 2: return Utils.CollectibleArrays.Availability.FIRST_MONTH;
      case 3: return Utils.CollectibleArrays.Availability.LAST_MONTH;
      case 4: return Utils.CollectibleArrays.Availability.UNAVAILABLE;
    }
  }

  private getIndexFromAvailability(availability: Utils.CollectibleArrays.Availability): number {
    switch(availability) {
      case Utils.CollectibleArrays.Availability.ALL: return 0;
      case Utils.CollectibleArrays.Availability.AVAILABLE: return 1;
      case Utils.CollectibleArrays.Availability.FIRST_MONTH: return 2;
      case Utils.CollectibleArrays.Availability.LAST_MONTH: return 3;
      case Utils.CollectibleArrays.Availability.UNAVAILABLE: return 4;
    }
  }

  public get selectedIndex(): number { return this._selectedIndex; }
  public set selectedIndex(value: number) { this._selectedIndex = value; }

}
