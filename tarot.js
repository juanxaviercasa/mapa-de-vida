(function () {
  'use strict';
  var app = document.getElementById('tarot-app');
  var cards = Object.keys(window.tarotDatabase);
  var profile = window.EsotericEngine.calculateProfile();
  var seed = (profile.lifePath || 1) + new Date().getDate() + new Date().getMonth() + new Date().getFullYear();
  var lastReading = null;
  var positions = ['Enfoque', 'Contexto', 'Desafío', 'Orientación'];

  function draw(count) {
    var result = [], index = seed % cards.length;
    for (var offset = 0; offset < count; offset++) {
      index = (seed + offset * 7) % cards.length;
      var cardName = cards[index];
      result.push({ name: cardName, details: window.tarotDatabase[cardName], position: offset, reversed: document.getElementById('tarot-reversed').checked && (seed + offset) % 4 === 0 });
    }
    return result;
  }

  function cardSlug(name) {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function renderReading(reading) {
    lastReading = reading;
    document.getElementById('tarot-output').innerHTML = reading.map(function (card, index) {
      var slug = cardSlug(card.name);
      
      var meaningHTML = '<div class="tarot-details">';
      if (card.reversed) {
          meaningHTML += '<h3>Significado Invertido</h3><p>' + card.details.invertida + '</p>';
      } else {
          meaningHTML += '<h3>General / Psicológico</h3><p>' + card.details.general + '</p>';
          meaningHTML += '<h3>Amor y Relaciones</h3><p>' + card.details.amor + '</p>';
          meaningHTML += '<h3>Trabajo y Dinero</h3><p>' + card.details.trabajo + '</p>';
          meaningHTML += '<h3>Salud y Bienestar</h3><p>' + card.details.salud + '</p>';
      }
      meaningHTML += '</div>';

      return '<article class="tarot-card' + (card.reversed ? ' is-reversed' : '') + '" aria-label="' + positions[card.position] + ': ' + card.name + (card.reversed ? ', invertida' : '') + '">' +
        '<div class="card-image-wrap tarot-image-wrap"><img src="images/tarot/tarot-' + slug + '.jpg" alt="' + card.name + '" class="card-image tarot-img" onerror="this.parentElement.style.display=\'none\'"></div>' +
        '<div class="tarot-content-wrap"><span class="tarot-number">0' + (index + 1) + '</span><p class="section-kicker">' + positions[card.position] + (card.reversed ? ' · Invertida' : '') + '</p><h2>' + card.name + '</h2>' + meaningHTML + '</div></article>';
    }).join('');
    document.getElementById('tarot-save').disabled = false;
  }

  app.innerHTML = '<header class="view-header"><p class="eyebrow">✦ CARTA Y REFLEXIÓN ✦</p><h1>Tarot</h1><p class="subtitle">Una tirada breve para contemplar el momento presente. No predice hechos: abre una conversación contigo.</p></header>' +
    '<section class="panel tarot-controls"><label for="tarot-spread">Tipo de tirada <select id="tarot-spread"><option value="1">Una carta · enfoque</option><option value="3">Tres cartas · contexto, desafío y orientación</option></select></label><label class="tarot-toggle"><input id="tarot-reversed" type="checkbox"> Permitir cartas invertidas</label><button id="tarot-draw" type="button">Extraer cartas</button></section>' +
    '<section id="tarot-output" class="tarot-grid" aria-live="polite"><div class="panel muted">Elige una tirada para comenzar.</div></section>' +
    '<section class="panel tarot-reflection"><label for="tarot-note">¿Qué te despierta esta lectura?</label><textarea id="tarot-note" placeholder="Escribe una observación para tu diario..."></textarea><button id="tarot-save" type="button" disabled>Guardar reflexión</button></section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">CONTEXTO</p><p class="muted">Las cartas se presentan como símbolos y preguntas de reflexión. No sustituyen atención profesional ni deben usarse para tomar decisiones médicas, legales o financieras.</p><div class="esoteric-actions"><a class="button secondary" href="numerologia.html">Ver numerología</a><a class="button secondary" href="fecha.html">Volver a tu fecha</a></div></section>' +
    '<footer><p>Privado por diseño · Tus lecturas se guardan únicamente en este navegador.</p></footer>';

  document.getElementById('tarot-draw').addEventListener('click', function () {
    renderReading(draw(Number(document.getElementById('tarot-spread').value)));
  });
  document.getElementById('tarot-save').addEventListener('click', function () {
    if (!lastReading) return;
    var notes = JSON.parse(localStorage.getItem('your-life-data') || '{}');
    notes.tarotReadings = notes.tarotReadings || [];
    notes.tarotReadings.push({ date: new Date().toISOString(), cards: lastReading, note: document.getElementById('tarot-note').value.trim() });
    localStorage.setItem('your-life-data', JSON.stringify(notes));
    document.getElementById('tarot-note').value = '';
    document.getElementById('tarot-save').textContent = 'Reflexión guardada';
  });
})();