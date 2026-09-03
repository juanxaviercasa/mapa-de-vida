(function () {
  'use strict';
  var data = readData();
  applyCustomization();
  var view = document.body.dataset.view;
  var birth = data.dob ? new Date(data.dob.year, data.dob.month, data.dob.day) : null;
  var now = new Date();
  var unitNames = { weeks: ['semana', 'semanas'], months: ['mes', 'meses'], years: ['año', 'años'] };
  var unit = data.viewUnit || 'weeks';

  function readData() {
    try {
      var base = { dob: null, events: [], goals: [], notes: {}, lifeExpectancy: 80, userName: '', accent: '#f5c358', posterMessage: 'Tu tiempo también es una elección.' };
      var stored = JSON.parse(localStorage.getItem('your-life-data') || '{}');
      var result = Object.assign(base, stored);
      if (!result.dob) {
        var pData = JSON.parse(localStorage.getItem('portal_data') || 'null');
        if (pData && pData.d && pData.m !== undefined && pData.y) {
          result.dob = { month: parseInt(pData.m, 10), day: parseInt(pData.d, 10), year: parseInt(pData.y, 10) };
          if (pData.n && !result.userName) {
            result.userName = pData.n + (pData.s ? ' ' + pData.s : '');
          }
        }
      }
      return result;
    } catch (error) {
      return { dob: null, events: [], goals: [], notes: {}, lifeExpectancy: 80, userName: '', accent: '#f5c358', posterMessage: 'Tu tiempo también es una elección.' };
    }
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
    });
  }

  function format(date) {
    return date.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function age() {
    if (!birth) return { years: 0, months: 0, days: 0 };
    var years = now.getFullYear() - birth.getFullYear(),
        months = now.getMonth() - birth.getMonth(),
        days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years: years, months: months, days: days };
  }

  function livedDays() {
    return birth ? Math.max(0, Math.floor((now - birth) / 86400000)) : 0;
  }

  function currentPeriod() {
    if (!birth) return 0;
    if (unit === 'years') return age().years;
    if (unit === 'months') return age().years * 12 + age().months;
    return Math.floor(livedDays() / 7);
  }

  function unitLabel(value) {
    return value === 1 ? unitNames[unit][0] : unitNames[unit][1];
  }

  function periodDate(index) {
    if (!birth) return null;
    var date = new Date(birth);
    if (unit === 'years') date.setFullYear(date.getFullYear() + index);
    if (unit === 'months') date.setMonth(date.getMonth() + index);
    if (unit === 'weeks') date.setDate(date.getDate() + index * 7);
    return date;
  }

  function save() {
    localStorage.setItem('your-life-data', JSON.stringify(data));
  }

  function applyCustomization() {
    document.documentElement.style.setProperty('--accent', data.accent || '#f5c358');
    document.body.dataset.theme = data.theme || 'dark';
  }

  function shell(content, active) {
    var topbarHtml =
      '<header class="cosmic-topbar bitacora-topbar">' +
        '<div class="topbar-left">' +
          '<a class="brand-link" href="index.html">✦ MAPA DE VIDA ✦</a>' +
        '</div>' +
        '<nav class="bitacora-tabs" aria-label="Ecosistema Bitácora">' +
          '<a class="bitacora-tab ' + (active === 'dashboard' ? 'active' : '') + '" href="dashboard.html"><span class="tab-icon">📊</span><span class="tab-label">Resumen</span></a>' +
          '<a class="bitacora-tab ' + (active === 'journal' ? 'active' : '') + '" href="journal.html"><span class="tab-icon">📝</span><span class="tab-label">Diario</span></a>' +
          '<a class="bitacora-tab ' + (active === 'timeline' ? 'active' : '') + '" href="timeline.html"><span class="tab-icon">⏳</span><span class="tab-label">Línea de Vida</span></a>' +
          '<a class="bitacora-tab ' + (active === 'patterns' ? 'active' : '') + '" href="patterns.html"><span class="tab-icon">📈</span><span class="tab-label">Patrones</span></a>' +
          '<a class="bitacora-tab" href="weeks.html"><span class="tab-icon">🗓️</span><span class="tab-label">Mapas de Vida</span></a>' +
        '</nav>' +
        '<div class="topbar-right">' +
          '<a href="fecha.html" class="back-portal-btn">← Tu Oráculo</a>' +
          '<button type="button" id="cosmic-nav-toggle" class="cosmic-menu-btn" aria-label="Abrir menú de navegación">' +
            '<span class="menu-icon">☰</span> <span class="menu-text">Explorar</span>' +
          '</button>' +
        '</div>' +
      '</header>';

    var footerHtml =
      '<footer class="cosmic-footer">' +
        '<div class="footer-actions">' +
          '<button type="button" class="cosmic-menu-btn footer-explore-btn">' +
            '<span class="btn-icon">☰</span> Explorar Todas las Dimensiones' +
          '</button>' +
          '<a href="fecha.html" class="footer-back-btn">' +
            '<span>🔮</span> Ver Tu Oráculo & Identidad' +
          '</a>' +
        '</div>' +
        '<div class="footer-divider"></div>' +
        '<p class="footer-privacy">🔒 Privado por diseño · Tus datos se procesan únicamente en tu navegador</p>' +
        '<p class="footer-author">' +
          'Desarrollado con dedicación por <a href="https://juan.cabellosalirrosas.com" target="_blank" rel="noopener noreferrer">Xavier Cabello</a>' +
        '</p>' +
      '</footer>';

    var mainEl = document.querySelector('main');
    if (!mainEl) {
      mainEl = document.createElement('main');
      mainEl.className = 'app-shell';
      document.body.appendChild(mainEl);
    }
    mainEl.innerHTML = topbarHtml + '<div class="view-content-wrapper">' + content + '</div>' + footerHtml;

    // Conectar eventos del botón explorar
    var exploreBtns = document.querySelectorAll('.cosmic-menu-btn');
    exploreBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.__toggleSiteNavDrawer) {
          window.__toggleSiteNavDrawer();
        } else {
          var drawer = document.getElementById('cosmic-drawer-overlay');
          if (drawer) drawer.classList.add('is-active');
        }
      });
    });

    if (!document.getElementById('cosmic-drawer-overlay') && !document.querySelector('script[src="site-nav.js"]')) {
      var s = document.createElement('script');
      s.src = 'site-nav.js';
      document.body.appendChild(s);
    }
  }

  function header(kicker, title, description) {
    return '<header class="view-header"><p class="eyebrow">' + kicker + '</p><h1>' + title + '</h1><p class="subtitle">' + description + '</p></header>';
  }

  function metric(value, text) {
    return '<article class="metric"><strong>' + value + '</strong><span>' + text + '</span></article>';
  }

  function entries() {
    return (data.events || []).map(function (entry) {
      return Object.assign({}, entry, { type: 'Evento' });
    }).concat((data.goals || []).map(function (entry) {
      return Object.assign({}, entry, { type: 'Meta' });
    })).sort(function (a, b) {
      return a.index - b.index;
    });
  }

  function renderDashboard() {
    var a = age(),
        current = currentPeriod(),
        total = Number(data.lifeExpectancy || 80) * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52),
        upcoming = entries().filter(function (entry) { return entry.index >= current; }).sort(function (x, y) { return x.index - y.index; })[0];

    var headerHtml = header('✦ BITÁCORA Y MEMORIA PERSONAL ✦', 'Tu Cuaderno de Vida', 'Tu centro personal para custodiar recuerdos, registrar lecciones de tus semanas y contemplar la arquitectura de tu historia.');

    var statsHtml = '<section class="stats dashboard-stats">' +
      metric(a.years + 'a ' + a.months + 'm', 'Edad exacta') +
      metric(livedDays().toLocaleString('es'), 'Días vividos') +
      metric((current + 1).toLocaleString('es'), unitLabel(current + 1) + ' en curso') +
      metric(Math.max(0, total - current).toLocaleString('es'), unitLabel(Math.max(0, total - current)) + ' restantes estimadas') +
    '</section>';

    var liveHtml = '<section class="dashboard-grid">' +
      '<article class="panel now-card">' +
        '<p class="section-kicker">TIEMPO PRESENTE</p>' +
        '<h2>' + unitLabel(current + 1) + ' ' + (current + 1) + '</h2>' +
        '<p>Estás transitando este intervalo de tu vida. Dedica un momento para reflexionar y registrarlo en tu memoria.</p>' +
        '<div class="progress"><span style="width:' + Math.min(100, current / total * 100) + '%"></span></div>' +
        '<small>' + (current / total * 100).toFixed(1) + '% de una vida estimada de ' + data.lifeExpectancy + ' años</small>' +
        '<div style="margin-top: 16px;"><a href="journal.html" class="bitacora-btn">Escribir nota en Diario →</a></div>' +
      '</article>' +
      '<article class="panel next-card">' +
        '<p class="section-kicker">PRÓXIMO HITO DESTACADO</p>' +
        (upcoming ? '<h2>' + esc(upcoming.title) + '</h2><p>' + upcoming.type + ' en ' + unitLabel(upcoming.index + 1) + ' ' + (upcoming.index + 1) + '</p><div style="margin-top: 16px;"><a href="timeline.html" class="bitacora-btn">Ver Línea de Vida →</a></div>' : '<h2>Aún sin hitos registrados</h2><p>Añade metas o momentos clave para visualizar tu camino.</p><div style="margin-top: 16px;"><a href="timeline.html" class="bitacora-btn">Añadir Hito →</a></div>') +
      '</article>' +
    '</section>';

    var bentoGridHtml = '<section class="bitacora-hub-section">' +
      '<div class="hub-heading">' +
        '<p class="section-kicker">EXPLORACIÓN DE TU CUADERNO VITAL</p>' +
        '<h2>Las 4 Dimensiones de tu Bitácora</h2>' +
        '<p class="subtitle">Cada herramienta cumple una función esencial en la preservación de tu memoria y conciencia del tiempo:</p>' +
      '</div>' +
      '<div class="bitacora-grid">' +
        '<article class="bitacora-card">' +
          '<div class="card-badge">01</div>' +
          '<div class="card-icon">📝</div>' +
          '<div class="card-body">' +
            '<span class="card-category">REFLEXIÓN ÍNTIMA</span>' +
            '<h3>Tu Diario Personal</h3>' +
            '<p>Asigna reflexiones, aprendizajes y notas privadas a tu semana actual o a cualquier periodo de tu existencia.</p>' +
            '<a href="journal.html" class="bitacora-btn">Abrir Diario →</a>' +
          '</div>' +
        '</article>' +
        '<article class="bitacora-card">' +
          '<div class="card-badge">02</div>' +
          '<div class="card-icon">⏳</div>' +
          '<div class="card-body">' +
            '<span class="card-category">CRONOLOGÍA</span>' +
            '<h3>Línea de Recuerdos</h3>' +
            '<p>Una secuencia cronológica ordenada de tus viajes, momentos trascendentes y metas alcanzadas a lo largo de tus años.</p>' +
            '<a href="timeline.html" class="bitacora-btn">Ver Cronología →</a>' +
          '</div>' +
        '</article>' +
        '<article class="bitacora-card">' +
          '<div class="card-badge">03</div>' +
          '<div class="card-icon">📈</div>' +
          '<div class="card-body">' +
            '<span class="card-category">MAPA DE CALOR</span>' +
            '<h3>Patrones de Vida</h3>' +
            '<p>Descubre el ritmo y la densidad de tus vivencias registradas, identificando etapas de gran actividad y transformación.</p>' +
            '<a href="patterns.html" class="bitacora-btn">Explorar Patrones →</a>' +
          '</div>' +
        '</article>' +
        '<article class="bitacora-card">' +
          '<div class="card-badge">04</div>' +
          '<div class="card-icon">🖨️</div>' +
          '<div class="card-body">' +
            '<span class="card-category">LÁMINA DE ARTE IMPRIMIBLE</span>' +
            '<h3>Mapas de Vida Imprimibles</h3>' +
            '<p>Genera una composición artística en semanas, meses o años con tu tiempo vivido y restante, lista para imprimir o guardar en PDF.</p>' +
            '<a href="weeks.html" class="bitacora-btn">Ver Lámina Imprimible →</a>' +
          '</div>' +
        '</article>' +
      '</div>' +
    '</section>';

    shell(headerHtml + statsHtml + liveHtml + bentoGridHtml, 'dashboard');
  }

  function renderTimeline() {
    var list = entries();
    shell(header('✦ CRONOLOGÍA VITAL ✦', 'Línea de Recuerdos', 'Una lectura cronológica de eventos significativos, viajes y metas guardados en tu bitácora.') +
      '<section class="panel timeline-panel"><ol class="timeline full-timeline">' +
      (list.length ? list.map(function (entry) {
        var date = periodDate(entry.index);
        return '<li><div><strong>' + esc(entry.title) + '</strong><span class="tag ' + entry.type.toLowerCase() + '-tag">' + entry.type + '</span></div><span>' + unitLabel(entry.index + 1) + ' ' + (entry.index + 1) + (date ? ' · ' + format(date) : '') + '</span></li>';
      }).join('') : '<li class="muted" style="padding: 24px 0; text-align: center;">Todavía no hay eventos ni metas registradas. Empieza añadiendo tu primer recuerdo desde cualquiera de los mapas temporales o tu diario.</li>') +
      '</ol></section>', 'timeline');
  }

  function renderJournal() {
    var keys = Object.keys(data.notes || {}).sort(function (a, b) { return Number(a) - Number(b); });
    shell(header('✦ REGISTRO VITAL ✦', 'Tu Diario Personal', 'Escribe lo que aprendiste y sentiste en cada semana. Tus reflexiones se guardan de forma privada y segura en tu navegador.') +
      '<section class="panel journal-panel">' +
      '<div class="journal-form">' +
      '<label>Periodo (' + unitLabel(1) + ') <input id="journal-index" type="number" min="1" value="' + (currentPeriod() + 1) + '"></label>' +
      '<label>Tu Reflexión o Aprendizaje <textarea id="journal-note" placeholder="¿Qué quieres recordar de este momento de tu vida?"></textarea></label>' +
      '<button id="save-journal" type="button" class="bitacora-btn" style="width: 100%; justify-content: center;">Guardar Reflexión</button>' +
      '</div>' +
      '<div class="journal-list">' +
      (keys.length ? keys.map(function (key) {
        return '<article><p class="section-kicker">' + unitLabel(Number(key) + 1) + ' ' + (Number(key) + 1) + '</p><p>' + esc(data.notes[key]) + '</p><div class="note-actions"><button type="button" data-note="' + key + '" class="bitacora-btn" style="padding: 4px 10px; font-size: 0.75rem;">Editar</button> <button type="button" data-delete-note="' + key + '" class="bitacora-btn" style="padding: 4px 10px; font-size: 0.75rem; border-color: rgba(239, 68, 68, 0.4); color: #f87171;">Eliminar</button></div></article>';
      }).join('') : '<p class="muted" style="padding: 20px 0;">Tu diario está vacío. Empieza escribiendo una reflexión sobre tu semana actual.</p>') +
      '</div></section>', 'journal');

    document.getElementById('save-journal').addEventListener('click', function () {
      var index = Number(document.getElementById('journal-index').value) - 1, note = document.getElementById('journal-note').value.trim();
      if (index >= 0 && note) {
        data.notes[index] = note;
        save();
        renderJournal();
      }
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-note]'), function (button) {
      button.addEventListener('click', function () {
        document.getElementById('journal-index').value = Number(button.dataset.note) + 1;
        document.getElementById('journal-note').value = data.notes[button.dataset.note];
        window.scrollTo(0, 0);
      });
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-delete-note]'), function (button) {
      button.addEventListener('click', function () {
        delete data.notes[button.dataset.deleteNote];
        save();
        renderJournal();
      });
    });
  }

  function renderPatterns() {
    var total = Number(data.lifeExpectancy || 80) * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52),
        current = currentPeriod(),
        events = data.events || [],
        goals = data.goals || [],
        notes = Object.keys(data.notes || {}).length;

    shell(header('✦ MAPA DE CALOR ✦', 'Patrones de Vida', 'Una lectura visual de la densidad, intención y ritmos de los momentos que has registrado a lo largo del tiempo.') +
      '<section class="stats dashboard-stats">' +
      metric(events.length, 'Eventos marcados') +
      metric(goals.length, 'Metas marcadas') +
      metric(notes, 'Reflexiones escritas') +
      metric(Math.round(current / Math.max(1, total) * 100) + '%', 'Vida recorrida') +
      '</section>' +
      '<section class="panel pattern-panel">' +
      '<p class="section-kicker">DENSIDAD PERSONAL</p>' +
      '<div class="pattern-grid">' +
      Array.from({ length: Math.min(total, 520) }, function (_, index) {
        var classes = index < current ? 'lived' : 'open';
        if (events.some(function (item) { return item.index === index; })) classes += ' event';
        if (goals.some(function (item) { return item.index === index; })) classes += ' goal';
        if (data.notes[index]) classes += ' note';
        return '<span class="pattern-cell ' + classes + '" title="' + unitLabel(index + 1) + ' ' + (index + 1) + '"></span>';
      }).join('') +
      '</div>' +
      '<div class="pattern-legend"><span class="lived-dot"></span>Vivido <span class="event-dot"></span>Evento <span class="goal-dot"></span>Meta <span class="note-dot"></span>Reflexión</div>' +
      '</section>' +
      '<section class="panel" style="margin-top: 20px;">' +
      '<p class="section-kicker">INTERPRETACIÓN</p>' +
      '<h2>' + (notes > 0 ? 'Ya estás construyendo una memoria de tu recorrido vital.' : 'El siguiente patrón puede comenzar con una sola reflexión en tu diario.') + '</h2>' +
      '<p class="muted">Los matices reflejan tu actividad registrada, ayudándote a visualizar periodos de calma y etapas de gran transformación.</p>' +
      '</section>', 'patterns');
  }

  function renderPoster() {
    shell(header('✦ ARTE PERSONAL ✦', 'Tu Póster de Vida', 'Personaliza esta composición artística con tu nombre y contempla tu paso por el tiempo en una pieza lista para imprimir.') +
      '<section class="panel poster-settings">' +
      '<label>Nombre o Título <input id="poster-name" value="' + esc(data.userName || '') + '" placeholder="Ej. La vida de Ana"></label>' +
      '<label>Color de Acento <input id="poster-accent" type="color" value="' + esc(data.accent || '#f5c358') + '"></label>' +
      '<label>Frase Final <input id="poster-message" value="' + esc(data.posterMessage || '') + '" placeholder="Una frase para recordar"></label>' +
      '<button id="save-poster-settings" type="button" class="bitacora-btn">Aplicar Cambios</button>' +
      '</section>' +
      '<section class="poster panel">' +
      '<p class="eyebrow">MAPA DE VIDA / ' + unit.toUpperCase() + '</p>' +
      '<h1>' + esc(data.userName || 'Tu vida') + ' en ' + unitNames[unit][1] + '.</h1>' +
      '<p class="poster-age">' + age().years + ' años vividos · ' + livedDays().toLocaleString('es') + ' días</p>' +
      '<div class="poster-grid">' +
      Array.from({ length: Math.min(520, Number(data.lifeExpectancy || 80) * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52)) }, function (_, index) {
        return '<i class="' + (index < currentPeriod() ? 'filled' : '') + '"></i>';
      }).join('') +
      '</div>' +
      '<p class="poster-foot">' + new Date().getFullYear() + ' · ' + esc(data.posterMessage || 'Tu tiempo también es una elección.') + '</p>' +
      '</section>' +
      '<div class="print-controls" style="text-align: center; margin-top: 24px;">' +
      '<button type="button" onclick="window.print()" class="bitacora-btn" style="padding: 12px 28px; font-size: 0.95rem;">Guardar como PDF / Imprimir Póster</button>' +
      '</div>', 'poster');
    bindPosterSettings();
  }

  function bindPosterSettings() {
    var saveBtn = document.getElementById('save-poster-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        data.userName = document.getElementById('poster-name').value.trim();
        data.accent = document.getElementById('poster-accent').value;
        data.posterMessage = document.getElementById('poster-message').value.trim();
        save();
        applyCustomization();
        renderPoster();
      });
    }
  }

  function renderCompare() {
    shell(header('✦ DISTANCIA TEMPORAL ✦', 'Comparador de Vidas', 'Compara edades, cumpleaños y distancia de tiempo entre dos existencias.') +
      '<section class="panel compare-form">' +
      '<label>Primera fecha <input id="compare-a" type="date"></label>' +
      '<label>Segunda fecha <input id="compare-b" type="date"></label>' +
      '<button id="compare-go" type="button" class="bitacora-btn">Comparar</button>' +
      '</section>' +
      '<section id="compare-output" class="stats compare-stats dashboard-stats"><p class="muted" style="padding: 20px;">Elige dos fechas para ver la distancia temporal.</p></section>', 'compare');

    if (birth) {
      var dStr = birth.getFullYear() + '-' + String(birth.getMonth() + 1).padStart(2, '0') + '-' + String(birth.getDate()).padStart(2, '0');
      var compA = document.getElementById('compare-a');
      if (compA) compA.value = dStr;
    }

    var compBtn = document.getElementById('compare-go');
    if (compBtn) {
      compBtn.addEventListener('click', function () {
        var a = new Date(document.getElementById('compare-a').value + 'T12:00:00'),
            b = new Date(document.getElementById('compare-b').value + 'T12:00:00');
        if (isNaN(a) || isNaN(b)) return;
        var diff = Math.abs(Math.floor((b - a) / 86400000));
        document.getElementById('compare-output').innerHTML =
          metric(diff.toLocaleString('es'), 'Días de distancia') +
          metric(Math.floor(diff / 7).toLocaleString('es'), 'Semanas de distancia') +
          metric(Math.floor(diff / 365.2425).toLocaleString('es'), 'Años aproximados') +
          metric(format(a), 'Primera fecha');
      });
    }
  }

  if (view === 'dashboard') renderDashboard();
  if (view === 'timeline') renderTimeline();
  if (view === 'journal') renderJournal();
  if (view === 'patterns') renderPatterns();
  if (view === 'poster') renderPoster();
  if (view === 'compare') renderCompare();
  loadGuide();

  function loadGuide() {
    var script = document.createElement('script');
    script.src = 'guide.js';
    document.body.appendChild(script);
  }
})();
