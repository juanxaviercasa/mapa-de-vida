(function () {
  'use strict';
  var form = document.getElementById('start-form');
  var stored = readData();
  var nameInput = document.getElementById('start-name');
  var surnameInput = document.getElementById('start-surname');
  var errorEl = document.getElementById('start-error');

  // Pre-fill if returning user
  if (stored.dob) {
    document.getElementById('start-month').value = stored.dob.month;
    document.getElementById('start-day').value = stored.dob.day;
    document.getElementById('start-year').value = stored.dob.year;
    nameInput.value = stored.userName || '';
    surnameInput.value = stored.userSurname || '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    errorEl.textContent = '';

    var name = nameInput.value.trim();
    var surname = surnameInput.value.trim();
    var month = Number(document.getElementById('start-month').value);
    var day = Number(document.getElementById('start-day').value);
    var year = Number(document.getElementById('start-year').value);

    if (!name) { errorEl.textContent = 'El nombre es obligatorio para el oráculo.'; nameInput.focus(); return; }
    if (!surname) { errorEl.textContent = 'El apellido es obligatorio para calcular tu vibración.'; surnameInput.focus(); return; }

    var date = new Date(year, month, day);
    if (!year || document.getElementById('start-month').value === '' || !day ||
        date.getFullYear() !== year || date.getMonth() !== month ||
        date.getDate() !== day || date > new Date()) {
      errorEl.textContent = 'Introduce una fecha válida que ya haya ocurrido.';
      return;
    }

    stored.dob = { month: month, day: day, year: year };
    stored.userName = name;
    stored.userSurname = surname;

    // Calcular vibración del nombre completo (numerología pitagórica)
    stored.nameVibration = calcNameVibration(name + ' ' + surname);
    stored.nameVibrationFull = calcNameVibration(name);
    stored.surnameVibration = calcNameVibration(surname);

    localStorage.setItem('your-life-data', JSON.stringify(stored));
    window.location.href = 'dashboard.html';
  });

  function calcNameVibration(name) {
    var map = {
      a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
      j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
      s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
    };
    var normalized = name.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z]/g, '');
    var sum = 0;
    for (var i = 0; i < normalized.length; i++) {
      sum += map[normalized[i]] || 0;
    }
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = String(sum).split('').reduce(function(a, d) { return a + Number(d); }, 0);
    }
    return sum;
  }

  function readData() {
    try {
      return Object.assign(
        { events: [], goals: [], notes: {}, lifeExpectancy: 80, accent: '#d94b4b', posterMessage: 'Tu tiempo también es una elección.' },
        JSON.parse(localStorage.getItem('your-life-data') || '{}')
      );
    } catch (e) {
      return { events: [], goals: [], notes: {}, lifeExpectancy: 80, accent: '#d94b4b', posterMessage: 'Tu tiempo también es una elección.' };
    }
  }
})();
