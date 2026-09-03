with open('your-life.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We need everything up to 'function createChart()'
# wait, your-life.js has functions for calculation. Let's see where createChart starts.
idx = js.find('function createChart()')
base_js = js[:idx] if idx != -1 else js

# Now we append the specific render() logic for fecha.html
render_logic = '''
  function milestone(birth, label, amount, unit) { var date = new Date(birth); if (unit === 'days') date.setDate(date.getDate() + amount); if (unit === 'hours') date.setTime(date.getTime() + amount * 3600000); if (unit === 'weeks') date.setDate(date.getDate() + amount * 7); if (unit === 'years') date.setFullYear(date.getFullYear() + amount); return '<article class="milestone"><strong>' + esc(label) + '</strong><span>' + fmt(date, { dateStyle: 'medium' }) + '</span></article>'; }
  function render() {
      var birth = getDate(); if (!birth) return;
      var age = ageParts(birth), output = document.getElementById('identity-output');
      output.innerHTML = '<article class="identity-card identity-main"><p class="section-kicker">EDAD EXACTA</p><strong>' + age.years + ' aos, ' + age.months + ' meses y ' + age.days + ' das</strong><span>Naciste un ' + fmt(birth, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '</span></article><article class="identity-card"><p class="section-kicker">PRXIMO CUMPLEAOS</p><strong>' + daysUntilBirthday(birth) + ' das</strong><span>hasta volver a celebrar</span></article><article class="identity-card"><p class="section-kicker">GENERACIN</p><strong>' + generation(birth.getFullYear()) + '</strong><span>clasificacin aproximada</span></article>';
      document.getElementById('calendar-output').innerHTML = calendars(birth) + card('Edad tradicional coreana', String(new Date().getFullYear() - birth.getFullYear() + 1) + ' aos', 'Sistema nominal histrico; Corea del Sur usa hoy la edad internacional') + card('Edad nominal japonesa', String(new Date().getFullYear() - birth.getFullYear() + 1) + ' aos', 'Conteo tradicional de la edad, no la edad legal actual');
      var wSign = westernSign(birth), cSign = chineseSign(birth), sSign = siderealSign(birth), eSign = egyptianSign(birth), tSign = celticSign(birth), mPhase = moonPhase(birth), lp = lifePath(birth), may = mayaDay(birth), pYear = personalYear(birth);
      document.getElementById('symbol-output').innerHTML = card('Zodiaco occidental', wSign, 'Tradicin astrolgica occidental', 'zodiac/zodiac-' + wSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Zodiaco chino', cSign, 'Ciclo lunisolar de doce animales', 'chinese/chinese-' + cSign.split(' ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Jyotisha', sSign, 'Signo solar sideral aproximado', 'jyotisha/jyotisha-' + sSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Zodiaco egipcio', eSign, 'Sistema moderno inspirado en smbolos del Egipto antiguo', 'egyptian/egyptian-' + eSign.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('rbol celta', tSign, 'Zodiaco arbreo de tradicin moderna', 'celtic/celtic-' + tSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Fase lunar', mPhase, 'Fase astronmica aproximada', 'moon/moon-' + mPhase.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")) + card('Numerologa', 'Camino de vida ' + lp, 'Lectura simblica basada en los dgitos de tu fecha', 'numerology/numerology-' + lp) + card('Ao personal', String(pYear), 'Lectura numerolgica recreativa para el ao actual', 'personal-year/personal-year-' + pYear) + card('Tzolk\\'in maya', may, 'Conversin recreativa; existen distintas correlaciones', 'mayan/mayan-' + may.split(' ')[1].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      document.getElementById('milestone-output').innerHTML = milestone(birth, '1.000 das', 1000, 'days') + milestone(birth, '10.000 das', 10000, 'days') + milestone(birth, '1.000 semanas', 1000, 'weeks') + milestone(birth, '1 milln de horas', 1000000, 'hours') + milestone(birth, 'Cumplir 40 aos', 40, 'years');
      renderHistory(birth);
      var entries = (data.events || []).concat(data.goals || []).sort(function (a, b) { return a.index - b.index; }); document.getElementById('timeline-output').innerHTML = entries.length ? entries.map(function (entry) { return '<li><strong>' + esc(entry.title) + '</strong><span>Periodo ' + (entry.index + 1) + '</span></li>'; }).join('') : '<li class="muted">An no hay eventos ni metas. Adelos desde uno de tus mapas.</li>';
      initOracle(birth);
  }
  function card(title, value, description, imageId) { return '<article class="info-card">' + (imageId ? '<div class="card-image-wrap"><img src="images/' + imageId + '.jpg" alt="' + esc(value) + '" class="card-image" onerror="this.parentElement.style.display=\\'none\\'"></div>' : '') + '<h3>' + title + '</h3><strong>' + esc(value) + '</strong><p>' + description + '</p></article>'; }
  function renderHistory(birth) {
      var stories = yearStories[birth.getFullYear()] || ['Tu fecha cay en un ' + fmt(birth, { weekday: 'long' }) + '.', 'El ao ' + birth.getFullYear() + ' pertenece al siglo ' + (Math.floor((birth.getFullYear() - 1) / 100) + 1) + '.', (birth.getFullYear() % 4 === 0 ? 'Fue un ao bisiesto.' : 'No fue un ao bisiesto.')];
      document.getElementById('history-output').innerHTML = stories.map(function (story, index) { return '<article class="history-item"><span>0' + (index + 1) + '</span><p>' + esc(story) + '</p></article>'; }).join('');
  }
  function generation(value) { if (value < 1946) return 'Generacin silenciosa'; if (value < 1965) return 'Baby Boomer'; if (value < 1981) return 'Generacin X'; if (value < 1997) return 'Millennial'; if (value < 2013) return 'Generacin Z'; return 'Generacin Alfa'; }
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
      return "<p>Orculo sincronizado con la fecha actual y tu nacimiento.</p>";
  }
  function setupAIChat(birth) {
    // Basic chat stub since we are restoring
  }

  [month, day, year].forEach(function (element) { if(element) element.addEventListener('input', function () { saveDOB(); render(); }); });
  render();
  
  // Fade-in
  setTimeout(function() {
    var fades = document.querySelectorAll('.cosmic-fade');
    for (var i=0; i<fades.length; i++) { fades[i].style.opacity = 1; fades[i].style.transform = 'translateY(0)'; }
  }, 100);

})();

// -- CONEXION CON PORTADA --
try {
    let pData = localStorage.getItem('portal_data');
    if (pData) {
        pData = JSON.parse(pData);
        if (pData.d && pData.m && pData.y) {
            document.getElementById('day').value = parseInt(pData.d);
            document.getElementById('month').value = parseInt(pData.m);
            document.getElementById('year').value = parseInt(pData.y);
            setTimeout(function() {
                document.getElementById('year').dispatchEvent(new Event('input'));
            }, 50);
        }
    }
} catch(e) {}
'''

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(base_js + render_logic)

