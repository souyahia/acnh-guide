import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Fish } from '../models/fish.model';
import { Utils } from '../utils/utils';
import { AvailabilityComponent } from '../components/availability/availability.component';
import { FrequencyComponent } from '../components/frequency/frequency.component';
import { PlaceComponent } from '../components/place/place.component';
import { RainComponent } from '../components/rain/rain.component';
import { SizeComponent } from '../components/size/size.component';

import FishesJson from '../../assets/fishes/fishes.json';
import FreqLegendJson from '../../assets/fishes/legends/frequencies.json';
import PlaceLegendJson from '../../assets/fishes/legends/places.json';
import SizeLegendJson from '../../assets/fishes/legends/sizes.json';

@Component({
  selector: 'app-fishTab',
  templateUrl: 'fishTab.page.html',
  styleUrls: ['fishTab.page.scss']
})
export class FishTabPage {

  private _fishes: Fish[] = [];
  private _displayedFishes: Fish[] = [];
  private _frequencies: string[] = [];
  private _places: string[] = [];
  private _sizes: string[] = [];

  private _userInput: string;
  private _availability: Utils.CollectibleArrays.Availability;
  private _frequency: number;
  private _place: number;
  private _size: number;
  private _rain: boolean;

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) {
    this.frequencies = FreqLegendJson.data;
    this.places = PlaceLegendJson.data;
    this.sizes = SizeLegendJson.data;
    this.resetFilterValues();
    this.applyFilterValues();
    this.displayedFishes = [];
    for (let fish of this.fishes) { this.displayedFishes.push(fish); }
  }

  private resetFilterValues(): void {
    this.userInput = '';
    this.availability = Utils.CollectibleArrays.Availability.ALL;
    this.frequency = -1;
    this.place = -1;
    this.size = -1;
    this.rain = false;
  }

  private applyFilterValues(): void {
    this.fishes = <Fish[]> Utils.CollectibleArrays.filterByAvailability(
      Utils.CollectibleArrays.filterByFrequency(
        Utils.CollectibleArrays.filterByPlace(
          Utils.CollectibleArrays.filterByRain(
            Utils.CollectibleArrays.filterBySize(
              FishesJson.data,
              this.size
            ),
            this.rain
          ),
          this.place
        ),
        this.frequency
      ),
      this.availability
    )
  }

  private applySearch(input?: string): void {
    const searchValue: string = input ? input : this.userInput;
    this.displayedFishes = <Fish[]> Utils.CollectibleArrays.searchByName(this.fishes, searchValue);
  }

  public onClickItem(fish: Fish): void {
    this.router.navigateByUrl(`/fish/${fish.name}`);
  }

  public onClickMore(): void {
    this.router.navigateByUrl('/more');
  }

  public onUserInput(event: any): void { this.applySearch(event.target.value); }

  public async onClickAvailability(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: AvailabilityComponent,
      componentProps: {
        controller: this.popoverController,
        tab: this
      },
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  public onSelectAvailability(availability: Utils.CollectibleArrays.Availability) {
    this.availability = availability;
    this.applyFilterValues();
    this.applySearch();
  }

  public async onClickFrequency(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: FrequencyComponent,
      componentProps: {
        controller: this.popoverController,
        tab: this
      },
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  public onSelectFrequency(frequency: number) {
    this.frequency = frequency;
    this.applyFilterValues();
    this.applySearch();
  }

  public async onClickPlace(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: PlaceComponent,
      componentProps: {
        controller: this.popoverController,
        tab: this
      },
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  public onSelectPlace(place: number) {
    this.place = place;
    this.applyFilterValues();
    this.applySearch();
  }

  public async onClickRain(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: RainComponent,
      componentProps: {
        controller: this.popoverController,
        tab: this
      },
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  public onSelectRain(rain: boolean) {
    this.rain = rain;
    this.applyFilterValues();
    this.applySearch();
  }

  public async onClickSize(event: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: SizeComponent,
      componentProps: {
        controller: this.popoverController,
        tab: this
      },
      event: event,
      translucent: true
    });
    return await popover.present();
  }

  public onSelectSize(size: number) {
    this.size = size;
    this.applyFilterValues();
    this.applySearch();
  }

  public onClickRemoveFilters(): void {
    this.resetFilterValues();
    this.applyFilterValues();
    this.displayedFishes = [];
    for (let fish of this.fishes) { this.displayedFishes.push(fish); }
  }

  public getSpritePath(fish: Fish): string { return `../../assets/fishes/img/${fish.sprite}`; }

  public getFrequencyString(fish: Fish): string { return this.frequencies[fish.frequency]; }

  public isFirstMonth(fish: Fish): boolean { return Utils.Collectibles.isFirstMonth(fish); }

  public isLastMonth(fish: Fish): boolean { return Utils.Collectibles.isLastMonth(fish); }

  public isCommon(fish: Fish): boolean { return Utils.Collectibles.isCommon(fish); }

  public getAvatarClass(fish: Fish): string {
    if (fish.frequency === 1) { return 'item-avatar rare'; }
    if (fish.frequency === 2) { return 'item-avatar very-rare'; }
    return 'item-avatar common';
  }

  private get fishesData(): Fish[] { return FishesJson.data; }

  public get fishes(): Fish[] { return this._fishes; }
  public set fishes(value: Fish[]) { this._fishes = value; }

  public get displayedFishes(): Fish[] { return this._displayedFishes; }
  public set displayedFishes(value: Fish[]) { this._displayedFishes = value; }

  public get frequencies(): string[] { return this._frequencies; }
  public set frequencies(value: string[]) { this._frequencies = value; }

  public get places(): string[] { return this._places; }
  public set places(value: string[]) { this._places = value; }

  public get sizes(): string[] { return this._sizes; }
  public set sizes(value: string[]) { this._sizes = value; }

  public get userInput(): string { return this._userInput; }
  public set userInput(value: string) { this._userInput = value; }
  public get availability(): Utils.CollectibleArrays.Availability { return this._availability; }
  public set availability(value: Utils.CollectibleArrays.Availability) { this._availability = value; }
  public get frequency(): number { return this._frequency; }
  public set frequency(value: number) { this._frequency = value; }
  public get place(): number { return this._place; }
  public set place(value: number) { this._place = value; }
  public get size(): number { return this._size; }
  public set size(value: number) { this._size = value; }
  public get rain(): boolean { return this._rain; }
  public set rain(value: boolean) { this._rain = value; }

}
