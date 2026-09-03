(function () {
  'use strict';
  var data = readData();
  var first = document.getElementById('person-name'), surname = document.getElementById('person-surname'), form = document.getElementById('name-form'), output = document.getElementById('name-output');
  if (!form) return;
  if (data.userName) first.value = data.userName;
  if (data.userSurname) surname.value = data.userSurname;
  form.addEventListener('submit', function (event) { event.preventDefault(); var firstValue = first.value.trim(), surnameValue = surname.value.trim(); data.userName = firstValue; data.userSurname = surnameValue; localStorage.setItem('your-life-data', JSON.stringify(data)); lookup(firstValue, 'nombre'); lookup(surnameValue, 'apellido'); });
  if (first.value || surname.value) { lookup(first.value.trim(), 'nombre'); lookup(surname.value.trim(), 'apellido'); }
  function readData() { try { return JSON.parse(localStorage.getItem('your-life-data') || '{}'); } catch (error) { return {}; } }
  function esc(value) { return String(value || '').replace(/[&<>"']/g, function (character) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]; }); }
  function localMeaning(value, type) { var meanings = { ana: 'Nombre de origen hebreo asociado tradicionalmente con “gracia” o “compasión”.', carlos: 'Nombre de origen germánico relacionado tradicionalmente con “hombre libre”.', sofia: 'Nombre de origen griego asociado con “sabiduría”.', maria: 'Nombre de tradición hebrea con interpretaciones históricas diversas.', juan: 'Nombre de origen hebreo tradicionalmente interpretado como “Dios es misericordioso”.', garcia: 'Apellido patronímico de origen hispánico; su etimología exacta es discutida.', rodriguez: 'Apellido patronímico de origen hispánico: “hijo de Rodrigo”.', gonzalez: 'Apellido patronímico de origen hispánico: “hijo de Gonzalo”.', martinez: 'Apellido patronímico de origen hispánico: “hijo de Martín”.' }; return meanings[value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')] || 'No hay una interpretación local verificada para este término.'; }
  function lookup(value, type) {
    if (!value) return;
    var key = type + '-' + value.toLowerCase();
    var existing = output.querySelector('[data-name-key="' + CSS.escape(key) + '"]');
    if (existing) existing.remove();
    var card = document.createElement('article'); card.className = 'info-card name-card'; card.dataset.nameKey = key; card.innerHTML = '<p class="section-kicker">' + type.toUpperCase() + '</p><h3>' + esc(value) + '</h3><strong>Buscando contexto...</strong><p>Consulta pública en Wikidata/Wikipedia.</p>'; output.appendChild(card);
    fetch('https://www.wikidata.org/w/api.php?action=wbsearchentities&search=' + encodeURIComponent(value) + '&language=es&uselang=es&format=json&origin=*').then(function (response) { if (!response.ok) throw new Error('API'); return response.json(); }).then(function (result) { var item = result.search && result.search[0]; var meaning = localMeaning(value, type); card.querySelector('strong').textContent = item && item.description ? item.description : meaning; card.querySelector('p:last-child').innerHTML = (item ? 'Contexto encontrado en Wikidata. ' : '') + (meaning.indexOf('No hay') === 0 ? meaning : meaning); if (item) { card.innerHTML += '<a href="https://www.wikidata.org/wiki/' + encodeURIComponent(item.id) + '" target="_blank" rel="noopener noreferrer">Ver fuente</a>'; } }).catch(function () { card.querySelector('strong').textContent = localMeaning(value, type); card.querySelector('p:last-child').textContent = 'La consulta externa no respondió; se muestra una referencia local orientativa.'; });
  }
})();
