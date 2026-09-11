(function () {
  'use strict';
  var profile = window.EsotericEngine.calculateProfile();
  var app = document.getElementById('numerology-app');
  var value = function (number) { return number === null ? '—' : number; };
  var displayName = profile.fullName || 'tu perfil';
  var meanings = {
    1: 'Inicio, autonomía y voluntad.', 2: 'Cooperación, escucha y equilibrio.', 3: 'Expresión, creatividad y comunicación.',
    4: 'Orden, constancia y construcción.', 5: 'Cambio, libertad y experiencia.', 6: 'Cuidado, responsabilidad y armonía.',
    7: 'Búsqueda, análisis y vida interior.', 8: 'Gestión, poder personal y materialización.', 9: 'Cierre, compasión y perspectiva amplia.',
    11: 'Intuición, inspiración y sensibilidad.', 22: 'Visión práctica y construcción a gran escala.', 33: 'Servicio, enseñanza y compasión.'
  };
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, function (character) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]; }); }
  var guide = Object.keys(meanings).map(function (number) { return '<article class="number-guide-item"><strong>' + number + '</strong><span>' + meanings[number] + '</span></article>'; }).join('');

  app.innerHTML = '<header class="view-header"><p class="eyebrow">✦ MAPA NUMÉRICO ✦</p><h1>Numerología</h1><p class="subtitle">Una lectura simbólica de los números presentes en tu nombre y tu fecha. Perfil actual: <strong>' + escapeHtml(displayName) + '</strong>.</p></header>' +
    '<section class="stats esoteric-stats">' +
      '<article><strong>' + value(profile.lifePath) + '</strong><span>Camino de vida</span></article>' +
      '<article><strong>' + value(profile.expression) + '</strong><span>Expresión</span></article>' +
      '<article><strong>' + value(profile.soulUrge) + '</strong><span>Alma</span></article>' +
      '<article><strong>' + value(profile.personality) + '</strong><span>Personalidad</span></article>' +
      '<article><strong>' + value(profile.personalYear) + '</strong><span>Año personal</span></article>' +
    '</section>' +
    '<section class="stats numerology-secondary-stats">' +
      '<article><strong>' + value(profile.birthDay) + '</strong><span>Día de nacimiento</span></article>' +
      '<article><strong>' + value(profile.attitude) + '</strong><span>Actitud</span></article>' +
      '<article><strong>' + value(profile.maturity) + '</strong><span>Madurez</span></article>' +
    '</section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">GUÍA DE SIGNIFICADOS</p><div class="number-guide">' + guide + '</div></section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">CÓMO LEERLO</p><h2>Los números son preguntas, no sentencias</h2><p class="muted">Esta lectura usa reducción numerológica pitagórica y conserva los números maestros 11, 22 y 33. Úsala como una herramienta de reflexión personal, no como una predicción ni como consejo médico, financiero o legal.</p></section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">SIGUIENTE PASO</p><div class="esoteric-actions"><a class="button" href="tarot.html">Abrir Tarot</a><a class="button secondary" href="fecha.html">Volver a tu fecha</a></div></section>' +
    '<footer><p>Privado por diseño · Los cálculos se realizan en tu navegador.</p></footer>';
})();