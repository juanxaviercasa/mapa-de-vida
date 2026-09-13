(function () {
  'use strict';
  var app = document.getElementById('readings-app');
  var data = readData();

  function readData() {
    try { return JSON.parse(localStorage.getItem('your-life-data') || '{}'); } catch (error) { return {}; }
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
    });
  }

  function dateLabel(value) {
    var date = new Date(value);
    return isNaN(date) ? 'Fecha desconocida' : date.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function render() {
    var tarot = (data.tarotReadings || []).map(function (item, index) {
      return '<article class="reading-item"><div><p class="section-kicker">TAROT · ' + dateLabel(item.date) + '</p><h2>' + escapeHtml((item.cards || []).map(function (card) { return card.name; }).join(' · ')) + '</h2><p>' + escapeHtml(item.note || 'Sin reflexión escrita.') + '</p></div><button type="button" data-type="tarot" data-index="' + index + '" aria-label="Eliminar lectura de Tarot del ' + dateLabel(item.date) + '">Eliminar</button></article>';
    });
    var sequences = (data.sequenceReflections || []).map(function (item, index) {
      return '<article class="reading-item"><div><p class="section-kicker">SECUENCIA · ' + dateLabel(item.date) + '</p><h2>' + escapeHtml(item.name) + ' · ' + escapeHtml(item.code) + '</h2><p>' + escapeHtml(item.note || 'Sin reflexión escrita.') + '</p></div><button type="button" data-type="sequence" data-index="' + index + '" aria-label="Eliminar reflexión de secuencia del ' + dateLabel(item.date) + '">Eliminar</button></article>';
    });
    var items = tarot.concat(sequences);
    app.innerHTML = '<header class="view-header"><p class="eyebrow">✦ CUADERNO SIMBÓLICO ✦</p><h1>Mis lecturas</h1><p class="subtitle">Un archivo privado de tus cartas, secuencias y reflexiones guardadas en este navegador.</p></header>' +
      '<section class="panel privacy-panel"><p class="section-kicker">PRIVACIDAD</p><p>Este historial no se sincroniza con ningún servidor. Puedes eliminar cada entrada o borrar todos los datos desde las herramientas de vida de la aplicación.</p></section>' +
      '<section class="reading-tools panel"><div><p class="section-kicker">GESTIÓN DE DATOS</p><p class="muted">Exporta una copia o elimina únicamente tus lecturas simbólicas.</p></div><div class="esoteric-actions"><button type="button" id="export-readings">Exportar JSON</button><label class="button secondary" for="import-readings">Importar JSON</label><input id="import-readings" type="file" accept="application/json" hidden><button type="button" id="clear-readings" class="danger">Borrar lecturas</button></div></section>' +
      '<section class="reading-list">' + (items.length ? items.join('') : '<div class="panel muted">Todavía no tienes lecturas guardadas. Explora Tarot o Secuencias numéricas para comenzar.</div>') + '</section>' +
      '<section class="panel esoteric-panel"><div class="esoteric-actions"><a class="button" href="tarot.html">Abrir Tarot</a><a class="button secondary" href="secuencias.html">Secuencias numéricas</a><a class="button secondary" href="cabala.html">Árbol de la Vida</a></div></section>';
    document.querySelectorAll('[data-type]').forEach(function (button) {
      button.addEventListener('click', function () {
        var collection = button.dataset.type === 'tarot' ? 'tarotReadings' : 'sequenceReflections';
        data[collection].splice(Number(button.dataset.index), 1);
        localStorage.setItem('your-life-data', JSON.stringify(data));
        render();
      });
    });
    document.getElementById('export-readings').addEventListener('click', exportReadings);
    document.getElementById('import-readings').addEventListener('change', importReadings);
    document.getElementById('clear-readings').addEventListener('click', clearReadings);
  }

  function exportReadings() {
    var payload = JSON.stringify({ tarotReadings: data.tarotReadings || [], sequenceReflections: data.sequenceReflections || [], exportedAt: new Date().toISOString() }, null, 2);
    var link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
    link.download = 'mapa-de-vida-lecturas.json';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importReadings(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var imported = JSON.parse(reader.result);
        data.tarotReadings = Array.isArray(imported.tarotReadings) ? imported.tarotReadings : [];
        data.sequenceReflections = Array.isArray(imported.sequenceReflections) ? imported.sequenceReflections : [];
        localStorage.setItem('your-life-data', JSON.stringify(data));
        render();
      } catch (error) { window.alert('El archivo no contiene lecturas válidas.'); }
    };
    reader.readAsText(file);
  }

  function clearReadings() {
    if (!window.confirm('¿Borrar todas las lecturas simbólicas?')) return;
    data.tarotReadings = [];
    data.sequenceReflections = [];
    localStorage.setItem('your-life-data', JSON.stringify(data));
    render();
  }

  render();
})();