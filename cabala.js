(function () {
  'use strict';
  var sefirot = [
    ['Kéter', 'Corona', 'Intención, origen y conciencia de unidad.'],
    ['Jojmá', 'Sabiduría', 'Intuición creadora y visión inicial.'],
    ['Biná', 'Entendimiento', 'Forma, discernimiento y comprensión.'],
    ['Jésed', 'Misericordia', 'Generosidad, expansión y confianza.'],
    ['Guevurá', 'Fuerza', 'Límite, rigor y capacidad de elegir.'],
    ['Tiféret', 'Belleza', 'Centro, integración y equilibrio del corazón.'],
    ['Nétsaj', 'Victoria', 'Deseo, perseverancia y movimiento.'],
    ['Hod', 'Esplendor', 'Lenguaje, análisis y reconocimiento de patrones.'],
    ['Yesod', 'Fundamento', 'Imaginación, memoria y mundo interior.'],
    ['Maljut', 'Reino', 'Presencia, acción y encarnación en lo cotidiano.']
  ];
  function slugify(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  var app = document.getElementById('kabbalah-app');
  app.innerHTML = '<header class="view-header"><p class="eyebrow">✦ MAPA DE SIGNIFICADOS ✦</p><h1>Árbol de la Vida</h1><p class="subtitle">Una introducción contemplativa a las diez sefirot y a sus preguntas de equilibrio.</p></header>' +
    '<section class="panel tree-intro"><div class="card-image-wrap tree-banner-wrap"><img src="images/cabala/arbol-de-la-vida.jpg" alt="El Árbol de la Vida Cósmico" class="card-image" onerror="this.parentElement.style.display=\'none\'"></div><p class="section-kicker">DOS MARCOS QUE NO DEBEN CONFUNDIRSE</p><h2>Tradición y lectura simbólica</h2><p class="muted">La Cábala judía es una tradición religiosa e histórica con sus propios textos y prácticas. El Árbol de la Vida hermético es una interpretación esotérica posterior que relaciona sefirot, tarot, planetas y otros símbolos. Esta página ofrece una introducción cultural, no una representación completa de ninguna de las dos tradiciones.</p></section>' +
    '<section class="tree-grid" aria-label="Diez sefirot">' + sefirot.map(function (item, index) {
      var slug = slugify(item[0]);
      return '<article class="tree-node"><div class="card-image-wrap tree-image-wrap"><img src="images/cabala/sefira-' + slug + '.jpg" alt="' + item[0] + '" class="card-image" onerror="this.parentElement.style.display=\'none\'"></div><span class="tarot-number">0' + (index + 1) + '</span><h2>' + item[0] + '</h2><strong>' + item[1] + '</strong><p>' + item[2] + '</p><label>Pregunta para contemplar <textarea rows="2" data-sefira="' + item[0] + '" placeholder="Escribe una observación..."></textarea></label></article>';
    }).join('') + '</section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">CONTINÚA EXPLORANDO</p><div class="esoteric-actions"><a class="button" href="numerologia.html">Ver numerología</a><a class="button secondary" href="tarot.html">Abrir Tarot</a><a class="button secondary" href="lecturas.html">Mis lecturas</a></div></section>' +
    '<footer><p>Contenido introductorio y simbólico · Privado por diseño.</p></footer>';

  var stored = {};
  try { stored = JSON.parse(localStorage.getItem('your-life-data') || '{}'); } catch (error) {}
  var notes = stored.kabbalahNotes || {};
  document.querySelectorAll('[data-sefira]').forEach(function (field) {
    field.value = notes[field.dataset.sefira] || '';
    field.addEventListener('input', function () {
      notes[field.dataset.sefira] = field.value;
      stored.kabbalahNotes = notes;
      localStorage.setItem('your-life-data', JSON.stringify(stored));
    });
  });
})();