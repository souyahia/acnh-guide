const fs = require('fs');

const freqData = fs.readFileSync('./output/insects/legends/frequencies.json');
const freq = JSON.parse(freqData);
const placeData = fs.readFileSync('./output/insects/legends/places.json');
const places = JSON.parse(placeData);
const insectData = fs.readFileSync('./output/insects/insects.json');
const insects = JSON.parse(insectData);

function isFalseArray(array) {
  for (let element of array) {
    if (element == true) { return false; }
  }
  return true;
}

if (insectData.includes('ERROR')) { throw new Error('Contains ERROR string ! Check with CTRL+F'); }

for (let insect of insects.data) {
  if (!Number.isInteger(insect.frequency)
    || insect.frequency < 0
    || insect.frequency >= freq.data.length) {
    throw new Error(`Bad frequency for ${insect.name} !`);
  }
  if (!Array.isArray(insect.months)
    || insect.months.length != 12
    || isFalseArray(insect.months)) {
    throw new Error(`Bad months for ${insect.name} !`);
  }
  if (!Array.isArray(insect.hours)
    || insect.hours.length != 24
    || isFalseArray(insect.hours)) {
    throw new Error(`Bad months for ${insect.name} !`);
  }
  if (!Number.isInteger(insect.place)
    || insect.place < 0
    || insect.place >= places.data.length) {
    throw new Error(`Bad place for ${insect.name} !`);
  }
  if (!Number.isInteger(insect.price)
    || insect.price < -1) {
    throw new Error(`Bad price for ${insect.name} !`);
  }
  if (!typeof insect.rain === "boolean") {
    throw new Error(`Bad rain for ${insect.name} !`);
  }
}

console.log('Insect data seems fine ! Well done !')