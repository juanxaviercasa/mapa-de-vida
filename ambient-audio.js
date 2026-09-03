// ambient-audio.js — Motor de sonido de chakras con Web Audio API
// Frecuencias sagradas de los 7 chakras
(function () {
  var CHAKRA_FREQUENCIES = [
    { hz: 396, name: 'Raíz',         color: '#FF0033' },
    { hz: 417, name: 'Sacral',       color: '#FF6600' },
    { hz: 528, name: 'Plexo Solar',  color: '#FFD700' },
    { hz: 639, name: 'Corazón',      color: '#00CC55' },
    { hz: 741, name: 'Garganta',     color: '#0088FF' },
    { hz: 852, name: 'Tercer Ojo',   color: '#6600CC' },
    { hz: 963, name: 'Corona',       color: '#CC00FF' }
  ];

  var ctx = null, masterGain = null, oscillators = [], isPlaying = false;
  var currentChakra = 0, cycleTimer = null;

  function createReverb(ctx) {
    var convolver = ctx.createConvolver();
    var rate = ctx.sampleRate, length = rate * 3;
    var impulse = ctx.createBuffer(2, length, rate);
    for (var i = 0; i < 2; i++) {
      var channel = impulse.getChannelData(i);
      for (var j = 0; j < length; j++) {
        channel[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / length, 2.5);
      }
    }
    convolver.buffer = impulse;
    return convolver;
  }

  function startAmbience() {
    if (isPlaying) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 3);

    var reverb = createReverb(ctx);
    var reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.4;
    reverb.connect(reverbGain);
    reverbGain.connect(ctx.destination);
    masterGain.connect(reverb);
    masterGain.connect(ctx.destination);

    // Capa 1: Drone fundamental del chakra actual
    function playChakraDrone(freq, duration) {
      var osc = ctx.createOscillator();
      var oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2);
      oscGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + duration - 2);
      oscGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.1);

      // Quinta armónica
      var osc2 = ctx.createOscillator();
      var osc2Gain = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = freq * 1.5;
      osc2Gain.gain.setValueAtTime(0, ctx.currentTime);
      osc2Gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
      osc2Gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + duration - 2);
      osc2Gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      osc2.connect(osc2Gain);
      osc2Gain.connect(masterGain);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + duration + 0.1);

      // Sub-tono (octava baja)
      var osc3 = ctx.createOscillator();
      var osc3Gain = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.value = freq * 0.5;
      osc3Gain.gain.setValueAtTime(0, ctx.currentTime);
      osc3Gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
      osc3Gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + duration - 2);
      osc3Gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
      osc3.connect(osc3Gain);
      osc3Gain.connect(masterGain);
      osc3.start(ctx.currentTime);
      osc3.stop(ctx.currentTime + duration + 0.1);
    }

    // Capa 2: Fondo de ruido suave tipo viento cósmico
    var bufferSize = ctx.sampleRate * 2;
    var noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var noiseData = noiseBuffer.getChannelData(0);
    for (var n = 0; n < bufferSize; n++) noiseData[n] = Math.random() * 2 - 1;
    var noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    var noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 200;
    noiseFilter.Q.value = 0.5;
    var noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.04;
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start();
    oscillators.push(noiseSource);

    var DURATION = 12;
    function cycleChakra() {
      var chakra = CHAKRA_FREQUENCIES[currentChakra];
      playChakraDrone(chakra.hz, DURATION);
      updateChakraUI(currentChakra);
      currentChakra = (currentChakra + 1) % CHAKRA_FREQUENCIES.length;
      cycleTimer = setTimeout(cycleChakra, (DURATION - 2) * 1000);
    }
    cycleChakra();
    isPlaying = true;
  }

  function stopAmbience() {
    if (!isPlaying) return;
    if (masterGain) {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      setTimeout(function () {
        oscillators.forEach(function(o) { try { o.stop(); } catch(e){} });
        oscillators = [];
        clearTimeout(cycleTimer);
        if (ctx) { ctx.close(); ctx = null; }
      }, 1600);
    }
    isPlaying = false;
  }

  function updateChakraUI(index) {
    var dots = [];
    var indicator = document.getElementById('chakra-indicator');
    for(var i=1; i<=7; i++) {
      var g = document.getElementById('node-' + i);
      if(g) {
        var glow = g.querySelector('.glow');
        if(glow) {
          if (i - 1 === index) {
            glow.setAttribute('opacity', '0.6');
            glow.setAttribute('r', '35');
          } else {
            glow.setAttribute('opacity', '0.15');
            glow.setAttribute('r', '30');
          }
        }
      }
    }
    if (indicator) {
      indicator.textContent = '♪ ' + CHAKRA_FREQUENCIES[index].hz + ' Hz — ' + CHAKRA_FREQUENCIES[index].name;
      indicator.style.color = CHAKRA_FREQUENCIES[index].color;
    }
  }

  // Exponer al DOM
  window.AmbientAudio = { start: startAmbience, stop: stopAmbience, isPlaying: function() { return isPlaying; } };
})();


