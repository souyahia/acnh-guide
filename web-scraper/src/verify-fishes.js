const fs = require('fs');

const freqData = fs.readFileSync('./output/fishes/legends/frequencies.json');
const freq = JSON.parse(freqData);
const placeData = fs.readFileSync('./output/fishes/legends/places.json');
const places = JSON.parse(placeData);
const sizeData = fs.readFileSync('./output/fishes/legends/sizes.json');
const sizes = JSON.parse(sizeData);
const fishData = fs.readFileSync('./output/fishes/fishes.json');
const fishes = JSON.parse(fishData);

function isFalseArray(array) {
  for (let element of array) {
    if (element == true) { return false; }
  }
  return true;
}

if (fishData.includes('ERROR')) { throw new Error('Contains ERROR string ! Check with CTRL+F'); }

for (let fish of fishes.data) {
  if (!Number.isInteger(fish.frequency)
    || fish.frequency < 0
    || fish.frequency >= freq.data.length) {
    throw new Error(`Bad frequency for ${fish.name} !`);
  }
  if (!Array.isArray(fish.months)
    || fish.months.length != 12
    || isFalseArray(fish.months)) {
    throw new Error(`Bad months for ${fish.name} !`);
  }
  if (!Array.isArray(fish.hours)
    || fish.hours.length != 24
    || isFalseArray(fish.hours)) {
    throw new Error(`Bad months for ${fish.name} !`);
  }
  if (!Number.isInteger(fish.place)
    || fish.place < 0
    || fish.place >= places.data.length) {
    throw new Error(`Bad place for ${fish.name} !`);
  }
  if (!Number.isInteger(fish.price)
    || fish.price < -1) {
    throw new Error(`Bad price for ${fish.name} !`);
  }
  if (!Number.isInteger(fish.size)
    || fish.size < 0
    || fish.size >= sizes.data.length) {
    throw new Error(`Bad size for ${fish.name} !`);
  }
  if (!typeof fish.rain === "boolean") {
    throw new Error(`Bad rain for ${fish.name} !`);
  }
}

console.log('Fish data seems fine ! Well done !')