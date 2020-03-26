import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Insect } from '../models/insect.model';
import { Utils } from '../utils/utils';

import InsectsJson from '../../assets/insects/insects.json';
import FreqLegendJson from '../../assets/insects/legends/frequencies.json';
import PlaceLegendJson from '../../assets/insects/legends/places.json';

@Component({
  selector: 'app-insect',
  templateUrl: './insect.page.html',
  styleUrls: ['./insect.page.scss'],
})
export class InsectPage implements OnInit {

  public HOURS_INDEX: number[] = [];

  private _insect: Insect
  private _subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
    for (let i=0; i<24; i++) { this.HOURS_INDEX.push(i); }
  }

  ngOnInit() {
    this._subscription = this.route.params.subscribe((params: Params) => {
      this.insect = <Insect> Utils.Data.getElementByName(InsectsJson.data, params['name']);
    });
  }

  ngOnDestroy() { if (this._subscription) { this._subscription.unsubscribe(); } }

  public getSpritePath(): string { return `../../assets/insects/img/${this.insect.sprite}`; }

  public getCalendarClass(month: number): string {
    let cssClass: string = '';
    let spacing: boolean = false;
    if (this.insect.months[month]) {
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
    if (this.insect.hours[index]) {
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

  public getFrequency(): string { return FreqLegendJson.data[this.insect.frequency]; }

  public getPlace(): string { return PlaceLegendJson.data[this.insect.place]; }

  public getRain(): string { return this.insect.rain ? 'Pluie / neige' : 'Tous'; }

  public get insect(): Insect { return this._insect; }
  public set insect(value: Insect) { this._insect = value; }

}
