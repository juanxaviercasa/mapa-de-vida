(function () {
  'use strict';
  window.YourLifeAPI = {
    getJson: getJson,
    getPopulation: getPopulation,
    getWeather: getWeather,
    getImage: getImage,
    getHistory: getHistory
  };

  function getJson(url) {
    return fetch(url, { headers: { Accept: 'application/json' } }).then(function (response) { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); });
  }
  function getPopulation(code) {
    var indicators = ['SP.POP.TOTL', 'SP.DYN.CBRT.IN', 'SP.DYN.CDRT.IN', 'SP.POP.TOTL.MA.IN', 'SP.POP.TOTL.FE.IN', 'SM.POP.NETM'];
    return Promise.all(indicators.map(function (indicator) { return getJson('https://api.worldbank.org/v2/country/' + encodeURIComponent(code) + '/indicator/' + indicator + '?format=json&per_page=5'); })).then(function (responses) {
      var values = responses.map(function (response) { return (response[1] || []).find(function (entry) { return entry.value !== null; }); });
      return { population: values[0] && values[0].value, birthRate: values[1] && values[1].value, deathRate: values[2] && values[2].value, male: values[3] && values[3].value, female: values[4] && values[4].value, migration: values[5] && values[5].value, year: values[0] && values[0].date, source: 'World Bank DataBank' };
    });
  }
  function getWeather(latitude, longitude) {
    return getJson('https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude) + '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto').then(function (result) { return { temperature: result.current.temperature_2m, humidity: result.current.relative_humidity_2m, wind: result.current.wind_speed_10m, code: result.current.weather_code, timezone: result.timezone, source: 'Open-Meteo' }; });
  }
  function getImage(query) {
    var url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=' + encodeURIComponent(query) + '&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*';
    return getJson(url).then(function (result) { var pages = result.query && result.query.pages, page = pages && pages[Object.keys(pages)[0]], info = page && page.imageinfo && page.imageinfo[0]; if (!info) throw new Error('No image'); return { url: info.thumburl || info.url, title: page.title, author: info.extmetadata && info.extmetadata.Artist && info.extmetadata.Artist.value, source: 'Wikimedia Commons' }; });
  }
  function getHistory(month, day) { return getJson('https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/' + String(month).padStart(2, '0') + '/' + String(day).padStart(2, '0')).then(function (result) { return { events: (result.events || []).slice(0, 5), births: (result.births || []).slice(0, 5), deaths: (result.deaths || []).slice(0, 5), source: 'Wikipedia On this day' }; }); }
})();
