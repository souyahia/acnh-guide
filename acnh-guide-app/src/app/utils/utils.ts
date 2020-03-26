import { Fish } from "../models/fish.model";
import { Insect } from '../models/insect.model';

export namespace Utils {

  export type Collectible = Fish | Insect;

  export namespace Collectibles {

    export function isLastMonth(element: Collectible): boolean {
      const currentMonth: number = Time.getCurrentMonth();
      return (element.months[currentMonth] && !element.months[Time.getNextMonth(currentMonth)])
    }

    export function isFirstMonth(element: Collectible): boolean {
      const currentMonth: number = Time.getCurrentMonth();
      return (element.months[currentMonth] && !element.months[Time.getPreviousMonth(currentMonth)])
    }

    export function isCommon(element: Collectible): boolean { return element.frequency == 0; }

    export function isAvailable(element: Collectible): boolean {
      return element.hours[Time.getCurrentHour()] && element.months[Time.getCurrentMonth()];
    }

  }

  export namespace CollectibleArrays {

    export enum Availability { ALL, AVAILABLE, FIRST_MONTH, LAST_MONTH, UNAVAILABLE }

    export function searchByName(array: Collectible[], input: string): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (Strings.isMatching(input, element.name)) { result.push(element); } }
      return result;
    }

    export function filterByAvailability(array: Collectible[], value: Availability): Collectible[] {
      switch (value) {
        case Availability.ALL: return array;
        case Availability.AVAILABLE: return filterByAvailable(array);
        case Availability.FIRST_MONTH: return filterByFirstMonth(array);
        case Availability.LAST_MONTH: return filterByLastMonth(array);
        case Availability.UNAVAILABLE: return filterByUnavailable(array);
      }
    }

    function filterByAvailable(array: Collectible[]): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (Collectibles.isAvailable(element)) { result.push(element); } }
      return result;
    }

    function filterByUnavailable(array: Collectible[]): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (!Collectibles.isAvailable(element)) { result.push(element); } }
      return result;
    }

    function filterByFirstMonth(array: Collectible[]): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (Collectibles.isFirstMonth(element)) { result.push(element); } }
      return result;
    }

    function filterByLastMonth(array: Collectible[]): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (Collectibles.isLastMonth(element)) { result.push(element); } }
      return result;
    }

    export function filterByFrequency(array: Collectible[], frequency: number): Collectible[] {
      if (frequency == -1) { return array; }
      const result: Collectible[] = [];
      for (let element of array) { if (element.frequency === frequency) { result.push(element); } }
      return result;
    }

    export function filterByPlace(array: Collectible[], place: number): Collectible[] {
      if (place == -1) { return array; }
      const result: Collectible[] = [];
      for (let element of array) { if (element.place === place) { result.push(element); } }
      return result;
    }

    export function filterBySize(array: Fish[], size: number): Fish[] {
      if (size == -1) { return array; }
      const result: Fish[] = [];
      for (let element of array) { if (element.size === size) { result.push(element); } }
      return result;
    }

    export function filterByRain(array: Collectible[], rain: boolean): Collectible[] {
      const result: Collectible[] = [];
      for (let element of array) { if (element.rain === rain) { result.push(element); } }
      return result;
    }

  }

  export namespace Time {

    export function getCurrentMonth(): number { return new Date().getMonth(); }

    export function getPreviousMonth(month: number): number { return (month == 0) ? 11 : month - 1; }

    export function getNextMonth(month: number): number { return (month == 11) ? 0 : month + 1; }

    export function getCurrentHour(): number { return new Date().getHours(); }

  }

  export namespace Strings {

    export function normalizeString(str: string): string {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    export function isMatching(input: string, target: string): boolean {
      return normalizeString(target).includes(normalizeString(input));
    }

  }

  export namespace Data {

    export function getElementByName(data: Collectible[], name: string): Collectible {
      for (let element of data) { if (element.name === name) { return element; } }
    }

  }

}