(function () {
  'use strict';
  var sequences = [
    { name: 'Calma absoluta', category: 'bienestar', code: '519 7148', intro: 'Una secuencia para acompañar una pausa consciente y volver a la respiración.', details: { significado: 'Esta vibración numérica funciona como un ancla en medio de la tormenta. Te recuerda que el estrés y el pánico son ilusiones temporales creadas por tu mente. Al recitar este código, estás invocando una frecuencia de paz inquebrantable, obligando a tu sistema nervioso a apagar la señal de alarma y a tu alma a regresar a su estado natural de equilibrio perfecto.', mantra: '"Suelto todo miedo y tensión. En este instante, estoy a salvo y mi mente es un lago en completa calma."', accion: 'Inhala profundamente en 4 segundos, sostén por 4, y exhala en 8. Mientras exhalas, visualiza los números 5-1-9, pausa, y luego 7-1-4-8 limpiando todo tu cuerpo de estrés.' } },
    { name: 'Claridad de intención', category: 'enfoque', code: '714 273 218 93', intro: 'Un recordatorio numérico para formular con claridad el siguiente paso.', details: { significado: 'La confusión es solo falta de datos o exceso de ruido. Esta secuencia numérica corta la neblina mental y alinea tus pensamientos con tu propósito más elevado. Es como encender un faro en la noche oscura: de pronto, lo que debes hacer se vuelve dolorosamente obvio y la duda se desvanece por completo.', mantra: '"Mi visión es nítida, mis decisiones son exactas y el universo conspira a favor de mis intenciones claras."', accion: 'Escribe en un papel exactamente qué quieres resolver. Luego, escribe esta secuencia debajo y léela en voz alta tres veces, imaginando que una luz dorada ilumina la respuesta en tu mente.' } },
    { name: 'Creatividad infinita', category: 'enfoque', code: '519 481 714', intro: 'Una invitación a abrir espacio para ideas, juego y expresión.', details: { significado: 'El bloqueo creativo ocurre cuando intentas forzar el río en lugar de fluir con él. Esta secuencia desbloquea tu lado lúdico, apaga al crítico interior y te conecta directamente con la fuente inagotable de genialidad. Te recuerda que tú no fabricas las ideas, solo eres un canal por el cual fluyen.', mantra: '"Soy un canal limpio y abierto. La inspiración cósmica fluye a través de mí sin esfuerzo ni resistencia."', accion: 'Rompe tu rutina. Haz algo completamente inútil y divertido durante 15 minutos mientras mantienes esta secuencia en tu mente. La solución creativa llegará cuando dejes de forzarla.' } },
    { name: 'Gratitud milagrosa', category: 'reflexion', code: '888 412 128 901', intro: 'Una señal para detenerte y nombrar algo que ya está presente.', details: { significado: 'La queja bloquea la abundancia; la gratitud la multiplica. Esta frecuencia numérica es un reseteo instantáneo de tu vibración energética. Te obliga a dejar de mirar lo que te falta y te conecta con la inmensa riqueza que ya posees. Al vibrar en gratitud, te conviertes en un imán para recibir aún más.', mantra: '"Gracias por lo que soy, gracias por lo que tengo, gracias por todo lo maravilloso que está en camino."', accion: 'Cierra los ojos y enumera tres cosas de tu vida por las que sientes un agradecimiento profundo, sintiendo la emoción en tu pecho. Luego repite la secuencia numérica.' } },
    { name: 'Confianza en el proceso', category: 'reflexion', code: '918 514 319', intro: 'Un ancla simbólica para observar la paciencia y la continuidad.', details: { significado: 'A veces quieres arrancar la planta para ver si la raíz está creciendo, y terminas matándola. Esta secuencia te inyecta paciencia absoluta y te recuerda que hay un orden divino. Todo está sucediendo en el momento exacto en el que tiene que suceder. Rendirte al proceso no es debilidad, es la máxima demostración de fe.', mantra: '"Libero el control y confío ciegamente en que el universo tiene un plan perfecto para mí."', accion: 'Cada vez que sientas ansiedad por el futuro, repite esta secuencia en tu mente y visualízate flotando en un río sereno que te lleva exactamente a donde necesitas estar, sin necesidad de nadar contra la corriente.' } },
    { name: 'Orden y manifestación', category: 'habitos', code: '481 241 918', intro: 'Una práctica de atención para elegir una tarea pequeña y completarla.', details: { significado: 'El caos exterior es un reflejo del caos interior. Esta frecuencia actúa como una escoba cósmica, estructurando tu mente y dándote la voluntad férrea de limpiar, ordenar y ejecutar. La magia no ocurre en el desorden. Al organizar tu espacio y tus tareas, estás creando el molde para materializar tus grandes sueños.', mantra: '"Mi mente está estructurada, mi entorno es armónico y mi disciplina es inquebrantable."', accion: 'Elige una sola tarea que has estado postergando (limpiar un cajón, enviar un correo). Concéntrate en la secuencia y ejecuta la tarea de inmediato, sin pensar. Siente el poder de la acción completada.' } }
  ];
  var app = document.getElementById('sequences-app');
  var activeSequence = null;
  var timer = null;
  var remaining = 0;

  function slugify(text) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function card(item) {
    var slug = slugify(item.name);
    return '<article class="tarot-card sequence-card">' +
      '<div class="card-image-wrap sequence-image-wrap tarot-image-wrap"><img src="images/secuencias/secuencia-' + slug + '.jpg" alt="' + item.name + '" class="card-image tarot-img" onerror="this.parentElement.style.display=\'none\'"></div>' +
      '<div class="tarot-content-wrap"><p class="section-kicker">' + item.category.toUpperCase() + '</p><h2>' + item.name + '</h2><strong class="sequence-code" style="color: var(--accent); font: 500 1.4rem \'DM Mono\', monospace; margin-bottom: 16px; display: block;">' + item.code + '</strong>' +
      '<div class="tarot-details"><h3>✦ La Vibración Numérica</h3><p>' + item.details.significado + '</p><h3>✦ El Mantra</h3><p><em>' + item.details.mantra + '</em></p><h3>✦ Acción Inmediata</h3><p>' + item.details.accion + '</p></div>' +
      '<button type="button" class="sequence-select" data-code="' + item.code + '" aria-label="Practicar ' + item.name + '">Practicar esta secuencia</button></div></article>';
  }

  function renderList() {
    var query = document.getElementById('sequence-search').value.toLowerCase().trim();
    var category = document.getElementById('sequence-category').value;
    var filtered = sequences.filter(function (item) {
      return (!category || item.category === category) && (!query || (item.name + ' ' + item.intro).toLowerCase().indexOf(query) !== -1);
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
    '<section id="sequence-list" class="tarot-grid"></section>' +
    '<section id="sequence-active" class="panel sequence-active"><p class="muted">Selecciona una secuencia para comenzar.</p></section>' +
    '<section class="panel esoteric-panel"><p class="section-kicker">CONTINÚA EXPLORANDO</p><div class="esoteric-actions"><a class="button" href="numerologia.html">Ver numerología</a><a class="button secondary" href="tarot.html">Abrir Tarot</a><a class="button secondary" href="cabala.html">Árbol de la Vida</a></div></section>';
  document.getElementById('sequence-search').addEventListener('input', renderList);
  document.getElementById('sequence-category').addEventListener('change', renderList);
  renderList();
})();