(function () {
  'use strict';

  var chart = document.querySelector('.chart');
  if (!chart) return;

  var unit = document.body.dataset.unit || document.documentElement.dataset.unit || 'weeks';
  var count = Number(chart.dataset.itemCount || 0);
  var storageKey = 'your-life-data';
  var data = loadData();
  var selectedIndex = null;
  var elements = {
    month: document.getElementById('month'), day: document.getElementById('day'), year: document.getElementById('year'),
    lifeExpectancy: document.getElementById('life-expectancy'), remainingMode: document.getElementById('remaining-mode'),
    stats: document.querySelector('.stats'), detail: document.querySelector('.period-detail'),
    eventForm: document.querySelector('.event-form'), eventList: document.querySelector('.event-list'),
    goalForm: document.querySelector('.goal-form'), goalList: document.querySelector('.goal-list'), theme: document.getElementById('theme'),
    exportButton: document.getElementById('export-data'), importInput: document.getElementById('import-data'), clearButton: document.getElementById('clear-data')
  };

  function defaultData() { return { dob: null, lifeExpectancy: 80, mode: 'lived', theme: 'light', notes: {}, events: [], goals: [] }; }
  function loadData() {
    try {
      var stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
      var base = defaultData();
      if (stored && stored.dob) return Object.assign(base, stored);
      var pData = JSON.parse(localStorage.getItem('portal_data') || 'null');
      if (pData && pData.d && pData.m !== undefined && pData.y) {
        base.dob = { month: parseInt(pData.m, 10), day: parseInt(pData.d, 10), year: parseInt(pData.y, 10) };
        return Object.assign(base, stored || {});
      }
      var legacy = JSON.parse(localStorage.getItem('DOB') || 'null');
      return Object.assign(base, legacy ? { dob: legacy } : {}, stored || {});
    } catch (error) { return defaultData(); }
  }
  function save() { localStorage.setItem(storageKey, JSON.stringify(data)); }
  function number(value) { return Number(value).toLocaleString(); }
  function label(value) { var names = { years: ['año', 'años'], months: ['mes', 'meses'], weeks: ['semana', 'semanas'] }; return value === 1 ? names[unit][0] : names[unit][1]; }
  function birthDate() {
    if (!data.dob) return null;
    var date = new Date(data.dob.year, data.dob.month, data.dob.day);
    return date.getFullYear() === Number(data.dob.year) && date.getMonth() === Number(data.dob.month) && date.getDate() === Number(data.dob.day) ? date : null;
  }
  function elapsed() {
    var birth = birthDate(), now = new Date();
    if (!birth || birth > now) return 0;
    if (unit === 'years') return now.getFullYear() - birth.getFullYear() - ((now.getMonth() < birth.getMonth() || now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) ? 1 : 0);
    if (unit === 'months') return Math.max(0, (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth() - (now.getDate() < birth.getDate() ? 1 : 0));
    return Math.floor((now - birth) / 604800000);
  }
  function dateFromPeriod(index) {
    var birth = birthDate(); if (!birth) return null;
    var date = new Date(birth);
    if (unit === 'years') date.setFullYear(date.getFullYear() + index);
    if (unit === 'months') date.setMonth(date.getMonth() + index);
    if (unit === 'weeks') date.setDate(date.getDate() + index * 7);
    return date;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, function (character) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]; }); }

  function getChartCount() {
    var exp = Number(data.lifeExpectancy || 80);
    if (unit === 'years') return Math.max(100, exp);
    if (unit === 'months') return exp * 12;
    return exp * 52;
  }

  function createChart() {
    chart.innerHTML = '';
    var totalCount = getChartCount();
    for (var index = 0; index < totalCount; index++) {
      var item = document.createElement('li'); item.dataset.index = index; item.tabIndex = 0; item.setAttribute('role', 'button');
      item.setAttribute('aria-label', label(index + 1) + ' ' + (index + 1)); item.addEventListener('click', selectPeriod);
      item.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') selectPeriod.call(this, event); }); chart.appendChild(item);
    }
  }
  function renderChartMeta() {
    var heading = document.querySelector('.chart-heading h2');
    if (!heading) return;
    var exp = Number(data.lifeExpectancy || 80);
    var total = exp * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52);
    var meta = document.createElement('small');
    meta.className = 'chart-order';
    var currentMeta = heading.parentNode.querySelector('.chart-order');
    if (currentMeta) meta = currentMeta;
    meta.textContent = 'Perspectiva basada en ' + exp + ' años de vida (' + total.toLocaleString() + ' ' + (total === 1 ? label(1) : label(2)) + ' totales)';
    heading.parentNode.appendChild(meta);
  }
  function selectPeriod(event) { var target = event.currentTarget || this; selectedIndex = Number(target.dataset.index); renderDetail(); }
  function repaint() {
    var lived = elapsed(), total = Number(data.lifeExpectancy || 80) * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52);
    chart.classList.toggle('focus-remaining', data.mode === 'remaining');
    Array.prototype.forEach.call(chart.children, function (item, index) {
      item.className = index >= total ? 'is-beyond' : index < lived ? 'is-lived' : 'is-remaining';
      if (data.events.some(function (entry) { return entry.index === index; })) item.classList.add('has-event');
      if (data.goals.some(function (entry) { return entry.index === index; })) item.classList.add('has-goal');
      item.title = data.notes[index] || (dateFromPeriod(index) ? dateFromPeriod(index).toLocaleDateString() : '');
    });
    renderChartMeta();
    renderStats(lived, total); renderDetail();
  }
  function renderStats(lived, total) {
    if (!elements.stats) return;
    var exp = Number(data.lifeExpectancy || 80);
    var remaining = Math.max(0, total - lived), birth = birthDate(), age = birth ? Math.floor((new Date() - birth) / 31557600000) : 0;
    var percent = total ? Math.min(100, lived / total * 100) : 0;
    var nextBirthday = birth ? new Date(new Date().getFullYear(), birth.getMonth(), birth.getDate()) : null;
    if (nextBirthday && nextBirthday < new Date()) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    var birthdayDays = nextBirthday ? Math.ceil((nextBirthday - new Date()) / 86400000) : 0;
    elements.stats.innerHTML = '<article class="stat-lived"><p class="stat-kicker">TIEMPO VIVIDO</p><strong>' + number(lived) + ' ' + label(lived) + '</strong><span>' + percent.toFixed(1) + '% completado</span></article>' +
      '<article class="stat-progress-box"><div class="stat-bar-track"><div class="stat-bar-fill" style="width:' + percent.toFixed(1) + '%"></div></div><span class="stat-bar-label">' + age + ' años cumplidos · ' + birthdayDays + ' días para tu próximo cumpleaños</span></article>' +
      '<article class="stat-remaining"><p class="stat-kicker">RESTANTE (META: ' + exp + ' AÑOS)</p><strong>' + number(remaining) + ' ' + label(remaining) + '</strong><span>' + (100 - percent).toFixed(1) + '% por vivir</span></article>';
  }
  function renderDateCalculator() {
    if (document.querySelector('.date-calculator')) return;
    var panel = document.createElement('section');
    panel.className = 'panel date-calculator';
    panel.innerHTML = '<div><p class="section-kicker">FECHA OBJETIVO</p><h2>¿Cuánto tiempo te quedaría ese día?</h2><p class="muted">Calcula tu tiempo estimado restante en una fecha concreta.</p></div><label>Fecha <input class="target-date" type="date"></label><div class="target-result" aria-live="polite"><span>Elige una fecha para calcular.</span></div>';
    var chartWrap = document.querySelector('.chart-wrap');
    if (chartWrap) {
      chartWrap.parentNode.insertBefore(panel, chartWrap.nextSibling);
    } else {
      var stats = document.querySelector('.stats');
      if (stats) stats.parentNode.insertBefore(panel, stats.nextSibling);
    }
    var target = panel.querySelector('.target-date');
    var result = panel.querySelector('.target-result');
    target.value = new Date().toISOString().slice(0, 10);
    target.addEventListener('change', function () {
      var birth = birthDate(), targetDate = new Date(this.value + 'T12:00:00');
      if (!birth || isNaN(targetDate) || targetDate < birth) { result.innerHTML = '<span>Elige una fecha posterior a tu nacimiento.</span>'; return; }
      var expectedEnd = new Date(birth); expectedEnd.setFullYear(expectedEnd.getFullYear() + Number(data.lifeExpectancy || 80));
      var remainingDays = Math.max(0, Math.floor((expectedEnd - targetDate) / 86400000));
      var targetAge = exactBetween(birth, targetDate);
      result.innerHTML = '<strong>' + targetAge.years + ' años, ' + targetAge.months + ' meses y ' + targetAge.days + ' días vividos</strong><span>' + formatDuration(remainingDays) + ' estimados restantes según una vida de ' + data.lifeExpectancy + ' años</span><small>Fecha estimada de referencia: ' + expectedEnd.toLocaleDateString() + '</small>';
    });
    target.dispatchEvent(new Event('change'));
  }
  function exactBetween(start, end) { var years = end.getFullYear() - start.getFullYear(), months = end.getMonth() - start.getMonth(), days = end.getDate() - start.getDate(); if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); } if (months < 0) { years--; months += 12; } return { years: years, months: months, days: days }; }
  function formatDuration(days) { var years = Math.floor(days / 365.25), months = Math.floor(days % 365.25 / 30.4375), rest = Math.floor(days % 30.4375); return years + ' ' + (years === 1 ? 'año' : 'años') + ', ' + months + ' ' + (months === 1 ? 'mes' : 'meses') + ' y ' + rest + ' ' + (rest === 1 ? 'día' : 'días'); }
  function renderDetail() {
    if (!elements.detail || selectedIndex === null) return;
    var date = dateFromPeriod(selectedIndex), note = data.notes[selectedIndex] || '';
    var event = data.events.find(function (entry) { return entry.index === selectedIndex; }); var goal = data.goals.find(function (entry) { return entry.index === selectedIndex; });
    elements.detail.innerHTML = '<h3>' + label(selectedIndex + 1) + ' ' + (selectedIndex + 1) + '</h3><p>' + (date ? date.toLocaleDateString() : 'Enter your birth date') + '</p>' +
      '<label>Reflexión<textarea id="period-note" placeholder="Escribe un recuerdo o una reflexión...">' + escapeHtml(note) + '</textarea></label><button type="button" class="save-note">Guardar nota</button>' +
      (event ? '<p class="tag event-tag">Evento: ' + escapeHtml(event.title) + '</p>' : '') + (goal ? '<p class="tag goal-tag">Meta: ' + escapeHtml(goal.title) + '</p>' : '');
    elements.detail.querySelector('.save-note').addEventListener('click', function () { var value = document.getElementById('period-note').value.trim(); if (value) data.notes[selectedIndex] = value; else delete data.notes[selectedIndex]; save(); repaint(); });
  }
  function renderList(element, values, type) {
    if (!element) return;
    element.innerHTML = values.length ? values.map(function (entry, index) { return '<li><span>' + escapeHtml(entry.title) + '</span><small>' + label(entry.index + 1) + ' ' + (entry.index + 1) + '</small><button type="button" data-index="' + index + '">Eliminar</button></li>'; }).join('') : '<li class="empty">Todavía no hay elementos.</li>';
    Array.prototype.forEach.call(element.querySelectorAll('button'), function (button) { button.addEventListener('click', function () { data[type].splice(Number(button.dataset.index), 1); save(); renderLists(); repaint(); }); });
  }
  function renderLists() { renderList(elements.eventList, data.events, 'events'); renderList(elements.goalList, data.goals, 'goals'); }
  function addEntry(form, collection) { if (!form) return; form.addEventListener('submit', function (event) { event.preventDefault(); var title = form.querySelector('[name="title"]').value.trim(); var index = Number(form.querySelector('[name="index"]').value) - 1; if (!title || index < 0 || index >= count) return; data[collection].push({ title: title, index: index }); form.reset(); save(); renderLists(); repaint(); }); }
  function updateDOB() {
    var month = Number(elements.month.value), day = Number(elements.day.value), year = Number(elements.year.value), candidate = new Date(year, month, day);
    if (year && elements.month.value !== '' && day && candidate.getFullYear() === year && candidate.getMonth() === month && candidate.getDate() === day && candidate <= new Date()) { data.dob = { month: month, day: day, year: year }; save(); repaint(); }
  }
  function loadDOB() { if (data.dob) { elements.month.value = data.dob.month; elements.day.value = data.dob.day; elements.year.value = data.dob.year; } }
  function applyTheme() { document.body.dataset.theme = data.theme; document.documentElement.style.setProperty('--accent', data.accent || '#d94b4b'); }
  function exportData() { var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }), link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'your-life-data.json'; link.click(); URL.revokeObjectURL(link.href); }
  function importData(event) { var file = event.target.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function () { try { data = Object.assign(defaultData(), JSON.parse(reader.result)); save(); location.reload(); } catch (error) { window.alert('The selected file is not valid.'); } }; reader.readAsText(file); }
  function bindControls() {
    var unitbox = document.getElementById('unitbox');
    if (unitbox) unitbox.addEventListener('change', function () { window.location = this.value + '.html'; });
    ['month', 'day', 'year'].forEach(function (key) { if (elements[key]) elements[key].addEventListener('input', updateDOB); });
    if (elements.lifeExpectancy) { elements.lifeExpectancy.value = data.lifeExpectancy; elements.lifeExpectancy.addEventListener('change', function () { data.lifeExpectancy = Math.max(1, Number(this.value) || 80); save(); repaint(); }); }
    if (elements.remainingMode) { elements.remainingMode.checked = data.mode === 'remaining'; elements.remainingMode.addEventListener('change', function () { data.mode = this.checked ? 'remaining' : 'lived'; save(); repaint(); }); }
    if (elements.theme) { elements.theme.value = data.theme; elements.theme.addEventListener('change', function () { data.theme = this.value; applyTheme(); save(); }); }
    addEntry(elements.eventForm, 'events'); addEntry(elements.goalForm, 'goals');
    if (elements.exportButton) elements.exportButton.addEventListener('click', exportData);
    if (elements.importInput) elements.importInput.addEventListener('change', importData);
    if (elements.clearButton) elements.clearButton.addEventListener('click', function () { if (window.confirm('Clear all saved data?')) { localStorage.removeItem(storageKey); location.reload(); } });
  }

  function getUserName() {
    try {
      var pData = JSON.parse(localStorage.getItem('portal_data') || 'null');
      if (pData && pData.n) {
        return (pData.n + (pData.s ? ' ' + pData.s : '')).trim();
      }
      var yData = JSON.parse(localStorage.getItem('your-life-data') || 'null');
      if (yData && yData.userName) return yData.userName.trim();
    } catch(e) {}
    return '';
  }

  function updatePrintTitles() {
    var userName = getUserName();
    var exp = Number(data.lifeExpectancy || 80);
    var total = exp * (unit === 'years' ? 1 : unit === 'months' ? 12 : 52);
    var unitLabels = { weeks: 'Semanas', months: 'Meses', years: 'Años' };
    var unitKey = unitLabels[unit] || 'Tiempo';
    var totalFormatted = total.toLocaleString() + ' ' + unitKey;

    var lived = elapsed();
    var remaining = Math.max(0, total - lived);
    var percent = total ? Math.min(100, lived / total * 100) : 0;

    var titleBox = document.querySelector('.title-box');
    if (titleBox) {
      var printTitleEl = document.getElementById('print-user-title');
      if (!printTitleEl) {
        printTitleEl = document.createElement('h1');
        printTitleEl.id = 'print-user-title';
        printTitleEl.className = 'print-title';
        titleBox.appendChild(printTitleEl);
      }
      var nameStr = userName ? ('La Vida de ' + userName) : 'Mapa de Vida';
      var metaDetails = unit === 'years' 
        ? (totalFormatted.toUpperCase() + ' DE EXISTENCIA')
        : (totalFormatted.toUpperCase() + ' · ' + exp + ' AÑOS DE EXISTENCIA');

      printTitleEl.innerHTML = 
        '<span class="print-kicker">✦ MEMENTO TEMPORIS · MAPA DE VIDA ✦</span>' +
        '<span class="print-name">' + esc(nameStr) + '</span>' +
        '<span class="print-meta">' + esc(metaDetails) + '</span>';

      var livedWord = unit === 'weeks' ? 'vividas' : 'vividos';
      var subtitle = titleBox.querySelector('.subtitle');
      if (subtitle) {
        subtitle.innerHTML = 
          '<span class="print-stat print-stat-lived"><strong>' + lived.toLocaleString() + ' ' + label(lived) + ' ' + livedWord + '</strong> (' + percent.toFixed(1) + '%)</span>' +
          '<span class="print-stat-dot">·</span>' +
          '<span class="print-stat print-stat-remaining"><strong>' + remaining.toLocaleString() + ' ' + label(remaining) + ' restantes</strong> (' + (100 - percent).toFixed(1) + '%)</span>';
      }
    }
  }

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character];
    });
  }

  function triggerPrint() {
    var userName = getUserName();
    var exp = Number(data.lifeExpectancy || 80);
    var unitLabels = { weeks: 'Semanas', months: 'Meses', years: 'Años' };
    var originalTitle = document.title;
    var safeName = (userName || 'Tu-Vida').replace(/\s+/g, '-');
    document.title = 'Lamina-De-Vida-' + safeName + '-' + exp + 'Anos-' + (unitLabels[unit] || unit);
    window.print();
    setTimeout(function () {
      document.title = originalTitle;
    }, 1500);
  }
  window.triggerPrintPoster = triggerPrint;

  function setupPrintMode() {
    updatePrintTitles();

    var quickExp = document.getElementById('quick-expectancy');
    if (quickExp) {
      quickExp.value = String(data.lifeExpectancy || 80);
      quickExp.addEventListener('change', function () {
        data.lifeExpectancy = Math.max(1, Number(this.value) || 80);
        save();
        createChart();
        repaint();
        updatePrintTitles();
      });
    }

    var printBtns = document.querySelectorAll('.print-poster-btn');
    printBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (e) e.preventDefault();
        triggerPrint();
      });
    });
  }

  createChart(); renderChartMeta(); loadDOB(); applyTheme(); bindControls(); renderLists(); repaint(); renderDateCalculator(); setupPrintMode();
  var brandEyebrow = document.querySelector('.title-box .eyebrow');
  if (brandEyebrow) brandEyebrow.textContent = 'MAPA DE VIDA / MAPA PERSONAL';
  loadGuide();
  function loadGuide() { var script = document.createElement('script'); script.src = 'guide.js'; document.body.appendChild(script); }
})();
