const fs = require('fs');

const frequencyLegend = ['Commun', 'Rare', 'Très rare'];
const placeLegend = [
  'Sol',
  'Rochers',
  'Navets pourris',
  'Arbres',
  'Plage',
  'Récifs',
  'Air',
  'Lumières',
  'Fleurs',
  'Fleurs blanches',
  'Sous-terre',
  'Boules de neige',
  'Surface de l\'eau',
  'Cocotiers',
  'Souches d\'arbres',
  'Villageois',
  'Près de l\'eau'
];

function convertSprite(insect) {
  insect.sprite = insect.sprite.substring(23, insect.sprite.length);
}

function convertFrequency(insect) {
  const value = insect.frequency.toLowerCase();
  for (let i=0; i<frequencyLegend.length; i++) {
    if (value == frequencyLegend[i].toLowerCase()) { insect.frequency = i; }
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

function convertMonths(insect) {
  const months = [];
  for (let i=0; i<12; i++) { months.push(false); }
  if (insect.months == 'Toute l\'année') {
    for (let i=0; i<12; i++) { months[i] = true; }
  } else {
    let reg = new RegExp('([A-zÀ-ú]+) - ([A-zÀ-ú]+)', 'i');
    res = insect.months.match(reg);
    if (res != null) { applyMonths(months, res[1], res[2]); }
    else {
      reg = new RegExp('([A-zÀ-ú]+) - ([A-zÀ-ú]+), ([A-zÀ-ú]+) - ([A-zÀ-ú]+)', 'i');
      res = insect.months.match(reg);
      if (res != null) {
        applyMonths(months, res[1], res[2]);
        applyMonths(months, res[3], res[4]);
      } else if (insect.months == 'Juin') {
        months[5] = true;
      } else {
        insect.months = 'ERROR';
        return;
      }
    }
  }
  insect.months = months;
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

function convertHours(insect) {
  const hours = [];
  for (let i=0; i<24; i++) { hours.push(false); }
  if (insect.hours == 'Toute la journée') {
    for (let i=0; i<24; i++) { hours[i] = true; }
  } else {
    let reg = new RegExp('(\\d+)h - (\\d+)h', 'i');
    res = insect.hours.match(reg);
    if (res != null) { applyHours(hours, res[1], res[2]); }
    else {
      reg = new RegExp('(\\d+)h - (\\d+)h, (\\d+)h - (\\d+)h', 'i');
      res = insect.hours.match(reg);
      if (res != null) {
        applyHours(hours, res[1], res[2]);
        applyHours(hours, res[3], res[4]);
      }
      else {
        insect.hours = 'ERROR';
        return;
      }
    }
  }
  insect.hours = hours;
}

function convertPlace(insect) {
  insect.rain = false;
  if (insect.place.toLowerCase().endsWith('(pluie)')) { insect.rain = true; }
  let place = -1;
  if (insect.place.toLowerCase().startsWith('sol')) { place = 0; }
  if (insect.place.toLowerCase().startsWith('rochers')) { place = 1; }
  if (insect.place.toLowerCase().startsWith('navets')) { place = 2; }
  if (insect.place.toLowerCase().startsWith('arbres')) { place = 3; }
  if (insect.place.toLowerCase().startsWith('plage')) { place = 4; }
  if (insect.place.toLowerCase().startsWith('plage (rochers)')) { place = 5; }
  if (insect.place.toLowerCase().startsWith('ciel')) { place = 6; }
  if (insect.place.toLowerCase().startsWith('lumières')) { place = 7; }
  if (insect.place.toLowerCase().startsWith('fleurs')) { place = 8; }
  if (insect.place.toLowerCase().startsWith('fleurs blanches')) { place = 9; }
  if (insect.place.toLowerCase().startsWith('sous la terre')) { place = 10; }
  if (insect.place.toLowerCase().startsWith('boules de neige')) { place = 11; }
  if (insect.place.toLowerCase().startsWith('surface de l\'eau')) { place = 12; }
  if (insect.place.toLowerCase().startsWith('palmiers')) { place = 13; }
  if (insect.place.toLowerCase().startsWith('souches d\'arbres')) { place = 14; }
  if (insect.place.toLowerCase().startsWith('villageois')) { place = 15; }
  if (insect.place.toLowerCase().startsWith('près de l\'eau')) { place = 16; }
  insect.place = place;
}

function convertPrice(insect) {
  if (insect.price == '?') { insect.price = -1; }
  else { insect.price = parseInt(insect.price); }
}

const data = fs.readFileSync('./output/insects/insects.raw.json');
const insects = JSON.parse(data);

for (let insect of insects.data) {
  convertSprite(insect);
  convertFrequency(insect);
  convertMonths(insect);
  convertHours(insect);
  convertPlace(insect);
  convertPrice(insect);
}

fs.writeFileSync('./output/insects/insects.json', JSON.stringify(insects, null, 2));
fs.writeFileSync('./output/insects/legends/frequencies.json', JSON.stringify({ data: frequencyLegend }, null, 2));
fs.writeFileSync('./output/insects/legends/places.json', JSON.stringify({ data: placeLegend }, null, 2));