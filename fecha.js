(function () {
  'use strict';

  var storageKey = 'your-life-data';
  var month = document.getElementById('month'), day = document.getElementById('day'), year = document.getElementById('year');
  var data = loadData();
  var monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var zodiac = [
    { name: 'Capricornio', from: [1, 1], to: [1, 19] }, { name: 'Acuario', from: [1, 20], to: [2, 18] }, { name: 'Piscis', from: [2, 19], to: [3, 20] }, { name: 'Aries', from: [3, 21], to: [4, 19] },
    { name: 'Tauro', from: [4, 20], to: [5, 20] }, { name: 'Géminis', from: [5, 21], to: [6, 20] }, { name: 'Cáncer', from: [6, 21], to: [7, 22] }, { name: 'Leo', from: [7, 23], to: [8, 22] },
    { name: 'Virgo', from: [8, 23], to: [9, 22] }, { name: 'Libra', from: [9, 23], to: [10, 22] }, { name: 'Escorpio', from: [10, 23], to: [11, 21] }, { name: 'Sagitario', from: [11, 22], to: [12, 21] }, { name: 'Capricornio', from: [12, 22], to: [12, 31] }
  ];
  var chineseAnimals = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
  var chineseElements = ['Metal', 'Agua', 'Madera', 'Fuego', 'Tierra'];
  var mayaNames = ['Imix', 'Ik', 'Akbal', 'Kan', 'Chicchan', 'Cimi', 'Manik', 'Lamat', 'Muluc', 'Oc', 'Chuen', 'Eb', 'Ben', 'Ix', 'Men', 'Cib', 'Caban', 'Eznab', 'Cauac', 'Ahau'];
  var yearStories = {
    1989: ['La caída del Muro de Berlín marcó un cambio histórico en Europa.', 'La World Wide Web fue propuesta por Tim Berners-Lee en el CERN.', 'La tecnología doméstica estaba entrando en la era de los discos compactos y las primeras redes digitales.'],
    1990: ['El telescopio espacial Hubble fue lanzado en abril.', 'La World Wide Web comenzó a tomar forma pública en los primeros años de esta década.', 'Los videojuegos de 16 bits y los discos compactos definían buena parte del ocio tecnológico.'],
    2000: ['El cambio de milenio impulsó una expansión mundial de Internet.', 'Los teléfonos móviles empezaban a pasar de herramienta profesional a objeto cotidiano.', 'El cine digital y los formatos MP3 transformaban la forma de consumir cultura.'],
    2010: ['Los teléfonos inteligentes empezaron a consolidarse como la pantalla principal.', 'Las redes sociales pasaron a formar parte de la comunicación diaria.', 'La fotografía digital y el almacenamiento en la nube se volvieron cada vez más accesibles.'],
    2020: ['La pandemia de COVID-19 alteró la vida cotidiana en todo el mundo.', 'El trabajo y la educación remotos se volvieron experiencias masivas.', 'La investigación de vacunas alcanzó una velocidad sin precedentes recientes.']
  };

  function loadData() { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (error) { return {}; } }
  function saveDOB() { var current = getDate(); if (current) { data.dob = { month: current.getMonth(), day: current.getDate(), year: current.getFullYear() }; localStorage.setItem(storageKey, JSON.stringify(data)); } }
  function getDate() {
    if (!year || !month || !day) return null;
    var yVal = Number(year.value), mVal = Number(month.value), dVal = Number(day.value);
    var date = new Date(yVal, mVal, dVal);
    return year.value && month.value !== '' && day.value && date.getFullYear() === yVal && date.getMonth() === mVal && date.getDate() === dVal && date <= new Date() ? date : null;
  }
  function esc(value) { return String(value || '').replace(/[&<>"']/g, function (character) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]; }); }
  function fmt(date, options) { return new Intl.DateTimeFormat('es', options).format(date); }
  function ageParts(birth) { var now = new Date(), years = now.getFullYear() - birth.getFullYear(), months = now.getMonth() - birth.getMonth(), days = now.getDate() - birth.getDate(); if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; } return { years: years, months: months, days: days }; }
  function daysUntilBirthday(birth) { var now = new Date(), next = new Date(now.getFullYear(), birth.getMonth(), birth.getDate()); if (next < now) next.setFullYear(next.getFullYear() + 1); return Math.ceil((next - now) / 86400000); }
  function reduceNumber(value) { while (value > 9 && value !== 11 && value !== 22 && value !== 33) value = String(value).split('').reduce(function (sum, digit) { return sum + Number(digit); }, 0); return value; }
  function lifePath(birth) { return reduceNumber(String(birth.getFullYear()) + (birth.getMonth() + 1) + birth.getDate()); }
  function westernSign(birth) { var key = [birth.getMonth() + 1, birth.getDate()]; return zodiac.find(function (sign) { return key[0] === sign.from[0] && key[1] >= sign.from[1] || key[0] === sign.to[0] && key[1] <= sign.to[1]; }).name; }
  function chineseSign(birth) {
    var yearText = new Intl.DateTimeFormat('zh-u-ca-chinese', { year: 'numeric' }).format(birth);
    var branches = { '子': 0, '丑': 1, '寅': 2, '卯': 3, '辰': 4, '巳': 5, '午': 6, '未': 7, '申': 8, '酉': 9, '戌': 10, '亥': 11 };
    var stems = { '甲': 2, '乙': 2, '丙': 3, '丁': 3, '戊': 4, '己': 4, '庚': 0, '辛': 0, '壬': 1, '癸': 1 };
    var match = yearText.match(/([甲乙丙丁戊己庚辛壬癸])([子丑寅卯辰巳午未申酉戌亥])/);
    if (!match) return 'No disponible';
    return chineseAnimals[branches[match[2]]] + ' de ' + chineseElements[stems[match[1]]].toLowerCase();
  }
  function siderealSign(birth) { var dayOfYear = Math.floor((birth - new Date(birth.getFullYear(), 0, 0)) / 86400000); var tropical = (dayOfYear / 365 * 360 + 280) % 360; var sidereal = (tropical - 24 + 360) % 360; return ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'][Math.floor(sidereal / 30)]; }
  function egyptianSign(birth) { var day = (birth.getMonth() + 1) * 100 + birth.getDate(); var ranges = [[107, 'Amun-Ra'], [121, 'Mut'], [208, 'Geb'], [319, 'Osiris'], [426, 'Isis'], [527, 'Thoth'], [629, 'Horus'], [826, 'Anubis'], [930, 'Bastet'], [1027, 'Sekhmet'], [1125, 'Neith'], [1231, 'Hapi']]; return (ranges.find(function (range) { return day <= range[0]; }) || ranges[0])[1]; }
  function celticSign(birth) { var day = (birth.getMonth() + 1) * 100 + birth.getDate(); var ranges = [[120, 'Abedul'], [218, 'Serbal'], [317, 'Fresno'], [414, 'Aliso'], [513, 'Sauce'], [609, 'Espino'], [706, 'Roble'], [804, 'Acebo'], [901, 'Avellano'], [929, 'Vid'], [1028, 'Hiedra'], [1124, 'Caña'], [1223, 'Saúco'], [1231, 'Abedul']]; return (ranges.find(function (range) { return day <= range[0]; }) || ranges[0])[1]; }
  function personalYear(birth) { return reduceNumber(new Date().getFullYear() + (birth.getMonth() + 1) + birth.getDate()); }
  function moonPhase(birth) { var known = new Date(Date.UTC(2000, 0, 6, 18, 14)), days = (birth.getTime() - known.getTime()) / 86400000, phase = ((days % 29.530588853) + 29.530588853) % 29.530588853; if (phase < 1.85 || phase > 27.68) return 'Luna nueva'; if (phase < 7.38) return 'Creciente'; if (phase < 9.22) return 'Cuarto creciente'; if (phase < 14.76) return 'Gibosa creciente'; if (phase < 16.61) return 'Luna llena'; if (phase < 22.14) return 'Gibosa menguante'; if (phase < 23.99) return 'Cuarto menguante'; return 'Menguante'; }
  function formatCalendarSpanish(type, birth) {
    try {
      if (type === 'islamic') {
        var parts = new Intl.DateTimeFormat('es-u-ca-islamic', { dateStyle: 'long' }).formatToParts(birth);
        var day = '', month = '', year = '';
        parts.forEach(function (p) {
          if (p.type === 'day') day = p.value;
          if (p.type === 'month') month = p.value;
          if (p.type === 'year') year = p.value;
        });
        var islamicMonths = {
          'muharram': 'Muharram', 'safar': 'Sáfar', 'rabiʻ i': 'Rabi al-Awwal', 'rabiʻ ii': 'Rabi al-Thani',
          'jumada i': 'Yumada al-Ula', 'jumada ii': 'Yumada al-Tania', 'rajab': 'Rayab', 'shaʻban': 'Shaabán',
          'ramadan': 'Ramadán', 'shawwal': 'Shawwal', 'dhuʻl-qiʻdah': 'Du al-Qadah', 'dhuʻl-hijjah': 'Du al-Hiyyah'
        };
        var cleanMonth = (month || '').toLowerCase().replace(/[\u2018\u2019\u02BB\u02BC']/g, 'ʻ');
        var esMonth = islamicMonths[cleanMonth] || (month.charAt(0).toUpperCase() + month.slice(1).replace(/ʻ/g, ''));
        return day + ' de ' + esMonth + ' de ' + year + ' de la Hégira';
      }

      if (type === 'hebrew') {
        var parts = new Intl.DateTimeFormat('es-u-ca-hebrew', { dateStyle: 'long' }).formatToParts(birth);
        var day = '', month = '', year = '';
        parts.forEach(function (p) {
          if (p.type === 'day') day = p.value;
          if (p.type === 'month') month = p.value;
          if (p.type === 'year') year = p.value;
        });
        var hebrewMonths = {
          'tishri': 'Tishrei', 'tishrei': 'Tishrei', 'heshvan': 'Jeshván', 'marheshvan': 'Marjeshván', 'marcheshvan': 'Marjeshván',
          'kislev': 'Kislev', 'tevet': 'Tevet', 'shevat': 'Shevat', 'adar i': 'Adar I', 'adar ii': 'Adar II', 'adar': 'Adar',
          'nisan': 'Nisán', 'iyar': 'Iyar', 'sivan': 'Siván', 'tamuz': 'Tamuz', 'tammuz': 'Tamuz', 'av': 'Av', 'elul': 'Elul'
        };
        var cleanMonth = (month || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        var esMonth = hebrewMonths[cleanMonth] || (month.charAt(0).toUpperCase() + month.slice(1));
        return day + ' de ' + esMonth + ' de ' + year + ' del calendario hebreo';
      }

      if (type === 'persian') {
        var parts = new Intl.DateTimeFormat('es-u-ca-persian', { dateStyle: 'long' }).formatToParts(birth);
        var day = '', month = '', year = '';
        parts.forEach(function (p) {
          if (p.type === 'day') day = p.value;
          if (p.type === 'month') month = p.value;
          if (p.type === 'year') year = p.value;
        });
        var esMonth = month ? (month.charAt(0).toUpperCase() + month.slice(1)) : '';
        return day + ' de ' + esMonth + ' de ' + year + ' (era solar persa)';
      }

      if (type === 'ethiopic') {
        var parts = new Intl.DateTimeFormat('es-u-ca-ethiopic', { dateStyle: 'long' }).formatToParts(birth);
        var day = '', month = '', year = '';
        parts.forEach(function (p) {
          if (p.type === 'day') day = p.value;
          if (p.type === 'month') month = p.value;
          if (p.type === 'year') year = p.value;
        });
        var esMonth = month ? (month.charAt(0).toUpperCase() + month.slice(1)) : '';
        return day + ' de ' + esMonth + ' de ' + year + ' de la era etíope';
      }

      if (type === 'japanese') {
        var parts = new Intl.DateTimeFormat('es-u-ca-japanese', { dateStyle: 'long' }).formatToParts(birth);
        var day = '', month = '', year = '', era = '';
        parts.forEach(function (p) {
          if (p.type === 'day') day = p.value;
          if (p.type === 'month') month = p.value;
          if (p.type === 'year') year = p.value;
          if (p.type === 'era') era = p.value;
        });
        return day + ' de ' + month + ' del año ' + year + ' de la era ' + era;
      }

      if (type === 'chinese') {
        var partsZh = new Intl.DateTimeFormat('zh-CN-u-ca-chinese', { dateStyle: 'long' }).formatToParts(birth);
        var year = '', monthZh = '', dayZh = '';
        partsZh.forEach(function (p) {
          if (p.type === 'relatedYear') year = p.value;
          if (p.type === 'month') monthZh = p.value;
          if (p.type === 'day') dayZh = p.value;
        });
        var zhMonths = [
          ['十一月', '11.º mes lunar'], ['十二月', '12.º mes lunar'], ['腊月', '12.º mes lunar'],
          ['正月', '1.er mes lunar'], ['一月', '1.er mes lunar'], ['二月', '2.º mes lunar'],
          ['三月', '3.er mes lunar'], ['四月', '4.º mes lunar'], ['五月', '5.º mes lunar'],
          ['六月', '6.º mes lunar'], ['七月', '7.º mes lunar'], ['八月', '8.º mes lunar'],
          ['九月', '9.º mes lunar'], ['十月', '10.º mes lunar']
        ];
        var esMonth = monthZh;
        var isLeap = esMonth.indexOf('闰') !== -1;
        esMonth = esMonth.replace('闰', '');
        for (var i = 0; i < zhMonths.length; i++) {
          if (esMonth === zhMonths[i][0]) { esMonth = zhMonths[i][1]; break; }
        }
        if (isLeap) esMonth += ' intercalar (bisiesto)';
        var zhDays = {
          '初一':'1','初二':'2','初三':'3','初四':'4','初五':'5','初六':'6','初七':'7','初八':'8','初九':'9','初十':'10',
          '十一':'11','十二':'12','十三':'13','十四':'14','十五':'15','十六':'16','十七':'17','十八':'18','十九':'19','二十':'20',
          '廿一':'21','廿二':'22','廿三':'23','廿四':'24','廿五':'25','廿六':'26','廿七':'27','廿八':'28','廿九':'29','三十':'30'
        };
        var dayNum = zhDays[dayZh] || dayZh;
        var cSign = chineseSign(birth);
        var zodiacInfo = cSign && cSign !== 'No disponible' ? ' (' + cSign + ')' : '';
        return 'Día ' + dayNum + ' del ' + esMonth + ', año ' + year + zodiacInfo;
      }
    } catch (e) {
      return '';
    }
    return '';
  }
  function calendars(birth) {
    var configs = [
      { id: 'islamic', orig: 'en-u-ca-islamic', title: 'Calendario islámico', desc: 'Basado en las fases de la luna. Marca los meses y festividades de la tradición musulmana.' },
      { id: 'hebrew', orig: 'en-u-ca-hebrew', title: 'Calendario hebreo', desc: 'Calendario lunisolar, determina las festividades judías y los años desde la creación del mundo (según la tradición).' },
      { id: 'persian', orig: 'en-u-ca-persian', title: 'Calendario persa', desc: 'Un calendario solar muy preciso que inicia con el equinoccio de primavera, usado en Irán y Afganistán.' },
      { id: 'ethiopic', orig: 'en-u-ca-ethiopic', title: 'Calendario etíope', desc: 'Calendario solar con 12 meses de 30 días y un decimotercer mes corto. Retrasado unos 7 años respecto al gregoriano.' },
      { id: 'japanese', orig: 'ja-JP-u-ca-japanese', title: 'Era japonesa', desc: 'Sistema tradicional que cuenta los años a partir del inicio del reinado del emperador actual.' },
      { id: 'chinese', orig: 'zh-CN-u-ca-chinese', title: 'Calendario chino', desc: 'Lunisolar. Combina ciclos lunares y solares, define el Año Nuevo Chino y las festividades tradicionales.' }
    ];
    return configs.map(function (config) { 
      try { 
        var origText = new Intl.DateTimeFormat(config.orig, { dateStyle: 'long' }).format(birth);
        var esText = formatCalendarSpanish(config.id, birth) || origText;
        return '<article class="info-card"><h3>' + config.title + '</h3><strong>' + esc(origText) + '</strong><span style="display:block; margin-bottom:12px; font-weight:600; color:var(--teal); font-size:0.85rem;">Traducción: ' + esc(esText) + '</span><p>' + config.desc + '</p></article>'; 
      } catch (error) { return ''; } 
    }).join('');
  }
  function milestone(birth, label, amount, unit) { var date = new Date(birth); if (unit === 'days') date.setDate(date.getDate() + amount); if (unit === 'hours') date.setTime(date.getTime() + amount * 3600000); if (unit === 'weeks') date.setDate(date.getDate() + amount * 7); if (unit === 'years') date.setFullYear(date.getFullYear() + amount); return '<article class="milestone"><strong>' + esc(label) + '</strong><span>' + fmt(date, { dateStyle: 'medium' }) + '</span></article>'; }
  function render() {
    var birth = getDate(); if (!birth) return;
    var age = ageParts(birth), output = document.getElementById('identity-output');
    if (output) {
      output.innerHTML = '<article class="identity-card identity-main"><p class="section-kicker">EDAD EXACTA</p><strong>' + age.years + ' años, ' + age.months + ' meses y ' + age.days + ' días</strong><span>Naciste un ' + fmt(birth, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</span></article><article class="identity-card"><p class="section-kicker">PRÓXIMO CUMPLEAÑOS</p><strong>' + daysUntilBirthday(birth) + ' días</strong><span>hasta volver a celebrar</span></article><article class="identity-card"><p class="section-kicker">GENERACIÓN</p><strong>' + generation(birth.getFullYear()) + '</strong><span>clasificación aproximada</span></article>';
    }
    var calOutput = document.getElementById('calendar-output');
    if (calOutput) {
      calOutput.innerHTML = calendars(birth) + card('Edad tradicional coreana', String(new Date().getFullYear() - birth.getFullYear() + 1) + ' años', 'Sistema nominal histórico; Corea del Sur usa hoy la edad internacional') + card('Edad nominal japonesa', String(new Date().getFullYear() - birth.getFullYear() + 1) + ' años', 'Conteo tradicional de la edad, no la edad legal actual');
    }
    var wSign = westernSign(birth), cSign = chineseSign(birth), sSign = siderealSign(birth), eSign = egyptianSign(birth), tSign = celticSign(birth), mPhase = moonPhase(birth), lp = lifePath(birth), may = mayaDay(birth), pYear = personalYear(birth);
    var symOutput = document.getElementById('symbol-output');
    if (symOutput) {
      symOutput.innerHTML = card('Zodiaco occidental', wSign, 'Tradición astrológica occidental', 'zodiac/zodiac-' + wSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Zodiaco chino', cSign, 'Ciclo lunisolar de doce animales', 'chinese/chinese-' + cSign.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Jyotisha', sSign, 'Signo solar sideral aproximado', 'jyotisha/jyotisha-' + sSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Zodiaco egipcio', eSign, 'Sistema moderno inspirado en símbolos del Egipto antiguo', 'egyptian/egyptian-' + eSign.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Árbol celta', tSign, 'Zodiaco arbóreo de tradición moderna', 'celtic/celtic-' + tSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Tzolk’in maya', may, 'Conversión recreativa; existen distintas correlaciones', 'mayan/mayan-' + may.split(' ')[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Año personal', String(pYear), 'Lectura numerológica recreativa para el año actual', 'personal-year/personal-year-' + pYear) + card('Fase lunar', mPhase, 'Fase astronómica aproximada', 'moon/moon-' + mPhase.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Numerología', 'Camino de vida ' + lp, 'Lectura simbólica basada en los dígitos de tu fecha', 'numerology/numerology-' + lp);
    }
    var msOutput = document.getElementById('milestone-output');
    if (msOutput) {
      msOutput.innerHTML = milestone(birth, '1.000 días', 1000, 'days') + milestone(birth, '10.000 días', 10000, 'days') + milestone(birth, '1.000 semanas', 1000, 'weeks') + milestone(birth, '1 millón de horas', 1000000, 'hours') + milestone(birth, 'Cumplir 40 años', 40, 'years');
    }
    renderHistory(birth);
    var tlOutput = document.getElementById('timeline-output');
    if (tlOutput) {
      var entries = (data.events || []).concat(data.goals || []).sort(function (a, b) { return a.index - b.index; });
      tlOutput.innerHTML = entries.length ? entries.map(function (entry) { return '<li><strong>' + esc(entry.title) + '</strong><span>Periodo ' + (entry.index + 1) + '</span></li>'; }).join('') : '<li class="muted">Aún no hay eventos ni metas. Añádelos desde uno de tus mapas.</li>';
    }
    initOracle(birth);
  }
  function card(title, value, description, imageId) { return '<article class="info-card" data-symbol="' + esc(title) + '">' + (imageId ? '<div class="card-image-wrap"><img src="images/' + imageId + '.jpg" alt="' + esc(value) + '" class="card-image" onerror="this.parentElement.style.display=\'none\'"></div>' : '') + '<h3>' + title + '</h3><strong>' + esc(value) + '</strong><p>' + description + '</p></article>'; }
  function renderHistory(birth) {
    var histOutput = document.getElementById('history-output');
    if (!histOutput) return;
    var stories = yearStories[birth.getFullYear()] || ['Tu fecha cayó en un ' + fmt(birth, { weekday: 'long' }) + '.', 'El año ' + birth.getFullYear() + ' pertenece al siglo ' + (Math.floor((birth.getFullYear() - 1) / 100) + 1) + '.', (birth.getFullYear() % 4 === 0 ? 'Fue un año bisiesto.' : 'No fue un año bisiesto.')];
    histOutput.innerHTML = stories.map(function (story, index) { return '<article class="history-item"><span>0' + (index + 1) + '</span><p>' + esc(story) + '</p></article>'; }).join('');
  }
  function generation(value) { if (value < 1946) return 'Generación silenciosa'; if (value < 1965) return 'Baby Boomer'; if (value < 1981) return 'Generación X'; if (value < 1997) return 'Millennial'; if (value < 2013) return 'Generación Z'; return 'Generación Alfa'; }
  function mayaDay(birth) { var days = Math.floor((Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate()) - Date.UTC(2012, 11, 21)) / 86400000); var tone = ((days % 13) + 13) % 13 + 1; var name = mayaNames[((days % 20) + 20) % 20]; return tone + ' ' + name; }

  function initOracle(birth) {
    var algoContainer = document.getElementById('oracle-algo-output');
    if (algoContainer) algoContainer.innerHTML = generateAlgorithmicOracle(birth);
    var tabAlgo = document.getElementById('tab-algo'), tabAi = document.getElementById('tab-ai');
    var contentAlgo = document.getElementById('oracle-algo-content'), contentAi = document.getElementById('oracle-ai-content');
    if (tabAlgo && tabAi) {
        tabAlgo.onclick = function() { tabAlgo.classList.add('active'); tabAi.classList.remove('active'); contentAlgo.style.display = 'block'; contentAi.style.display = 'none'; };
        tabAi.onclick = function() { tabAi.classList.add('active'); tabAlgo.classList.remove('active'); contentAi.style.display = 'block'; contentAlgo.style.display = 'none'; };
    }
    setupAIChat(birth);
  }

  function generateAlgorithmicOracle(birth) {
    var today = new Date();
    var seed = birth.getFullYear() * 10000 + birth.getMonth() * 100 + birth.getDate() + today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
    var contexts = [
      "Las estrellas indican una fuerte alineación cósmica en este día.",
      "El Universo ha trazado un ciclo de profunda introspección para ti hoy.",
      "Bajo la influencia de tu camino numerológico, este es un momento de revelación.",
      "Las constelaciones sugieren un flujo de energía renovadora en tu camino.",
      "El tejido astral vibra con tu fecha de nacimiento en esta jornada.",
      "Los astros te invitan a observar las señales ocultas en tu entorno hoy.",
      "Se abre una ventana de sincronicidad profunda según tu carta energética.",
      "Tus guías cósmicos señalan un cambio sutil pero poderoso en tu aura.",
      "Este día trae consigo una frecuencia de expansión para tu espíritu.",
      "La energía de los ancestros resuena con fuerza en tu presente hoy."
    ];
    var energies = [
      "Tu desafío principal será soltar aquello que ya no te sirve.",
      "Una ola de creatividad está a punto de manifestarse en tu vida.",
      "Es el momento perfecto para confiar en tu intuición por encima de la lógica.",
      "Una conversación inesperada podría traerte la respuesta que estabas buscando.",
      "Tu energía vital pide descanso y reconexión con la naturaleza.",
      "Un pequeño obstáculo te enseñará una lección invaluable si mantienes la calma.",
      "La abundancia fluye hacia ti, pero debes estar abierto a recibirla.",
      "Tus emociones podrían estar a flor de piel; úsalas como brújula, no como ancla.",
      "Un sueño o pensamiento recurrente contiene la clave de tu próximo paso.",
      "Alguien de tu pasado cósmico está enviándote energía de sanación."
    ];
    var advices = [
      "El consejo del Oráculo: Da el primer paso, el camino aparecerá bajo tus pies.",
      "El consejo del Oráculo: Respira hondo y abraza la incertidumbre; ahí reside la magia.",
      "El consejo del Oráculo: No busques la perfección, busca el progreso constante.",
      "El consejo del Oráculo: Agradece lo que tienes y el Universo te multiplicará las bendiciones.",
      "El consejo del Oráculo: Sé como el agua, fluye ante las rocas de tu camino.",
      "El consejo del Oráculo: La verdadera sabiduría está en saber escuchar el silencio.",
      "El consejo del Oráculo: Hoy es un buen día para perdonar y liberar peso kármico.",
      "El consejo del Oráculo: Atrévete a brillar; el mundo necesita tu luz única.",
      "El consejo del Oráculo: Escucha a tu corazón, es el único oráculo que nunca miente.",
      "El consejo del Oráculo: Confía en el proceso; todo se está acomodando a tu favor."
    ];
    var mPhaseInt = Math.floor( ((birth.getTime() - new Date(Date.UTC(2000, 0, 6, 18, 14)).getTime()) / 86400000) % 29.53 );
    var lp = lifePath(birth), pYear = personalYear(birth);
    var idxContext = Math.abs(seed + mPhaseInt) % contexts.length;
    var idxEnergy = Math.abs(seed + parseInt(lp)) % energies.length;
    var idxAdvice = Math.abs(seed + parseInt(pYear)) % advices.length;
    return "<p>" + contexts[idxContext] + "</p><p>" + energies[idxEnergy] + "</p><p>" + advices[idxAdvice] + "</p>";
  }

  function setupAIChat(birth) {
    var apiKeyInput = document.getElementById('gemini-api-key'), saveBtn = document.getElementById('save-api-key'), removeBtn = document.getElementById('remove-api-key');
    var setupBox = document.getElementById('api-key-setup'), chatBox = document.getElementById('ai-chat-interface'), askBtn = document.getElementById('ask-ai-btn');
    var questionInput = document.getElementById('ai-question'), historyBox = document.getElementById('chat-history');
    if (!setupBox) return;

    function updateUI() {
        if (localStorage.getItem('gemini_api_key')) { setupBox.style.display = 'none'; chatBox.style.display = 'flex'; }
        else { setupBox.style.display = 'block'; chatBox.style.display = 'none'; }
    }
    updateUI();
    if (saveBtn) {
      saveBtn.onclick = function() {
          var key = apiKeyInput.value.trim();
          if (key.length > 10) { localStorage.setItem('gemini_api_key', key); updateUI(); } else { alert('Clave API inválida.'); }
      };
    }
    if (removeBtn) {
      removeBtn.onclick = function() { localStorage.removeItem('gemini_api_key'); historyBox.innerHTML = ''; updateUI(); };
    }
    if (askBtn) {
      askBtn.onclick = async function() {
          var q = questionInput.value.trim(), key = localStorage.getItem('gemini_api_key');
          if (!q || !key) return;
          historyBox.innerHTML += '<div class="chat-msg user">' + esc(q) + '</div>';
          questionInput.value = '';
          var loadingId = 'loading-' + Date.now();
          historyBox.innerHTML += '<div id="' + loadingId + '" class="chat-msg oracle">Consultando los astros...</div>';
          historyBox.scrollTop = historyBox.scrollHeight;
          
          var sysPrompt = "Eres el Oráculo Astral de Mapa de Vida. Eres un guía místico, sabio y ancestral. El usuario nació el " + birth.toISOString().split('T')[0] + ", Signo: " + westernSign(birth) + ", Zodiaco Chino: " + chineseSign(birth) + ", Camino de vida: " + lifePath(birth) + ", Año personal: " + personalYear(birth) + ". Usa esto para darle contexto cósmico a su pregunta y no menciones su fecha si no es necesario.";
          try {
              var response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ parts: [{ text: q }] }], systemInstruction: { parts: [{ text: sysPrompt }] }, generationConfig: { temperature: 0.9, maxOutputTokens: 250 } })
              });
              var data = await response.json();
              var el = document.getElementById(loadingId); if (el) el.remove();
              if (data.error) historyBox.innerHTML += '<div class="chat-msg oracle" style="color:red;">Error: ' + esc(data.error.message) + '</div>';
              else if (data.candidates && data.candidates[0].content) {
                  var text = data.candidates[0].content.parts[0].text;
                  historyBox.innerHTML += '<div class="chat-msg oracle">' + esc(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') + '</div>';
              }
          } catch (e) {
              var el2 = document.getElementById(loadingId); if (el2) el2.remove();
              historyBox.innerHTML += '<div class="chat-msg oracle" style="color:red;">El oráculo está temporalmente inaccesible.</div>';
          }
          historyBox.scrollTop = historyBox.scrollHeight;
      };
    }
    if (questionInput) {
      questionInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') askBtn.click(); });
    }
  }

  [month, day, year].forEach(function (element) { if(element) element.addEventListener('input', function () { saveDOB(); render(); }); });

  // Sincronización automática con datos de portada y localStorage
  try {
    var pData = JSON.parse(localStorage.getItem('portal_data') || 'null');
    if (pData && pData.d && pData.m !== undefined && pData.y) {
      if (day) day.value = parseInt(pData.d, 10);
      if (month) month.value = parseInt(pData.m, 10);
      if (year) year.value = parseInt(pData.y, 10);
      saveDOB();
    } else if (data.dob) {
      if (month) month.value = data.dob.month;
      if (day) day.value = data.dob.day;
      if (year) year.value = data.dob.year;
    } else {
      try {
        if (typeof window !== 'undefined' && window.location && window.location.pathname.endsWith('fecha.html')) {
          window.location.replace('index.html');
          return;
        }
      } catch (err) {}
    }
  } catch (e) {}

  render();
  
  // Fade-in cósmico para secciones
  (function() {
    var fades = document.querySelectorAll('.cosmic-fade');
    if (!fades.length) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    fades.forEach(function(el) { observer.observe(el); });
  })();
  var guide = document.createElement('script'); guide.src = 'guide.js'; document.body.appendChild(guide);
})();
