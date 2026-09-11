(function () {
  'use strict';

  var masterNumbers = [11, 22, 33];
  var letterValues = {
    a: 1, j: 1, s: 1, b: 2, k: 2, t: 2, c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4, e: 5, n: 5, w: 5, f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7, h: 8, q: 8, z: 8, i: 9, r: 9
  };

  function readProfile() {
    var result = { name: '', surname: '', dob: null };
    try {
      var life = JSON.parse(localStorage.getItem('your-life-data') || '{}');
      var portal = JSON.parse(localStorage.getItem('portal_data') || '{}');
      result.name = life.userName || portal.n || '';
      result.surname = life.userSurname || portal.s || '';
      result.dob = life.dob || (portal.d && portal.m !== undefined && portal.y ? {
        day: Number(portal.d), month: Number(portal.m), year: Number(portal.y)
      } : null);
    } catch (error) {}
    return result;
  }

  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  }

  function reduce(value) {
    value = Number(value) || 0;
    while (value > 9 && masterNumbers.indexOf(value) === -1) {
      value = String(value).split('').reduce(function (sum, digit) { return sum + Number(digit); }, 0);
    }
    return value;
  }

  function calculateName(value, filter) {
    return reduce(normalize(value).split('').filter(function (letter) {
      return !filter || filter(letter);
    }).reduce(function (sum, letter) { return sum + (letterValues[letter] || 0); }, 0));
  }

  function calculateLifePath(dob) {
    if (!dob) return null;
    return reduce(String(dob.year) + (Number(dob.month) + 1) + Number(dob.day));
  }

  function calculatePersonalYear(dob, year) {
    if (!dob) return null;
    return reduce(Number(year) + Number(dob.month) + 1 + Number(dob.day));
  }

  function calculateAttitude(dob) {
    if (!dob) return null;
    return reduce(Number(dob.month) + 1 + Number(dob.day));
  }

  function calculateProfile(profile) {
    profile = profile || readProfile();
    var fullName = (profile.name + ' ' + profile.surname).trim();
    return {
      name: profile.name,
      surname: profile.surname,
      fullName: fullName,
      lifePath: calculateLifePath(profile.dob),
      expression: fullName ? calculateName(fullName) : null,
      soulUrge: fullName ? calculateName(fullName, function (letter) { return 'aeiou'.indexOf(letter) !== -1; }) : null,
      personality: fullName ? calculateName(fullName, function (letter) { return 'aeiou'.indexOf(letter) === -1; }) : null,
      birthDay: profile.dob ? reduce(profile.dob.day) : null,
      attitude: calculateAttitude(profile.dob),
      maturity: fullName && profile.dob ? reduce(calculateName(fullName) + calculateLifePath(profile.dob)) : null,
      personalYear: calculatePersonalYear(profile.dob, new Date().getFullYear())
    };
  }

  window.EsotericEngine = {
    readProfile: readProfile,
    calculateProfile: calculateProfile,
    reduce: reduce
  };
})();