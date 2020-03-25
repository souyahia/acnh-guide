const fs = require('fs');

const frequencyLegend = ['Commun', 'Rare', 'Très rare'];
const placeLegend = ['Océan', 'Ponton', 'Embouchure', 'Rivière', 'Étang', 'Cascade'];
const sizeLegend = ['Minuscule', 'Petite', 'Petite / Moyenne', 'Moyenne', 'Moyenne / Grande', 'Grande', 'Très Grande', 'Fine', 'Énorme'];

function convertSprite(fish) {
  fish.sprite = fish.sprite.substring(20, fish.sprite.length);
}

function convertFrequency(fish) {
  const value = fish.frequency.toLowerCase();
  for (let i=0; i<frequencyLegend.length; i++) {
    if (value == frequencyLegend[i].toLowerCase()) { fish.frequency = i; }
  }
}

function getMonthIndex(str) {
  const value = str.toLowerCase();
  if (value == 'janvier') { return 0; }
  else if (value == 'février') { return 1; }
  else if (value == 'mars') { return 2; }
  else if (value == 'avril') { return 3; }
  else if (value == 'mai') { return 4; }
  else if (value == 'juin') { return 5; }
  else if (value == 'juillet') { return 6; }
  else if (value == 'août') { return 7; }
  else if (value == 'septembre') { return 8; }
  else if (value == 'octobre') { return 9; }
  else if (value == 'novembre') { return 10; }
  else if (value == 'décembre') { return 11; }
  return -1;
}

function applyMonths(months, res1, res2) {
  const month1 = getMonthIndex(res1);
  const month2 = getMonthIndex(res2);
  if (month1 < month2) {
    for (let i=month1; i<month2+1; i++) { months[i] = true; }
  } else {
    for (let i=0; i<month2+1; i++) { months[i] = true; }
    for (let i=month1; i<12; i++) { months[i] = true; }
  }
}

function convertMonths(fish) {
  const months = [];
  for (let i=0; i<12; i++) { months.push(false); }
  if (fish.months == 'Toute l\'année') {
    for (let i=0; i<12; i++) { months[i] = true; }
  } else {
    let reg = new RegExp('([A-zÀ-ú]+) - ([A-zÀ-ú]+)', 'i');
    res = fish.months.match(reg);
    if (res != null) { applyMonths(months, res[1], res[2]); }
    else {
      reg = new RegExp('([A-zÀ-ú]+) - ([A-zÀ-ú]+), ([A-zÀ-ú]+) - ([A-zÀ-ú]+)', 'i');
      res = fish.months.match(reg);
      if (res != null) {
        applyMonths(months, res[1], res[2]);
        applyMonths(months, res[3], res[4]);
      } else if (fish.months == 'Septembre') {
        months[8] = true;
      } else {
        fish.months = 'ERROR';
        return;
      }
    }
  }
  fish.months = months;
}

function applyHours(hours, res1, res2) {
  const hour1 = parseInt(res1);
  const hour2 = parseInt(res2);

  if (hour1 < hour2) {
    for (let i=hour1; i<hour2+1; i++) { hours[i] = true; }
  } else {
    for (let i=0; i<hour2+1; i++) { hours[i] = true; }
    for (let i=hour1; i<24; i++) { hours[i] = true; }
  }
}

function convertHours(fish) {
  const hours = [];
  for (let i=0; i<24; i++) { hours.push(false); }
  if (fish.hours == 'Toute la journée') {
    for (let i=0; i<24; i++) { hours[i] = true; }
  } else {
    let reg = new RegExp('(\\d+)h - (\\d+)h', 'i');
    res = fish.hours.match(reg);
    if (res != null) { applyHours(hours, res[1], res[2]); }
    else {
      reg = new RegExp('(\\d+)h - (\\d+)h, (\\d+)h - (\\d+)h', 'i');
      res = fish.hours.match(reg);
      if (res != null) {
        applyHours(hours, res[1], res[2]);
        applyHours(hours, res[3], res[4]);
      }
      else {
        fish.hours = 'ERROR';
        return;
      }
    }
  }
  fish.hours = hours;
}

function convertPlace(fish) {
  fish.rain = false;
  if (fish.place.toLowerCase().endsWith('(pluie/neige)')) { fish.rain = true; }
  let place = -1;
  if (fish.place.toLowerCase().startsWith('océan')) { place = 0; }
  if (fish.place.toLowerCase().endsWith('(ponton)')) { place = 1; }
  if (fish.place.toLowerCase().startsWith('embouchure')) { place = 2; }
  if (fish.place.toLowerCase().startsWith('rivière')) { place = 3; }
  if (fish.place.toLowerCase().startsWith('étang')) { place = 4; }
  if (fish.place.toLowerCase().endsWith('(falaise)')) { place = 5; }
  fish.place = place;
}

function convertPrice(fish) {
  if (fish.price == '?') { fish.price = -1; }
  else { fish.price = parseInt(fish.price); }
}

function convertSize(fish) {
  fish.fin = false;
  if (fish.size == 'Petite/moyenne') { fish.size = 2; }
  else if (fish.size == 'Moyenne/grande') { fish.size = 4; }
  else if (fish.size == 'Énorme (aileron)') {
    fish.size = sizeLegend.length - 1;
    fish.fin = true;
  }
  else {
    for (let i=0; i<sizeLegend.length; i++) {
      if (fish.size.toLowerCase() == sizeLegend[i].toLowerCase()) {
        fish.size = i;
        return;
      }
    }
  }
}

const data = fs.readFileSync('./output/fishes/fishes.raw.json');
const fishes = JSON.parse(data);

for (let fish of fishes.data) {
  convertSprite(fish);
  convertFrequency(fish);
  convertMonths(fish);
  convertHours(fish);
  convertPlace(fish);
  convertPrice(fish);
  convertSize(fish);
}

fs.writeFileSync('./output/fishes/fishes.json', JSON.stringify(fishes, null, 2));
fs.writeFileSync('./output/fishes/legends/frequencies.json', JSON.stringify({ data: frequencyLegend }, null, 2));
fs.writeFileSync('./output/fishes/legends/places.json', JSON.stringify({ data: placeLegend }, null, 2));
fs.writeFileSync('./output/fishes/legends/sizes.json', JSON.stringify({ data: sizeLegend }, null, 2));