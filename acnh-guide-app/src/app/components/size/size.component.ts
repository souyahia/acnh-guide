import { Component, OnInit } from '@angular/core';

import { PopoverController, NavParams } from '@ionic/angular';

import { FishTabPage } from 'src/app/fishTab/fishTab.page';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit {

  private _controller: PopoverController;
  private _tab: FishTabPage;

  private _selectedIndex: number;

  constructor(
    private navParams: NavParams
  ) {
    this._controller = this.navParams.get('controller');
    this._tab = this.navParams.get('tab');
    this.selectedIndex = this._tab.size;
   }

  ngOnInit() {}

  public async onClickItem(index: number): Promise<void> {
    this.selectedIndex = index;
    this._tab.onSelectSize(this.selectedIndex);
    await this._controller.dismiss();
  }

  public async onClickClose(): Promise<void> {  await this._controller.dismiss(); }

  public get selectedIndex(): number { return this._selectedIndex; }
  public set selectedIndex(value: number) { this._selectedIndex = value; }

  public get sizes(): string[] { return this._tab.sizes; }

}
