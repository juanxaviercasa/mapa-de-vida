(function () {
  'use strict';
  var app = document.getElementById('tarot-app');
  var cards = [
    ['El Loco', 'Inicio, libertad y confianza en el camino.'], ['El Mago', 'Recursos, voluntad y capacidad de comenzar.'], ['La Sacerdotisa', 'Intuición, silencio y conocimiento interior.'], ['La Emperatriz', 'Creatividad, cuidado y abundancia fértil.'], ['El Emperador', 'Estructura, límites y responsabilidad.'], ['El Hierofante', 'Tradición, aprendizaje y valores compartidos.'], ['Los Enamorados', 'Elección, vínculo y coherencia con tus valores.'], ['El Carro', 'Dirección, impulso y disciplina en movimiento.'], ['La Fuerza', 'Coraje sereno, paciencia y cuidado de la energía.'], ['El Ermitaño', 'Retiro, búsqueda interior y perspectiva.'], ['La Rueda', 'Cambio de ciclo, movimiento y oportunidad.'], ['La Justicia', 'Consecuencia, equilibrio y decisiones conscientes.'], ['El Colgado', 'Pausa, entrega y una mirada diferente.'], ['La Muerte', 'Cierre, transformación y espacio para lo nuevo.'], ['La Templanza', 'Integración, ritmo y equilibrio entre extremos.'], ['El Diablo', 'Deseo, apego y aquello que pide ser observado.'], ['La Torre', 'Revelación, ruptura de estructuras y verdad.'], ['La Estrella', 'Esperanza, inspiración y recuperación de confianza.'], ['La Luna', 'Imaginación, incertidumbre y mundo emocional.'], ['El Sol', 'Claridad, vitalidad y alegría compartida.'], ['El Juicio', 'Llamada interior, revisión y renacimiento.'], ['El Mundo', 'Cierre, integración y celebración de un ciclo.']
  ];
  var minorRanks = [
    ['As', 'Inicio y potencial'], ['Dos', 'Elección y equilibrio'], ['Tres', 'Crecimiento y colaboración'], ['Cuatro', 'Estabilidad y estructura'],
    ['Cinco', 'Cambio y tensión fértil'], ['Seis', 'Reciprocidad y avance'], ['Siete', 'Evaluación y perseverancia'], ['Ocho', 'Movimiento y dominio'],
    ['Nueve', 'Madurez y culminación'], ['Diez', 'Cierre y transformación'], ['Sota', 'Aprendizaje y curiosidad'], ['Caballero', 'Impulso y búsqueda'],
    ['Reina', 'Presencia y cuidado'], ['Rey', 'Dirección y responsabilidad']
  ];
  var minorSuits = [
    ['Bastos', 'energía, deseo y acción'], ['Copas', 'emoción, vínculo e intuición'], ['Espadas', 'pensamiento, palabra y decisión'], ['Oros', 'cuerpo, trabajo y recursos']
  ];
  minorSuits.forEach(function (suit) {
    minorRanks.forEach(function (rank) {
      cards.push([rank[0] + ' de ' + suit[0], rank[1] + ' en el ámbito de ' + suit[1] + '.']);
    });
  });
  var profile = window.EsotericEngine.calculateProfile();
  var seed = (profile.lifePath || 1) + new Date().getDate() + new Date().getMonth() + new Date().getFullYear();
  var lastReading = null;
  var positions = ['Enfoque', 'Contexto', 'Desafío', 'Orientación'];

  function draw(count) {
    var result = [], index = seed % cards.length;
    for (var offset = 0; offset < count; offset++) {
      index = (seed + offset * 7) % cards.length;
      result.push({ name: cards[index][0], meaning: cards[index][1], position: offset, reversed: document.getElementById('tarot-reversed').checked && (seed + offset) % 4 === 0 });
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
      return '<article class="tarot-card' + (card.reversed ? ' is-reversed' : '') + '" aria-label="' + positions[card.position] + ': ' + card.name + (card.reversed ? ', invertida' : '') + '">' +
        '<div class="card-image-wrap tarot-image-wrap"><img src="images/tarot/tarot-' + slug + '.jpg" alt="' + card.name + '" class="card-image tarot-img" onerror="this.parentElement.style.display=\'none\'"></div>' +
        '<span class="tarot-number">0' + (index + 1) + '</span><p class="section-kicker">' + positions[card.position] + (card.reversed ? ' · Invertida' : '') + '</p><h2>' + card.name + '</h2><p>' + card.meaning + '</p></article>';
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