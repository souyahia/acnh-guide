import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Insect } from '../models/insect.model';
import { Utils } from '../utils/utils';
import { AvailabilityComponent } from '../components/availability/availability.component';
import { FrequencyComponent } from '../components/frequency/frequency.component';
import { PlaceComponent } from '../components/place/place.component';
import { RainComponent } from '../components/rain/rain.component';

import InsectsJson from '../../assets/insects/insects.json';
import FreqLegendJson from '../../assets/insects/legends/frequencies.json';
import PlaceLegendJson from '../../assets/insects/legends/places.json';


@Component({
  selector: 'app-insectTab',
  templateUrl: 'insectTab.page.html',
  styleUrls: ['insectTab.page.scss']
})
export class InsectTabPage {
  
  private _insects: Insect[] = [];
  private _displayedInsects: Insect[] = [];
  private _frequencies: string[] = [];
  private _places: string[] = [];

  private _userInput: string;
  private _availability: Utils.CollectibleArrays.Availability;
  private _frequency: number;
  private _place: number;
  private _rain: boolean;

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) {
    this.frequencies = FreqLegendJson.data;
    this.places = PlaceLegendJson.data;
    this.resetFilterValues();
    this.applyFilterValues();
    this.displayedInsects = [];
    for (let insect of this.insects) { this.displayedInsects.push(insect); }
  }

  private resetFilterValues(): void {
    this.userInput = '';
    this.availability = Utils.CollectibleArrays.Availability.ALL;
    this.frequency = -1;
    this.place = -1;
    this.rain = false;
  }

  private applyFilterValues(): void {
    this.insects = <Insect[]> Utils.CollectibleArrays.filterByAvailability(
      Utils.CollectibleArrays.filterByFrequency(
        Utils.CollectibleArrays.filterByPlace(
          Utils.CollectibleArrays.filterByRain(
            InsectsJson.data,
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
    this.displayedInsects = <Insect[]> Utils.CollectibleArrays.searchByName(this.insects, searchValue);
  }

  public onClickItem(insect: Insect): void {
    this.router.navigateByUrl(`/insect/${insect.name}`);
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

  public onClickRemoveFilters(): void {
    this.resetFilterValues();
    this.applyFilterValues();
    this.displayedInsects = [];
    for (let insect of this.insects) { this.displayedInsects.push(insect); }
  }

  public getSpritePath(insect: Insect): string { return `../../assets/insects/img/${insect.sprite}`; }

  public getFrequencyString(insect: Insect): string { return this.frequencies[insect.frequency]; }

  public isFirstMonth(insect: Insect): boolean { return Utils.Collectibles.isFirstMonth(insect); }

  public isLastMonth(insect: Insect): boolean { return Utils.Collectibles.isLastMonth(insect); }

  public isCommon(insect: Insect): boolean { return Utils.Collectibles.isCommon(insect); }

  public getAvatarClass(insect: Insect): string {
    if (insect.frequency === 1) { return 'item-avatar rare'; }
    if (insect.frequency === 2) { return 'item-avatar very-rare'; }
    return 'item-avatar common';
  }

  private get insectsData(): Insect[] { return InsectsJson.data; }

  public get insects(): Insect[] { return this._insects; }
  public set insects(value: Insect[]) { this._insects = value; }

  public get displayedInsects(): Insect[] { return this._displayedInsects; }
  public set displayedInsects(value: Insect[]) { this._displayedInsects = value; }

  public get frequencies(): string[] { return this._frequencies; }
  public set frequencies(value: string[]) { this._frequencies = value; }

  public get places(): string[] { return this._places; }
  public set places(value: string[]) { this._places = value; }

  public get userInput(): string { return this._userInput; }
  public set userInput(value: string) { this._userInput = value; }
  public get availability(): Utils.CollectibleArrays.Availability { return this._availability; }
  public set availability(value: Utils.CollectibleArrays.Availability) { this._availability = value; }
  public get frequency(): number { return this._frequency; }
  public set frequency(value: number) { this._frequency = value; }
  public get place(): number { return this._place; }
  public set place(value: number) { this._place = value; }
  public get rain(): boolean { return this._rain; }
  public set rain(value: boolean) { this._rain = value; }

}
