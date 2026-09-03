// stars.js — Motor de cosmos inmersivo para Mapa de Vida
// Capas: estrellas multicapa con parálax · cometas con cola · nebulosas pulsantes · polvo estelar
(function () {
  'use strict';

  var canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, RAF;

  // ── resize ──────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildNebulas();
    buildStars();
  }
  window.addEventListener('resize', resize);

  // ────────────────────────────────────────────────────────
  // 1. NEBULOSAS
  // ────────────────────────────────────────────────────────
  var nebulas = [];
  var NEBULA_DEFS = [
    { xFrac:0.12, yFrac:0.18, rx:340, ry:260, color:'rgba(120,0,200,',   baseA:0.055, phase:0.00 },
    { xFrac:0.82, yFrac:0.25, rx:300, ry:220, color:'rgba(0,60,180,',    baseA:0.05,  phase:1.80 },
    { xFrac:0.50, yFrac:0.62, rx:380, ry:280, color:'rgba(0,140,100,',   baseA:0.045, phase:0.90 },
    { xFrac:0.20, yFrac:0.80, rx:280, ry:200, color:'rgba(180,30,60,',   baseA:0.048, phase:2.40 },
    { xFrac:0.88, yFrac:0.72, rx:260, ry:210, color:'rgba(60,10,120,',   baseA:0.042, phase:3.10 },
    { xFrac:0.38, yFrac:0.10, rx:310, ry:180, color:'rgba(200,120,0,',   baseA:0.035, phase:1.30 },
    { xFrac:0.65, yFrac:0.90, rx:290, ry:200, color:'rgba(30,80,160,',   baseA:0.04,  phase:0.50 },
  ];

  function buildNebulas() {
    nebulas = NEBULA_DEFS.map(function(d) {
      return Object.assign({}, d, { x: W * d.xFrac, y: H * d.yFrac });
    });
  }

  function drawNebulas(t) {
    nebulas.forEach(function(n) {
      // Alpha pulsante lento
      var alpha = n.baseA + 0.018 * Math.sin(t * 0.0004 + n.phase);
      // Escalado lento (respiración)
      var scale = 1 + 0.06 * Math.sin(t * 0.00025 + n.phase);

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.scale(scale, scale * 0.72); // achatada para parecer nube
      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx);
      g.addColorStop(0,   n.color + (alpha * 1.6).toFixed(3) + ')');
      g.addColorStop(0.35, n.color + (alpha * 0.9).toFixed(3) + ')');
      g.addColorStop(0.7,  n.color + (alpha * 0.35).toFixed(3) + ')');
      g.addColorStop(1,   n.color + '0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, n.rx, n.rx, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ────────────────────────────────────────────────────────
  // 2. ESTRELLAS (3 capas con parálax)
  // ────────────────────────────────────────────────────────
  var layers = [];
  var LAYER_CFG = [
    { count:280, minR:0.3, maxR:0.9,  speed:0.008, alpha:0.5 },  // fondo lejano
    { count:160, minR:0.6, maxR:1.4,  speed:0.018, alpha:0.7 },  // capa media
    { count: 80, minR:1.0, maxR:2.2,  speed:0.035, alpha:0.9 },  // capa cercana
  ];
  var scrollY = 0;
  window.addEventListener('scroll', function() { scrollY = window.scrollY || 0; }, { passive:true });

  function buildStars() {
    layers = LAYER_CFG.map(function(cfg) {
      var stars = [];
      for (var i = 0; i < cfg.count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: cfg.minR + Math.random() * (cfg.maxR - cfg.minR),
          base: cfg.alpha * (0.4 + Math.random() * 0.6),
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 2.5,  // velocidad de parpadeo
          // color: mayoría blanco-azulado, algunos dorados/cálidos
          hue: Math.random() < 0.12 ? 45 : (Math.random() < 0.08 ? 200 : 0),
          sat: Math.random() < 0.2 ? 60 : 0,
        });
      }
      return { cfg:cfg, stars:stars };
    });
  }

  function drawStars(t) {
    layers.forEach(function(layer) {
      var parallax = scrollY * layer.cfg.speed;
      layer.stars.forEach(function(s) {
        var twinkle = s.base * (0.65 + 0.35 * Math.sin(t * 0.001 * s.speed + s.phase));
        ctx.save();
        ctx.globalAlpha = twinkle;
        if (s.sat > 0) {
          ctx.fillStyle = 'hsl(' + s.hue + ',' + s.sat + '%,90%)';
        } else {
          ctx.fillStyle = '#fff';
        }
        var px = s.x;
        var py = ((s.y - parallax % H) + H) % H;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Halo para estrellas grandes
        if (s.r > 1.4) {
          var g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 5);
          g.addColorStop(0, 'rgba(255,255,255,' + (twinkle * 0.4).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    });
  }

  // ────────────────────────────────────────────────────────
  // 3. COMETAS / SHOOTING STARS
  // ────────────────────────────────────────────────────────
  var comets = [];
  var lastCometTime = 0;
  var COMET_INTERVAL_MIN = 1800;   // ms mínimo entre cometas
  var COMET_INTERVAL_MAX = 4200;   // ms máximo
  var nextCometIn = 2000;

  var COMET_COLORS = [
    { head:'#FFFFFF', tail:'rgba(255,255,255,', glow:'rgba(200,220,255,' },
    { head:'#FFE066', tail:'rgba(255,200,80,',  glow:'rgba(255,180,40,' },
    { head:'#80DFFF', tail:'rgba(100,200,255,', glow:'rgba(60,180,255,' },
    { head:'#FF80CC', tail:'rgba(255,100,200,', glow:'rgba(200,60,180,' },
    { head:'#A0FF80', tail:'rgba(120,255,100,', glow:'rgba(80,220,80,' },
  ];

  function spawnComet() {
    var pal = COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)];
    // Aparece desde cualquier borde (no solo arriba)
    var edge = Math.floor(Math.random() * 3); // 0=top, 1=left, 2=right
    var sx, sy, angle;
    if (edge === 0) {
      sx = Math.random() * W;
      sy = -20;
      angle = (Math.PI * 0.2) + Math.random() * (Math.PI * 0.6); // hacia abajo
    } else if (edge === 1) {
      sx = -20;
      sy = Math.random() * H * 0.7;
      angle = -Math.PI * 0.15 + Math.random() * (Math.PI * 0.3); // hacia derecha
    } else {
      sx = W + 20;
      sy = Math.random() * H * 0.6;
      angle = Math.PI - (Math.PI * 0.15 + Math.random() * (Math.PI * 0.3)); // hacia izquierda
    }
    var speed = 4 + Math.random() * 7;
    var tailLen = 120 + Math.random() * 260;
    comets.push({
      x: sx, y: sy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      tail: tailLen,
      r: 2 + Math.random() * 2.5,
      pal: pal,
      alpha: 0,
      life: 0,
      maxLife: Math.floor((tailLen / speed) * 2.5 + 80),
      dead: false
    });
  }

  function updateComets(t, dt) {
    // Spawn
    if (t - lastCometTime > nextCometIn) {
      spawnComet();
      // A veces 2 cometas juntos
      if (Math.random() < 0.25) setTimeout(spawnComet, 300 + Math.random() * 400);
      lastCometTime = t;
      nextCometIn = COMET_INTERVAL_MIN + Math.random() * (COMET_INTERVAL_MAX - COMET_INTERVAL_MIN);
    }

    comets = comets.filter(function(c) { return !c.dead; });

    comets.forEach(function(c) {
      c.life++;
      // Fade in / fade out
      var lifeFrac = c.life / c.maxLife;
      c.alpha = lifeFrac < 0.08 ? lifeFrac / 0.08 :
                lifeFrac > 0.72 ? 1 - (lifeFrac - 0.72) / 0.28 : 1;

      if (c.life >= c.maxLife || c.x < -300 || c.x > W + 300 || c.y > H + 200) {
        c.dead = true; return;
      }
      c.x += c.vx;
      c.y += c.vy;

      // Dibujar cola
      ctx.save();
      ctx.globalAlpha = c.alpha;
      var angle = Math.atan2(c.vy, c.vx);
      var tx = c.x - Math.cos(angle) * c.tail;
      var ty = c.y - Math.sin(angle) * c.tail;

      // Cola gradiente con ancho variable
      var tailGrad = ctx.createLinearGradient(c.x, c.y, tx, ty);
      tailGrad.addColorStop(0,   c.pal.tail + '0.9)');
      tailGrad.addColorStop(0.3, c.pal.tail + '0.5)');
      tailGrad.addColorStop(0.7, c.pal.tail + '0.15)');
      tailGrad.addColorStop(1,   c.pal.tail + '0)');

      ctx.strokeStyle = tailGrad;
      ctx.lineCap = 'round';

      // Múltiples líneas de grosor decreciente para efecto volumétrico
      [5, 3, 1.5, 0.6].forEach(function(lw, li) {
        ctx.lineWidth = lw;
        ctx.globalAlpha = c.alpha * [0.12, 0.22, 0.45, 0.7][li];
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });

      // Glow difuso de la cabeza
      ctx.globalAlpha = c.alpha;
      var hg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * 8);
      hg.addColorStop(0,   c.pal.glow + '0.9)');
      hg.addColorStop(0.3, c.pal.glow + '0.45)');
      hg.addColorStop(0.7, c.pal.glow + '0.12)');
      hg.addColorStop(1,   c.pal.glow + '0)');
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 8, 0, Math.PI * 2);
      ctx.fill();

      // Núcleo brillante
      ctx.globalAlpha = c.alpha;
      ctx.fillStyle = c.pal.head;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();

      // Chispa central
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  // ────────────────────────────────────────────────────────
  // 4. POLVO ESTELAR / PARTÍCULAS FLOTANTES
  // ────────────────────────────────────────────────────────
  var dust = [];
  var DUST_COUNT = 120;

  function buildDust() {
    dust = [];
    for (var i = 0; i < DUST_COUNT; i++) {
      dust.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.05 - Math.random() * 0.12,  // deriva levemente hacia arriba
        alpha: 0.05 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        hue: [30, 200, 270, 340, 120][Math.floor(Math.random() * 5)],
      });
    }
  }

  function drawDust(t) {
    dust.forEach(function(p) {
      p.x += p.vx;
      p.y += p.vy;
      // wrap
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      var a = p.alpha * (0.6 + 0.4 * Math.sin(t * 0.0006 + p.phase));
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = 'hsl(' + p.hue + ',70%,80%)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ────────────────────────────────────────────────────────
  // 5. AURORAS / BANDAS DE COLOR SUAVES
  // ────────────────────────────────────────────────────────
  var auroras = [
    { yFrac:0.15, color:'rgba(80,0,160,', amp:30, freq:0.0003, phase:0.0 },
    { yFrac:0.55, color:'rgba(0,80,120,', amp:25, freq:0.00025, phase:1.8 },
    { yFrac:0.85, color:'rgba(100,0,80,', amp:20, freq:0.00035, phase:3.5 },
  ];

  function drawAuroras(t) {
    auroras.forEach(function(a) {
      var cy = H * a.yFrac + a.amp * Math.sin(t * a.freq + a.phase);
      var g = ctx.createLinearGradient(0, cy - 60, 0, cy + 60);
      g.addColorStop(0,   a.color + '0)');
      g.addColorStop(0.5, a.color + '0.03)');
      g.addColorStop(1,   a.color + '0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.rect(0, cy - 60, W, 120);
      ctx.fill();
    });
  }

  // ────────────────────────────────────────────────────────
  // LOOP PRINCIPAL
  // ────────────────────────────────────────────────────────
  var lastT = 0;
  function loop(t) {
    var dt = t - lastT;
    lastT = t;

    ctx.clearRect(0, 0, W, H);

    // Fondo base — gradiente cósmico profundo
    var bg = ctx.createRadialGradient(W*0.4, H*0.35, 0, W*0.5, H*0.5, Math.max(W,H)*0.85);
    bg.addColorStop(0,   '#0d1028');
    bg.addColorStop(0.45, '#06091a');
    bg.addColorStop(1,   '#030508');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawAuroras(t);
    drawNebulas(t);
    drawStars(t);
    drawDust(t);
    updateComets(t, dt);

    RAF = requestAnimationFrame(loop);
  }

  // ────────────────────────────────────────────────────────
  // INIT
  // ────────────────────────────────────────────────────────
  resize();
  buildDust();
  RAF = requestAnimationFrame(loop);

})();
