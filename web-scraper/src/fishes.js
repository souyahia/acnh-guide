const cheerio = require('cheerio');
const fs = require('fs');

const fishes = { data: [] };

function getFrequencyValue(freqElement) {
  const value = freqElement.text();
  if (value == '') { return 'Commun'; }
  return value;
}

function insertData(data) {
  for (let fish of fishes.data) { if (fish.name == data.name) { return; } }
  fishes.data.push(data);
}

fs.readFile("./assets/french-fish.html", "utf8", (err, data) => {
  if (err) { throw err; }
  const $ = cheerio.load(data);
  $('.mosaique.select-village.checkno-village').each((i, element) => {
    let fish = {};
    fish.name = $(element).children('.name').children('.name2').text();
    fish.sprite = $(element).children('.fond.fond_switch').children('img').attr('src');
    fish.frequency = getFrequencyValue($(element).children('.rare'))
    $(element).children('.infosline').each((i, infoElement) => {
      let value = $(infoElement).text();
      if (value.startsWith('Période : ')) { fish.months = value.substring(11, value.length); }
      else if (value.startsWith('Heure : ')) { fish.hours = value.substring(8, value.length); }
      else if (value.startsWith('Lieu : ')) { fish.place = value.substring(7, value.length); }
      else if (value.startsWith('Prix : ')) { fish.price = value.substring(7, value.length - 11); }
      else if (value.startsWith('Taille : ')) { fish.size = value.substring(9, value.length); }
    });
    insertData(fish);
  });
  fs.writeFileSync('./output/fishes/fishes.raw.json', JSON.stringify(fishes, null, 2));
});