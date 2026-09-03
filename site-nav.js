// site-nav.js - Sistema Global de Navegación Cósmica y Cajón Dimensional (Drawer)
(function () {
  'use strict';

  function initCosmicDrawer() {
    if (document.getElementById('cosmic-drawer')) return;

    var drawer = document.createElement('div');
    drawer.id = 'cosmic-drawer';
    drawer.className = 'cosmic-drawer-overlay';
    drawer.setAttribute('aria-hidden', 'true');

    drawer.innerHTML = `
      <div class="cosmic-drawer-content" role="dialog" aria-label="Menú Principal de Mapa de Vida">
        <div class="drawer-header">
          <div class="drawer-brand">✦ MAPA DE VIDA ✦</div>
          <button type="button" class="drawer-close" aria-label="Cerrar menú">&times;</button>
        </div>
        
        <div class="drawer-sections">
          <!-- Dimensión 1: Cósmica -->
          <div class="drawer-group">
            <div class="drawer-group-title">✦ DIMENSIÓN CÓSMICA</div>
            <a href="index.html" class="drawer-link">
              <span class="d-icon">🧘</span>
              <div>
                <strong>El Portal del Yogi</strong>
                <small>Meditación, sintonización de chakras y frecuencias sagradas</small>
              </div>
            </a>
            <a href="fecha.html" class="drawer-link">
              <span class="d-icon">🔮</span>
              <div>
                <strong>Tu Oráculo & Identidad</strong>
                <small>Poder del nombre, número de vida, signos y chat con IA</small>
              </div>
            </a>
          </div>

          <!-- Dimensión 2: Mapas de Tiempo (Imprimibles) -->
          <div class="drawer-group">
            <div class="drawer-group-title">🗓️ MAPAS DE TIEMPO (IMPRIMIBLES)</div>
            <a href="weeks.html" class="drawer-link">
              <span class="d-icon">✨</span>
              <div>
                <strong>Tu Vida en Semanas</strong>
                <small>4.160 semanas completas en una lámina de arte imprimible</small>
              </div>
            </a>
            <a href="months.html" class="drawer-link">
              <span class="d-icon">🌕</span>
              <div>
                <strong>Tu Vida en Meses</strong>
                <small>960 meses panorámicos de existencia listos para exportar</small>
              </div>
            </a>
            <a href="years.html" class="drawer-link">
              <span class="d-icon">⏳</span>
              <div>
                <strong>Tu Vida en Años</strong>
                <small>Un siglo de tiempo en 100 bloques imprimibles</small>
              </div>
            </a>
          </div>

          <!-- Dimensión 3: Tu Cuaderno de Vida (Bitácora) -->
          <div class="drawer-group">
            <div class="drawer-group-title">📖 TU CUADERNO DE VIDA (BITÁCORA)</div>
            <a href="dashboard.html" class="drawer-link">
              <span class="d-icon">📊</span>
              <div>
                <strong>Resumen Vital</strong>
                <small>Métricas temporales, progreso y próximos hitos</small>
              </div>
            </a>
            <a href="journal.html" class="drawer-link">
              <span class="d-icon">📝</span>
              <div>
                <strong>Diario de Reflexiones</strong>
                <small>Notas y aprendizajes guardados por periodo</small>
              </div>
            </a>
            <a href="timeline.html" class="drawer-link">
              <span class="d-icon">🚩</span>
              <div>
                <strong>Línea de Vida</strong>
                <small>Registro cronológico de tus metas y recuerdos</small>
              </div>
            </a>
            <a href="patterns.html" class="drawer-link">
              <span class="d-icon">📈</span>
              <div>
                <strong>Patrones de Vida</strong>
                <small>Mapa de calor de la densidad de tus vivencias</small>
              </div>
            </a>
          </div>

          <!-- Dimensión 3: El Mundo -->
          <div class="drawer-group">
            <div class="drawer-group-title">🌍 DIMENSIÓN DEL MUNDO</div>
            <a href="mundo.html" class="drawer-link">
              <span class="d-icon">🌐</span>
              <div>
                <strong>El Mundo Ahora</strong>
                <small>Población en tiempo real, clima y efemérides</small>
              </div>
            </a>
            <a href="compare.html" class="drawer-link">
              <span class="d-icon">👥</span>
              <div>
                <strong>Comparador de Vidas</strong>
                <small>Distancia temporal y sincronicidades entre dos fechas</small>
              </div>
            </a>
          </div>
        </div>

        <div class="drawer-footer">
          <p style="margin-bottom: 6px; font-size: 0.82rem; color: #cbd5e1;">Desarrollado por <a href="https://juan.cabellosalirrosas.com" target="_blank" rel="noopener noreferrer" style="color: #f5c358; font-weight: 600; text-decoration: none;">Xavier Cabello</a></p>
          <p style="opacity: 0.7; font-size: 0.72rem;">🔒 100% Privado · Procesado únicamente en tu navegador</p>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);

    // Eventos para abrir/cerrar
    function openDrawer() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Escuchar clicks en botones de menú globales
    document.addEventListener('click', function (e) {
      if (e.target.closest('#cosmic-nav-toggle') || e.target.closest('.cosmic-menu-btn')) {
        e.preventDefault();
        openDrawer();
      } else if (e.target.closest('.drawer-close') || e.target === drawer) {
        e.preventDefault();
        closeDrawer();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmicDrawer);
  } else {
    initCosmicDrawer();
  }
})();
