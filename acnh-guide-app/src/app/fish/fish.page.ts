import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Fish } from '../models/fish.model';
import { Utils } from '../utils/utils';

import FishesJson from '../../assets/fishes/fishes.json';
import FreqLegendJson from '../../assets/fishes/legends/frequencies.json';
import PlaceLegendJson from '../../assets/fishes/legends/places.json';
import SizeLegendJson from '../../assets/fishes/legends/sizes.json';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.page.html',
  styleUrls: ['./fish.page.scss'],
})
export class FishPage implements OnInit {

  public HOURS_INDEX: number[] = [];

  private _fish: Fish
  private _subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
    for (let i=0; i<24; i++) { this.HOURS_INDEX.push(i); }
  }

  ngOnInit() {
    this._subscription = this.route.params.subscribe((params: Params) => {
      this.fish = <Fish> Utils.Data.getElementByName(FishesJson.data, params['name']);
    });
  }

  ngOnDestroy() { if (this._subscription) { this._subscription.unsubscribe(); } }

  public getSpritePath(): string { return `../../assets/fishes/img/${this.fish.sprite}`; }

  public getCalendarClass(month: number): string {
    let cssClass: string = '';
    let spacing: boolean = false;
    if (this.fish.months[month]) {
      cssClass += 'calendar-available';
      spacing = true;
    }
    if (month === Utils.Time.getCurrentMonth()) {
      if (spacing) { cssClass += ' '; }
      cssClass += 'calendar-today';
    }
    return cssClass;
  }

  public getTopRowClass(index: number): string {
    let cssClass: string = '';
    let spacing: boolean = false;
    if (this.fish.hours[index]) {
      spacing = true;
      cssClass += 'time-available';
    }
    if (index === 23) {
      if (spacing) { cssClass += ' '; }
      cssClass += 'last-col';
    };
    return cssClass;
  }

  public getBottomRowClass(index: number): string {
    if (index === 0 || index === 6 || index === 12 || index === 18) { return 'left-side'; }
    if (index === 23) { return 'right-side'; }
    return '';
  }

  public isTimeBarDisplayed(hour: number): boolean { return Utils.Time.getCurrentHour() === hour; }

  public getFrequency(): string { return FreqLegendJson.data[this.fish.frequency]; }

  public getPlace(): string { return PlaceLegendJson.data[this.fish.place]; }

  public getRain(): string { return this.fish.rain ? 'Pluie / neige' : 'Tous'; }

  public getSize(): string { return SizeLegendJson.data[this.fish.size]; }

  public getFin(): string { return this.fish.fin ? 'Oui' : 'Non'; }

  public get fish(): Fish { return this._fish; }
  public set fish(value: Fish) { this._fish = value; }

}
