(function () {
  'use strict';

  var page = document.body.dataset.view || 
             document.body.dataset.unit || 
             document.body.dataset.page || 
             document.documentElement.dataset.unit || 
             document.documentElement.dataset.page || 
             'map';

  var tourKey = 'mapa-de-vida-guide-v6';

  var steps = {
    dashboard: [
      { selector: '.dashboard-stats', title: 'Tu resumen', text: 'Aquí ves edad, días vividos, periodo actual y una estimación del tiempo restante.' },
      { selector: '.now-card', title: 'Dónde estás ahora', text: 'Este bloque destaca el periodo que estás atravesando hoy.' },
      { selector: '.quick-links', title: 'Explora tu recorrido', text: 'Desde aquí puedes abrir patrones, tu fecha cultural y el póster.' }
    ],
    timeline: [
      { selector: '.full-timeline', title: 'Tu línea de vida', text: 'Aquí aparecen tus eventos y metas ordenados cronológicamente.' }
    ],
    journal: [
      { selector: '.journal-form', title: 'Escribe una reflexión', text: 'Elige un periodo, escribe algo que quieras recordar y guárdalo en tu navegador.' },
      { selector: '.journal-list', title: 'Revisa tus notas', text: 'Puedes editar o eliminar cualquier reflexión cuando quieras.' }
    ],
    patterns: [
      { selector: '.pattern-panel', title: 'Mira los patrones', text: 'Cada color representa tiempo vivido, eventos, metas o notas.' }
    ],
    poster: [
      { selector: '.poster-settings', title: 'Personaliza tu póster', text: 'Cambia el título, el color y la frase final antes de imprimir o guardarlo como PDF.' },
      { selector: '.poster', title: 'Tu composición', text: 'Esta es la versión limpia que puedes imprimir.' }
    ],
    compare: [
      { selector: '.compare-form', title: 'Compara dos fechas', text: 'Elige dos fechas para conocer la distancia entre ellas en días, semanas y años.' }
    ],
    world: [
      { selector: '.world-stats', title: 'Datos estimados', text: 'Estas cifras se proyectan a partir de fuentes demográficas oficiales; no son registros individuales en vivo.' },
      { selector: '.world-grid', title: 'Cielo e imágenes', text: 'Consulta la fase lunar y una imagen pública relacionada con tu signo.' },
      { selector: '#weather-output', title: 'Clima', text: 'Escribe una ciudad para consultar su clima actual.' },
      { selector: '#history-output', title: 'Historia', text: 'Aquí aparecen acontecimientos relacionados con tu fecha de nacimiento.' }
    ],
    years: [
      { selector: '.dob', title: 'Empieza por tu fecha', text: 'Introduce tu fecha de nacimiento para iluminar el mapa.' },
      { selector: '.chart', title: 'Cada casilla es un año', text: 'Las casillas muestran el tiempo vivido. Selecciona una para añadir una reflexión.' },
      { selector: '.workspace-grid', title: 'Añade significado', text: 'Registra eventos, metas y notas personales.' }
    ],
    months: [
      { selector: '.dob', title: 'Empieza por tu fecha', text: 'Introduce tu fecha de nacimiento para iluminar el mapa.' },
      { selector: '.chart', title: 'Cada casilla es un mes', text: 'Selecciona un mes para escribir un recuerdo o reflexión.' },
      { selector: '.workspace-grid', title: 'Añade significado', text: 'Registra eventos, metas y notas personales.' }
    ],
    weeks: [
      { selector: '.dob', title: 'Empieza por tu fecha', text: 'Introduce tu fecha de nacimiento para iluminar el mapa.' },
      { selector: '.chart', title: 'Cada casilla es una semana', text: 'Este mapa te ayuda a ver el tiempo de forma concreta.' },
      { selector: '.workspace-grid', title: 'Añade significado', text: 'Registra eventos, metas y notas personales.' }
    ],
    fecha: [
      { 
        selector: '.identity-grid', 
        tab: 'tab-esencia',
        title: 'Tu Identidad Temporal', 
        text: 'Aquí tienes tu edad exacta calculada en años, meses y días, la cuenta regresiva para tu próximo cumpleaños y tu generación cósmica.' 
      },
      { 
        selector: '.cosmic-tab-btn[data-target="tab-esencia"]', 
        tab: 'tab-esencia',
        title: 'Pestaña: Tu Esencia', 
        text: 'Haz clic en esta pestaña para conocer el origen y significado ancestral de tus nombres y apellidos, tu número de sendero de vida, arquetipos y dones espirituales.' 
      },
      { 
        selector: '.cosmic-tab-btn[data-target="tab-culturas"]', 
        tab: 'tab-culturas',
        title: 'Pestaña: Culturas del Mundo', 
        text: 'Haz clic en esta pestaña para explorar tu fecha en calendarios sagrados: Maya, Chino, Hebreo, Islámico y las tradiciones coreana y japonesa.' 
      },
      { 
        selector: '.cosmic-tab-btn[data-target="tab-simbolos"]', 
        tab: 'tab-simbolos',
        title: 'Pestaña: Cielo & Símbolos', 
        text: 'Haz clic en esta pestaña para descubrir tus cosmovisiones ancestrales: signo del zodiaco egipcio, tótem del árbol celta, nahual maya y constelación védica.' 
      },
      { 
        selector: '.cosmic-tab-btn[data-target="tab-oraculo"]', 
        tab: 'tab-oraculo',
        title: 'Pestaña: Oráculo & Tiempo', 
        text: 'Haz clic en esta pestaña para recibir tu oráculo del día, consultar dudas a la IA Astral Gemini y revivir los acontecimientos del año en que naciste.' 
      },
      { 
        selector: '#cosmic-nav-toggle', 
        title: 'Menú: Explorar Otras Dimensiones', 
        text: 'Usa este botón en cualquier momento para desplegar tu matriz de semanas, años vividos, línea de tiempo y generar tu póster imprimible.' 
      }
    ]
  };

  var currentSteps = steps[page] || steps.dashboard;
  var index = 0;
  var dim, card, help;

  function activateTab(tabId) {
    if (!tabId) return;
    var targetBtn = document.querySelector('.cosmic-tab-btn[data-target="' + tabId + '"]');
    if (targetBtn && !targetBtn.classList.contains('active')) {
      targetBtn.click();
    }
  }

  function createUI() {
    help = document.createElement('button');
    help.className = 'guide-help';
    help.type = 'button';
    help.setAttribute('aria-label', 'Abrir guía de Mapa de Vida');
    help.setAttribute('title', 'Abrir guía de Mapa de Vida');
    help.textContent = '?';
    help.addEventListener('click', start);
    document.body.appendChild(help);

    // Oscurecedor ambiental independiente (z-index: 9990)
    dim = document.createElement('div');
    dim.className = 'guide-dim';
    dim.hidden = true;
    dim.addEventListener('click', close);
    document.body.appendChild(dim);

    // Tarjeta flotante independiente en capa superior absoluta (z-index: 10010)
    card = document.createElement('div');
    card.className = 'guide-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-live', 'polite');
    card.hidden = true;
    card.innerHTML = 
      '<p class="section-kicker">✦ GUÍA MAPA DE VIDA ✦</p>' +
      '<p class="guide-progress"></p>' +
      '<h2></h2>' +
      '<p class="guide-text"></p>' +
      '<div class="guide-actions">' +
        '<button type="button" class="guide-skip">Saltar guía</button>' +
        '<span></span>' +
        '<button type="button" class="guide-back">Atrás</button>' +
        '<button type="button" class="guide-next">Siguiente</button>' +
      '</div>';
    document.body.appendChild(card);

    card.querySelector('.guide-skip').addEventListener('click', close);
    
    card.querySelector('.guide-back').addEventListener('click', function () {
      if (index > 0) {
        index--;
        render();
      }
    });

    card.querySelector('.guide-next').addEventListener('click', function () {
      if (index < currentSteps.length - 1) {
        index++;
        render();
      } else {
        close();
      }
    });
  }

  function updateCardPosition(target) {
    if (!target || !card) return;
    var rect = target.getBoundingClientRect();
    var cardHeight = card.offsetHeight || 230;
    var viewportH = window.innerHeight;

    var spaceBelow = viewportH - rect.bottom;
    var spaceAbove = rect.top;

    // Si hay suficiente espacio abajo (al menos la altura de la tarjeta + 20px)
    if (spaceBelow >= cardHeight + 20) {
      card.style.top = 'auto';
      card.style.bottom = '24px';
    } else if (spaceAbove >= cardHeight + 70) {
      // Si el elemento está en la parte baja, colocar la tarjeta arriba para no taparlo
      card.style.bottom = 'auto';
      card.style.top = '75px';
    } else {
      card.style.top = 'auto';
      card.style.bottom = '18px';
    }
  }

  function render() {
    var step = currentSteps[index];
    if (!step) return;

    if (step.tab) {
      activateTab(step.tab);
    }

    card.querySelector('.guide-progress').textContent = (index + 1) + ' / ' + currentSteps.length;
    card.querySelector('h2').textContent = step.title;
    card.querySelector('.guide-text').textContent = step.text;
    card.querySelector('.guide-back').disabled = (index === 0);
    card.querySelector('.guide-next').textContent = (index === currentSteps.length - 1) ? '¡Comenzar a Explorar!' : 'Siguiente';

    window.setTimeout(function () {
      var target = document.querySelector(step.selector);
      if (!target) {
        if (index < currentSteps.length - 1) {
          index++;
          render();
        } else {
          close();
        }
        return;
      }

      document.querySelectorAll('.guide-target').forEach(function (element) {
        element.classList.remove('guide-target');
      });
      document.querySelectorAll('.guide-target-parent').forEach(function (element) {
        element.classList.remove('guide-target-parent');
      });
      document.querySelectorAll('.guide-panel-preview').forEach(function (element) {
        element.classList.remove('guide-panel-preview');
      });

      target.classList.add('guide-target');

      // Iluminar y elevar el panel de contenido activo para que sea 100% visible y nítido
      if (step.tab) {
        var activePanel = document.getElementById(step.tab);
        if (activePanel) {
          activePanel.classList.add('guide-panel-preview');
        }
      }

      // Elevar el contenedor padre (como la barra de pestañas o la cabecera)
      var parentContainer = target.closest('.cosmic-tabs-nav') || 
                            target.closest('.panel') || 
                            target.closest('.identity-grid') || 
                            target.closest('.cosmic-topbar');
      if (parentContainer && parentContainer !== target) {
        parentContainer.classList.add('guide-target-parent');
      }

      // Scroll inteligente: alinear cada sección dejando suficiente espacio arriba y abajo para que jamás colisione con la tarjeta
      if (target.classList.contains('identity-grid') || index === 0) {
        var gridRect = target.getBoundingClientRect();
        var targetScrollY = window.pageYOffset + gridRect.top - 70;
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'smooth' });
      } else {
        var tabsNav = target.closest('.cosmic-tabs-nav');
        if (tabsNav) {
          var rect = tabsNav.getBoundingClientRect();
          var navScrollY = window.pageYOffset + rect.top - 70;
          window.scrollTo({ top: Math.max(0, navScrollY), behavior: 'smooth' });
        } else if (target.id === 'cosmic-nav-toggle') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          try {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } catch (e) {
            target.scrollIntoView();
          }
        }
      }

      // Ajustar posición dinámica de la tarjeta para garantizar cero superposiciones
      window.setTimeout(function () {
        updateCardPosition(target);
      }, 100);
    }, 70);
  }

  function start() {
    if (!currentSteps || !currentSteps.length) return;
    index = 0;
    if (dim) dim.hidden = false;
    if (card) card.hidden = false;
    document.body.classList.add('guide-active');
    render();
  }

  function close() {
    if (dim) dim.hidden = true;
    if (card) card.hidden = true;
    document.body.classList.remove('guide-active');
    document.querySelectorAll('.guide-target').forEach(function (element) {
      element.classList.remove('guide-target');
    });
    document.querySelectorAll('.guide-target-parent').forEach(function (element) {
      element.classList.remove('guide-target-parent');
    });
    document.querySelectorAll('.guide-panel-preview').forEach(function (element) {
      element.classList.remove('guide-panel-preview');
    });
    
    // Al finalizar o saltar el tour, regresar siempre suavemente a la pestaña principal (Tu Esencia)
    activateTab('tab-esencia');

    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      localStorage.setItem(tourKey, 'true');
    } catch (e) {}
  }

  createUI();
  if (!localStorage.getItem(tourKey) && page !== 'index') {
    window.setTimeout(start, 700);
  }
})();
