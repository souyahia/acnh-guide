import { Component, OnInit } from '@angular/core';

import { PopoverController, NavParams } from '@ionic/angular';

import { FishTabPage } from 'src/app/fishTab/fishTab.page';

@Component({
  selector: 'app-rain',
  templateUrl: './rain.component.html',
  styleUrls: ['./rain.component.scss'],
})
export class RainComponent implements OnInit {

  private _controller: PopoverController;
  private _tab: FishTabPage;

  private _selectedIndex: number;

  constructor(
    private navParams: NavParams
  ) {
    this._controller = this.navParams.get('controller');
    this._tab = this.navParams.get('tab');
    this.selectedIndex = this._tab.rain ? 1 : 0;
   }

  ngOnInit() {}

  public async onClickItem(index: number): Promise<void> {
    if (index === this.selectedIndex) { this._controller.dismiss(); }
    this.selectedIndex = index;
    const rain: boolean = this.selectedIndex === 0 ? false : true;
    this._tab.onSelectRain(rain);
    await this._controller.dismiss();
  }

  public async onClickClose(): Promise<void> {  await this._controller.dismiss(); }

  public get selectedIndex(): number { return this._selectedIndex; }
  public set selectedIndex(value: number) { this._selectedIndex = value; }

}
