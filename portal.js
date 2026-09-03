// portal.js - Lógica, Cálculos y Conexión de Datos del Mapa de Vida

const Lotes = {
  nombres: [
    'Lotes_Conocimiento/lote1-nombres-hombre-af.json',
    'Lotes_Conocimiento/lote2-nombres-hombre-gm.json',
    'Lotes_Conocimiento/lote3-nombres-hombre-nz.json',
    'Lotes_Conocimiento/lote4-nombres-mujer-af.json',
    'Lotes_Conocimiento/lote5-nombres-mujer-go.json',
    'Lotes_Conocimiento/lote6-nombres-mujer-pz.json'
  ],
  apellidos: [
    'Lotes_Conocimiento/lote7-apellidos-ag.json',
    'Lotes_Conocimiento/lote8-apellidos-hp.json',
    'Lotes_Conocimiento/lote9-apellidos-qz.json'
  ],
  compatibilidades: 'Lotes_Conocimiento/lote10-compatibilidades.json',
  arquetipos: 'Lotes_Conocimiento/lote11-arquetipos.json'
};

// Base de datos en memoria
let DB = { nombres: {}, apellidos: {}, compatibilidades: {}, arquetipos: {} };
let conocimientoCargado = false;
let cargandoConocimientoPromise = null;

async function cargarConocimiento() {
  if (conocimientoCargado) return DB;
  if (cargandoConocimientoPromise) return cargandoConocimientoPromise;

  cargandoConocimientoPromise = (async () => {
    try {
      const lowerKeys = (obj) => {
        let res = {};
        for (let k in obj) res[k.toLowerCase()] = obj[k];
        return res;
      };

      for (let url of Lotes.nombres) {
        try {
          let res = await fetch(url);
          if (res.ok) Object.assign(DB.nombres, lowerKeys(await res.json()));
        } catch (e) {}
      }
      for (let url of Lotes.apellidos) {
        try {
          let res = await fetch(url);
          if (res.ok) Object.assign(DB.apellidos, lowerKeys(await res.json()));
        } catch (e) {}
      }
      try {
        let resComp = await fetch(Lotes.compatibilidades);
        if (resComp.ok) DB.compatibilidades = await resComp.json();
      } catch (e) {}
      
      try {
        let resArq = await fetch(Lotes.arquetipos);
        if (resArq.ok) DB.arquetipos = await resArq.json();
      } catch (e) {}

      conocimientoCargado = true;
      return DB;
    } catch(e) {
      console.error("Error cargando lotes de conocimiento:", e);
      return DB;
    }
  })();

  return cargandoConocimientoPromise;
}

// ── CORRECCIÓN ORTOGRÁFICA (Filtro para JSON) ──
function corregir(str) {
  if (!str) return "";
  const mapa = {
    "mision": "misión", "Mision": "Misión",
    "conexion": "conexión", "Conexion": "Conexión",
    "proposito": "propósito", "Proposito": "Propósito",
    "DispersiOn": "Dispersión", "dispersiOn": "dispersión", "dispersión": "dispersión",
    "dramatizacion": "dramatización", "intuicion": "intuición",
    "comunicacion": "comunicación", "expansion": "expansión",
    "corazon": "corazón", "tambien": "también",
    "accion": "acción", "direccion": "dirección",
    "relacion": "relación", "ilusion": "ilusión",
    "transformacion": "transformación", "comprension": "comprensión",
    "energia": "energía", "armonia": "armonía",
    "sabiduria": "sabiduría", "magnetico": "magnético",
    "lider": "líder", "exito": "éxito", "autentico": "auténtico",
    "mas": "más", "Rub": "Rubí", "Leon": "León",
    "cooperacion": "cooperación", "superficialidad": "superficialidad",
    "vinculo": "vínculo", "facilmente": "fácilmente", "logico": "lógico"
  };
  
  let res = str;
  for (let key in mapa) {
    let regex = new RegExp("\\b" + key + "\\b", "g");
    res = res.replace(regex, mapa[key]);
  }
  res = res.replace(/\uFFFD/g, "í");
  return res;
}

// ── ALGORITMOS ASTROLÓGICOS Y MATEMÁTICOS ──
function calcularNumerologia(d, m, y) {
  d = parseInt(d, 10) || 1;
  m = parseInt(m, 10) || 1;
  y = parseInt(y, 10) || 2000;
  const sumaDigitos = (num) => num.toString().split('').reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0);
  let sumaTotal = sumaDigitos(d) + sumaDigitos(m) + sumaDigitos(y);
  
  while (sumaTotal > 9 && sumaTotal !== 11 && sumaTotal !== 22 && sumaTotal !== 33) {
    sumaTotal = sumaDigitos(sumaTotal);
  }
  return sumaTotal;
}

function calcularZodiaco(d, m) {
  d = parseInt(d, 10) || 1;
  m = parseInt(m, 10) || 0; // 0-indexed (0=enero, 11=diciembre)
  const signos = [
    { name: "Capricornio", img: "images/zodiac/zodiac-capricornio.jpg" },
    { name: "Acuario", img: "images/zodiac/zodiac-acuario.jpg" },
    { name: "Piscis", img: "images/zodiac/zodiac-piscis.jpg" },
    { name: "Aries", img: "images/zodiac/zodiac-aries.jpg" },
    { name: "Tauro", img: "images/zodiac/zodiac-tauro.jpg" },
    { name: "Géminis", img: "images/zodiac/zodiac-geminis.jpg" },
    { name: "Cáncer", img: "images/zodiac/zodiac-cancer.jpg" },
    { name: "Leo", img: "images/zodiac/zodiac-leo.jpg" },
    { name: "Virgo", img: "images/zodiac/zodiac-virgo.jpg" },
    { name: "Libra", img: "images/zodiac/zodiac-libra.jpg" },
    { name: "Escorpio", img: "images/zodiac/zodiac-escorpio.jpg" },
    { name: "Sagitario", img: "images/zodiac/zodiac-sagitario.jpg" },
    { name: "Capricornio", img: "images/zodiac/zodiac-capricornio.jpg" }
  ];
  const limites = [20, 19, 20, 20, 21, 21, 22, 23, 23, 23, 22, 22];
  return (d > limites[m]) ? signos[m + 1] : signos[m];
}

function calcularZodiacoChino(y) {
  y = parseInt(y, 10) || 2000;
  const animales = ["Mono", "Gallo", "Perro", "Cerdo", "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra"];
  var idx = ((y % 12) + 12) % 12;
  return animales[idx];
}

function calcularFaseLunar(d, m, y) {
  d = parseInt(d, 10) || 1;
  m = parseInt(m, 10) || 0;
  y = parseInt(y, 10) || 2000;
  let c = 0, e = 0, jd = 0, b = 0;
  let mCalc = m;
  let yCalc = y;
  if (mCalc < 2) { yCalc--; mCalc += 12; }
  ++mCalc;
  c = 365.25 * yCalc;
  e = 30.6 * mCalc;
  jd = c + e + d - 694039.09; 
  jd /= 29.5305882; 
  b = parseInt(jd, 10);
  jd -= b;
  b = Math.round(jd * 8); 
  if (b >= 8) b = 0;

  const fases = [
    { name: "Luna Nueva", img: "images/moon/moon-luna-nueva.jpg" },
    { name: "Creciente", img: "images/moon/moon-creciente.jpg" },
    { name: "Cuarto Creciente", img: "images/moon/moon-cuarto-creciente.jpg" },
    { name: "Gibosa Creciente", img: "images/moon/moon-gibosa-creciente.jpg" },
    { name: "Luna Llena", img: "images/moon/moon-luna-llena.jpg" },
    { name: "Gibosa Menguante", img: "images/moon/moon-gibosa-menguante.jpg" },
    { name: "Cuarto Menguante", img: "images/moon/moon-cuarto-menguante.jpg" },
    { name: "Menguante", img: "images/moon/moon-menguante.jpg" }
  ];
  return fases[b];
}

function limpiarTexto(txt) {
  return String(txt || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

function generarSignificadoMistico(palabra, tipo) {
  let word = palabra.toLowerCase();
  let lastChar = word.slice(-1);
  let firstChar = word.charAt(0);
  let isVowelFirst = 'aeiou'.includes(firstChar);
  
  let origin = "Místico y Antiguo";
  let meaning = "";
  
  if (tipo === 'apellido') {
    if (word.endsWith('ez') || word.endsWith('es')) {
      origin = "Patronímico Ancestral";
      meaning = "Este linaje denota ascendencia directa de antiguos guardianes o líderes (hijo de). ";
    } else if (word.endsWith('os') || word.endsWith('as')) {
      origin = "Natural y Expansivo";
      meaning = "Ligado a la abundancia y la pluralidad. Un linaje que florece y expande sus raíces para proteger su entorno. ";
    } else if (word.includes('rr') || word.includes('ll') || word.includes('z')) {
      origin = "Forjador Terrenal";
      meaning = "Su fonética posee una vibración de resistencia y fuerza, propio de forjadores de caminos y protectores. ";
    } else {
      origin = "Herencia Estelar";
      meaning = "Un apellido con ecos cósmicos. Quienes lo portan tienen la tarea de sembrar nuevas tradiciones en la tierra. ";
    }
    
    if (word.length > 7) {
      meaning += "Su extensión sugiere una sabiduría profunda, acumulada a través de largas generaciones.";
    } else {
      meaning += "Su estructura corta y firme refleja una herencia de acción directa, valentía y enfoque.";
    }
    return { origin, meaning, heraldry_symbol: "El Cristal del Tiempo" };
  } 
  
  if (tipo === 'nombre') {
    if (isVowelFirst) {
      origin = "Resonancia Lumínica";
      meaning = "Inicia con una apertura cósmica, lo que dota a su portador de una gran receptividad, intuición y empatía. ";
    } else {
      origin = "Vibración Materializadora";
      meaning = "Inicia con una vibración fuerte, otorgando a su portador gran voluntad, solidez y poder para materializar sus sueños. ";
    }
    
    if (lastChar === 'a') {
      meaning += "Su sonido final expansivo fomenta la creatividad, el arte y la sanación emocional a su alrededor.";
    } else if (lastChar === 'o') {
      meaning += "Su terminación aporta estabilidad, pensamiento lógico y una estructura sólida para su vida.";
    } else {
      meaning += "Su cierre firme refleja una personalidad determinada, analítica y de convicciones espirituales inquebrantables.";
    }
    return { origin, meaning, element: "Éter Espiritual", planet: "Cosmos Infinito" };
  }
}

function generarMapa(nombreRaw, apellidoRaw, dia, mes, año) {
  dia = parseInt(dia, 10);
  mes = parseInt(mes, 10);
  año = parseInt(año, 10);
  nombreRaw = (nombreRaw || '').trim();
  apellidoRaw = (apellidoRaw || '').trim();

  let nombresLimpios = limpiarTexto(nombreRaw).split(" ").filter(w => w.length > 0).slice(0, 2);
  let apellidosLimpios = limpiarTexto(apellidoRaw).split(" ").filter(w => w.length > 0).slice(0, 2);

  let infoNombres = nombresLimpios.map(n => {
    return {
      key: n,
      data: DB.nombres[n] || generarSignificadoMistico(n, 'nombre')
    };
  });

  let infoApellidos = apellidosLimpios.map(a => {
    return {
      key: a,
      data: DB.apellidos[a] || generarSignificadoMistico(a, 'apellido')
    };
  });

  let num = calcularNumerologia(dia, mes + 1, año); 
  let arquetipo = DB.arquetipos[num] || DB.arquetipos[String(num)] || DB.arquetipos["1"] || { myth: "El Creador Consciente", mission: "Manifestar tu propia realidad con valor", gift: "Visión y determinación", shadow: "Impaciencia ante los procesos", mantra: "Soy el autor consciente de mi destino." };
  let comp = DB.compatibilidades[num] || DB.compatibilidades[String(num)] || DB.compatibilidades["1"] || { partner_description: "Conexión basada en la verdad", money_advice: "Crea con propósito", work_advice: "Lidera con empatía", health_advice: "Cuida tu vitalidad", best: [1, 5, 7], soulmate: "Tu reflejo" };

  let zod = calcularZodiaco(dia, mes);
  let chino = calcularZodiacoChino(año);
  let luna = calcularFaseLunar(dia, mes, año);

  window.PortalData = {
    nombreRaw, apellidoRaw, 
    infoNombres, infoApellidos,
    num, arquetipo, comp,
    zod, chino, luna
  };

  seleccionarSeccion();
}

window.PortalData = {};
window.seleccionarSeccion = seleccionarSeccion;
window.generarMapa = generarMapa;

function seleccionarSeccion() {
  const content = document.getElementById('dash-content');
  if (!content || !window.PortalData) return;
  const d = window.PortalData;
  let html = '';

  // 1. EL PODER DEL NOMBRE
  let capitalize = str => (str || '').split(' ').filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  let fullName = (capitalize(d.nombreRaw) + ' ' + capitalize(d.apellidoRaw)).trim() || 'Tu Nombre Cósmico';

  html += `
    <div class="dash-section">
      <div class="card-title">✦ El Poder del Nombre ✦</div>
      <div class="dash-subtitle">${fullName}</div>
  `;
  
  if (d.infoNombres && d.infoNombres.length) {
    d.infoNombres.forEach((n, idx) => {
      html += `
      <div class="dash-text" style="${idx > 0 ? 'margin-top: 16px;' : ''}">
        <p><b>${capitalize(n.key)}:</b> Origen ${corregir(n.data.origin)}. ${corregir(n.data.meaning)}</p>
        <p class="dash-meta">Elemento: ${corregir(n.data.element || 'Éter Espiritual')} | Planeta: ${corregir(n.data.planet || 'Cosmos')}</p>
      </div>`;
    });
  }
  if (d.infoApellidos && d.infoApellidos.length) {
    html += `<hr>`;
    d.infoApellidos.forEach((a, idx) => {
      html += `
      <div class="dash-text" style="${idx > 0 ? 'margin-top: 16px;' : ''}">
        <p><b>${capitalize(a.key)}:</b> Origen ${corregir(a.data.origin)}. ${corregir(a.data.meaning)}</p>
        <p class="dash-meta">Símbolo Heráldico: ${corregir(a.data.heraldry_symbol || 'El Cristal del Tiempo')}</p>
      </div>`;
    });
  }
  html += `</div>`;

  // 2. ASTROS Y LUNAS
  if (d.zod && d.luna) {
    html += `
      <div class="dash-section">
        <div class="card-title">✦ Geometría Cósmica ✦</div>
        <div class="dash-text" style="margin-bottom: 20px;">Has nacido bajo el sol de <b>${d.zod.name}</b>, con el espíritu del <b>${d.chino}</b> en tu año regente. El cielo nocturno de tu nacimiento estaba iluminado por la <b>${d.luna.name}</b>.</div>
        <div class="zodiac-grid" style="display:flex; gap:20px; flex-wrap:wrap;">
          <div class="z-item" style="flex:1; min-width:140px;">
            <img src="${d.zod.img}" alt="${d.zod.name}" style="max-width:90px; border-radius:50%; border:2px solid rgba(212,168,67,0.4);" onerror="this.style.display='none'">
            <div style="margin-top:10px;">Sol en ${d.zod.name}</div>
          </div>
          <div class="z-item" style="flex:1; min-width:140px;">
            <img src="${d.luna.img}" alt="${d.luna.name}" style="max-width:90px; border-radius:50%; border:2px solid rgba(212,168,67,0.4);" onerror="this.style.display='none'">
            <div style="margin-top:10px;">Fase ${d.luna.name}</div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. VIBRACIÓN
  if (d.arquetipo) {
    html += `
      <div class="dash-section">
        <div class="card-title">✦ Tu Número de Vida: ${d.num} ✦</div>
        <div class="dash-meta" style="letter-spacing: 1px; text-transform: uppercase;">Frecuencia Vibracional Numerológica</div>
        <div class="dash-subtitle" style="margin-top: 10px;">Arquetipo: <b>${corregir(d.arquetipo.myth || '')}</b></div>
        <div class="dash-text" style="margin-top:14px;">
          <p><b>Misión:</b> ${corregir(d.arquetipo.mission || '')}</p>
          <p style="margin-top:10px;"><b>Tu Don:</b> ${corregir(d.arquetipo.gift || '')}</p>
          <p style="margin-top:10px;"><b>Tu Sombra (A sanar):</b> ${corregir(d.arquetipo.shadow || '')}</p>
          <div class="mantra-box">"${corregir(d.arquetipo.mantra || '')}"</div>
        </div>
      </div>
    `;
  }

  // 4. ORÁCULO
  if (d.comp) {
    html += `
      <div class="dash-section">
        <div class="card-title">✦ El Oráculo de Vida ✦</div>
        <div class="dash-text">
          <p><b>En el Amor:</b> ${corregir(d.comp.partner_description || '')}</p>
          <p style="margin-top:10px;"><b>En el Dinero:</b> ${corregir(d.comp.money_advice || '')}</p>
          <p style="margin-top:10px;"><b>En el Trabajo:</b> ${corregir(d.comp.work_advice || '')}</p>
          <p style="margin-top:10px;"><b>En la Salud:</b> ${corregir(d.comp.health_advice || '')}</p>
          <p class="dash-meta" style="margin-top:16px;">Afín a vibraciones: ${d.comp.best ? d.comp.best.join(", ") : d.num} | Llama Gemela: ${d.comp.soulmate || 'Espejo Solar'}</p>
        </div>
      </div>
    `;
  }

  content.innerHTML = html;
  content.style.opacity = 1;
}

// Inicialización según la página en la que nos encontremos
document.addEventListener('DOMContentLoaded', () => {
  // SI ESTAMOS EN LA PORTADA (index.html)
  const startForm = document.getElementById('start-form');
  if (startForm) {
    startForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let n = (document.getElementById('start-name') ? document.getElementById('start-name').value : '').trim();
      let s = (document.getElementById('start-surname') ? document.getElementById('start-surname').value : '').trim();
      let d = parseInt(document.getElementById('day').value, 10);
      let m = parseInt(document.getElementById('month').value, 10);
      let y = parseInt(document.getElementById('year').value, 10);
      
      if (!n || isNaN(d) || isNaN(m) || isNaN(y)) {
        return;
      }

      // Guardamos en localStorage para que fecha.html lo lea
      localStorage.setItem('portal_data', JSON.stringify({ n, s, d, m, y }));
      localStorage.setItem('dob', JSON.stringify({ d, m, y }));
      
      let ylData = {};
      try { ylData = JSON.parse(localStorage.getItem('your-life-data') || '{}'); } catch(err){}
      ylData.userName = n;
      ylData.userSurname = s;
      ylData.name = (n + ' ' + s).trim();
      ylData.dob = { month: m, day: d, year: y };
      localStorage.setItem('your-life-data', JSON.stringify(ylData));
      
      // Redirigir a fecha.html
      window.location.href = 'fecha.html';
    });
  }

  // SI ESTAMOS EN RESULTADOS (fecha.html)
  const dashContent = document.getElementById('dash-content');
  if (dashContent) {
    let pData = null;
    try { pData = JSON.parse(localStorage.getItem('portal_data')); } catch(e) {}
    if (!pData) {
      try {
        let yData = JSON.parse(localStorage.getItem('your-life-data'));
        if (yData && yData.userName && yData.dob) {
          pData = {
            n: yData.userName,
            s: yData.userSurname || '',
            d: yData.dob.day,
            m: yData.dob.month,
            y: yData.dob.year
          };
        }
      } catch(e) {}
    }

    if (pData && pData.d && pData.m !== undefined && pData.y) {
      cargarConocimiento().then(() => {
        generarMapa(
          pData.n || 'Viajero',
          pData.s || '',
          parseInt(pData.d, 10),
          parseInt(pData.m, 10),
          parseInt(pData.y, 10)
        );
      });
    }

    // Escuchar cambios en los inputs de fecha.html para recalcular en vivo
    ['day', 'month', 'year'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          const dVal = parseInt(document.getElementById('day').value, 10);
          const mVal = parseInt(document.getElementById('month').value, 10);
          const yVal = parseInt(document.getElementById('year').value, 10);
          if (!isNaN(dVal) && !isNaN(mVal) && !isNaN(yVal)) {
            let n = (window.PortalData && window.PortalData.nombreRaw) || 'Viajero';
            let s = (window.PortalData && window.PortalData.apellidoRaw) || '';
            generarMapa(n, s, dVal, mVal, yVal);
          }
        });
      }
    });
  }
});
