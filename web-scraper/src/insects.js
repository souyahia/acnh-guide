const cheerio = require('cheerio');
const fs = require('fs');

const insects = { data: [] };

function getFrequencyValue(freqElement) {
  const value = freqElement.text();
  if (value == '') { return 'Commun'; }
  return value;
}

function insertData(data) {
  for (let insect of insects.data) { if (insect.name == data.name) { return; } }
  insects.data.push(data);
}

fs.readFile("./assets/french-insect.html", "utf8", (err, data) => {
  if (err) { throw err; }
  const $ = cheerio.load(data);
  $('.mosaique.select-village.checkno-village').each((i, element) => {
    let insect = {};
    insect.name = $(element).children('.name').children('.name2').text();
    insect.sprite = $(element).children('.fond.fond_switch').children('img').attr('src');
    insect.frequency = getFrequencyValue($(element).children('.rare'))
    $(element).children('.infosline').each((i, infoElement) => {
      let value = $(infoElement).text();
      if (value.startsWith('Période : ')) { insect.months = value.substring(11, value.length); }
      else if (value.startsWith('Heure : ')) { insect.hours = value.substring(8, value.length); }
      else if (value.startsWith('Lieu : ')) { insect.place = value.substring(7, value.length); }
      else if (value.startsWith('Prix : ')) { insect.price = value.substring(7, value.length - 11); }
    });
    insertData(insect);
  });
  fs.writeFileSync('./output/insects/insects.raw.json', JSON.stringify(insects, null, 2));
});