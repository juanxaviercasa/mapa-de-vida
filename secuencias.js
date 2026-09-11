(function () {
  'use strict';
  var sequences = [
    { name: 'Calma y presencia', category: 'bienestar', code: '519 7148', description: 'Una secuencia para acompañar una pausa consciente y volver a la respiración.' },
    { name: 'Claridad de intención', category: 'enfoque', code: '714 273 218 93', description: 'Un recordatorio numérico para formular con claridad el siguiente paso.' },
    { name: 'Creatividad', category: 'enfoque', code: '519 481 714', description: 'Una invitación a abrir espacio para ideas, juego y expresión.' },
    { name: 'Gratitud', category: 'reflexion', code: '888 412 128 901', description: 'Una señal para detenerte y nombrar algo que ya está presente.' },
    { name: 'Confianza en el proceso', category: 'reflexion', code: '918 514 319', description: 'Un ancla simbólica para observar la paciencia y la continuidad.' },
    { name: 'Orden personal', category: 'habitos', code: '481 241 918', description: 'Una práctica de atención para elegir una tarea pequeña y completarla.' }
  ];
  var app = document.getElementById('sequences-app');
  var activeSequence = null;
  var timer = null;
  var remaining = 0;

  function card(item) {
    return '<article class="sequence-card"><p class="section-kicker">' + item.category.toUpperCase() + '</p><h2>' + item.name + '</h2><strong class="sequence-code">' + item.code + '</strong><p>' + item.description + '</p><button type="button" class="sequence-select" data-code="' + item.code + '" aria-label="Practicar ' + item.name + '">Practicar esta secuencia</button></article>';
  }

  function renderList() {
    var query = document.getElementById('sequence-search').value.toLowerCase().trim();
    var category = document.getElementById('sequence-category').value;
    var filtered = sequences.filter(function (item) {
      return (!category || item.category === category) && (!query || (item.name + ' ' + item.description).toLowerCase().indexOf(query) !== -1);
    });
    document.getElementById('sequence-list').innerHTML = filtered.length ? filtered.map(card).join('') : '<p class="panel muted">No hay secuencias con esos filtros.</p>';
    document.querySelectorAll('.sequence-select').forEach(function (button) {
      button.addEventListener('click', function () { selectSequence(sequences.find(function (item) { return item.code === button.dataset.code; })); });
    });
  }

  function selectSequence(item) {
    activeSequence = item;
    document.getElementById('sequence-active').innerHTML = '<p class="section-kicker">SECUENCIA ACTIVA</p><h2>' + item.name + '</h2><strong class="sequence-code">' + item.code + '</strong><p class="muted">Lee los números lentamente o úsalos como un punto de atención durante una pausa.</p><div class="sequence-tools"><button type="button" id="copy-sequence">Copiar</button><button type="button" id="start-sequence">Iniciar 60 s</button></div><p id="sequence-timer" class="sequence-timer" aria-live="polite">Listo para comenzar</p><label for="sequence-note">Reflexión<textarea id="sequence-note" rows="3" placeholder="¿Qué observaste en esta pausa?"></textarea></label><button type="button" id="save-sequence">Guardar reflexión</button></div>';
    document.getElementById('copy-sequence').addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText(item.code);
      this.textContent = 'Copiada';
    });
    document.getElementById('start-sequence').addEventListener('click', startTimer);
    document.getElementById('save-sequence').addEventListener('click', saveReflection);
  }

  function startTimer() {
    window.clearInterval(timer);
    remaining = 60;
    var output = document.getElementById('sequence-timer');
    output.textContent = '01:00';
    timer = window.setInterval(function () {
      remaining -= 1;
      output.textContent = remaining > 0 ? '00:' + String(remaining).padStart(2, '0') : 'Pausa completada';
      if (remaining <= 0) window.clearInterval(timer);
    }, 1000);
  }

  function saveReflection() {
    if (!activeSequence) return;
    var data = {};
    try { data = JSON.parse(localStorage.getItem('your-life-data') || '{}'); } catch (error) {}
    data.sequenceReflections = data.sequenceReflections || [];
    data.sequenceReflections.push({ code: activeSequence.code, name: activeSequence.name, note: document.getElementById('sequence-note').value.trim(), date: new Date().toISOString() });
    localStorage.setItem('your-life-data', JSON.stringify(data));
    document.getElementById('save-sequence').textContent = 'Reflexión guardada';
  }

  app.innerHTML = '<header class="view-header"><p class="eyebrow">✦ PRÁCTICA DE ATENCIÓN ✦</p><h1>Secuencias numéricas</h1><p class="subtitle">Usa los números como una pausa de concentración, intención y escritura personal.</p></header>' +
    '<section class="panel context-panel"><p class="section-kicker">CONTEXTO Y LÍMITES</p><p class="muted">Estas secuencias circulan en prácticas esotéricas contemporáneas asociadas a Grabovoi. No hay evidencia científica de que produzcan efectos físicos, curen enfermedades o atraigan dinero. Aquí se ofrecen únicamente como símbolos para enfocar la atención y registrar una reflexión.</p></section>' +
    '<section class="sequence-filters"><label for="sequence-search">Buscar <input id="sequence-search" type="search" placeholder="Ej. calma, creatividad..."></label><label for="sequence-category">Categoría <select id="sequence-category"><option value="">Todas</option><option value="bienestar">Bienestar</option><option value="enfoque">Enfoque</option><option value="reflexion">Reflexión</option><option value="habitos">Hábitos</option></select></label></section>' +
    '<section id="sequence-list" class="sequence-grid"></section>' +
    '<section id="sequence-active" class="panel sequence-active"><p class="muted">Selecciona una secuencia para comenzar.</p></section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">CONTINÚA EXPLORANDO</p><div class="esoteric-actions"><a class="button" href="numerologia.html">Ver numerología</a><a class="button secondary" href="tarot.html">Abrir Tarot</a><a class="button secondary" href="cabala.html">Árbol de la Vida</a></div></section>' +
    '<footer><p>Privado por diseño · Las reflexiones se guardan únicamente en tu navegador.</p></footer>';
  document.getElementById('sequence-search').addEventListener('input', renderList);
  document.getElementById('sequence-category').addEventListener('change', renderList);
  renderList();
})();