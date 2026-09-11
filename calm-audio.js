(function () {
  'use strict';

  var audioContext = null;
  var masterGain = null;
  var activeNodes = [];
  var timers = [];
  var playing = false;
  var stopTimer = null;
  var remainingTimer = null;

  var modeDefaults = {
    calm: { layers: ['rain', 'drone'], volume: 0.42 },
    meditate: { layers: ['breath', 'drone'], volume: 0.36 },
    focus: { layers: ['pink'], volume: 0.46 },
    rest: { layers: ['ocean', 'drone'], volume: 0.34 },
    binaural: { layers: ['binaural'], volume: 0.5 }
  };

  function addNode(node) {
    activeNodes.push(node);
    return node;
  }

  function createNoiseBuffer(context) {
    var length = context.sampleRate * 3;
    var buffer = context.createBuffer(1, length, context.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function connectNoise(context, output, type) {
    var source = addNode(context.createBufferSource());
    source.buffer = createNoiseBuffer(context);
    source.loop = true;
    var filter = context.createBiquadFilter();
    filter.type = type === 'rain' ? 'bandpass' : 'lowpass';
    filter.frequency.value = type === 'rain' ? 1800 : type === 'ocean' ? 420 : 700;
    filter.Q.value = type === 'rain' ? 0.35 : 0.7;
    source.connect(filter);
    filter.connect(output);
    source.start();
    return source;
  }

  function addNoiseLayer(context, output, type, gainValue) {
    var gain = context.createGain();
    gain.gain.value = gainValue;
    connectNoise(context, gain, type);
    gain.connect(output);
    if (type === 'ocean') {
      var lfo = addNode(context.createOscillator());
      var lfoGain = context.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = gainValue * 0.65;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();
    }
  }

  function addDrone(context, output, frequency, gainValue) {
    [frequency, frequency * 1.5, frequency * 0.5].forEach(function (hz, index) {
      var oscillator = addNode(context.createOscillator());
      var gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = hz;
      gain.gain.value = gainValue / (index + 1.5);
      oscillator.connect(gain);
      gain.connect(output);
      oscillator.start();
    });
  }

  function addBinaural(context, output, beat) {
    var merger = context.createChannelMerger(2);
    [200, 200 + beat].forEach(function (frequency, channel) {
      var oscillator = addNode(context.createOscillator());
      var gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.16;
      oscillator.connect(gain);
      gain.connect(merger, 0, channel);
      oscillator.start();
    });
    merger.connect(output);
  }

  function addBreath(context, output) {
    var oscillator = addNode(context.createOscillator());
    var gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 220;
    gain.gain.value = 0;
    oscillator.connect(gain);
    gain.connect(output);
    oscillator.start();
    function pulse() {
      if (!playing) return;
      var now = context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 4);
      gain.gain.linearRampToValueAtTime(0, now + 8);
      timers.push(setTimeout(pulse, 8000));
    }
    pulse();
  }

  function signal(context, frequency, duration) {
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.04);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start();
    oscillator.stop(context.currentTime + duration + 0.05);
  }

  function addChakraCycle(context, output) {
    var frequencies = [396, 417, 528, 639, 741, 852, 963];
    var index = 0;
    function play() {
      if (!playing) return;
      addDrone(context, output, frequencies[index], 0.12);
      if (window.updateChakraUI) window.updateChakraUI(index);
      index = (index + 1) % frequencies.length;
      timers.push(setTimeout(play, 12000));
    }
    play();
  }

  function start(options) {
    if (playing) return;
    options = options || {};
    var mode = options.mode || 'calm';
    var layers = options.layers && options.layers.length ? options.layers : modeDefaults[mode].layers;
    var volume = Math.max(0, Math.min(1, Number(options.volume || 0.28)));
    var duration = Math.max(1, Number(options.duration || 10)) * 60;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0, audioContext.currentTime);
    masterGain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 2);
    masterGain.connect(audioContext.destination);
    playing = true;
    if (options.onTick) options.onTick(duration);
    signal(audioContext, 440, 0.22);

    layers.forEach(function (layer) {
      if (layer === 'rain') addNoiseLayer(audioContext, masterGain, 'rain', 0.5);
      if (layer === 'pink') addNoiseLayer(audioContext, masterGain, 'pink', 0.45);
      if (layer === 'ocean') addNoiseLayer(audioContext, masterGain, 'ocean', 0.5);
      if (layer === 'drone') addDrone(audioContext, masterGain, 174, 0.18);
      if (layer === 'breath') addBreath(audioContext, masterGain);
      if (layer === 'chakra') addChakraCycle(audioContext, masterGain);
      if (layer === 'binaural') addBinaural(audioContext, masterGain, Number(options.binauralBeat) || 6);
    });
    var startedAt = Date.now();
    remainingTimer = setInterval(function () {
      var remaining = Math.max(0, duration - Math.floor((Date.now() - startedAt) / 1000));
      if (options.onTick) options.onTick(remaining);
      if (remaining === 10) signal(audioContext, 660, 0.32);
    }, 1000);
    stopTimer = setTimeout(stop, duration * 1000);
    updateButton(true);
  }

  function stop() {
    if (!playing) return;
    playing = false;
    timers.forEach(clearTimeout);
    timers = [];
    if (stopTimer) clearTimeout(stopTimer);
    if (remainingTimer) clearInterval(remainingTimer);
    remainingTimer = null;
    if (masterGain && audioContext) {
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5);
      setTimeout(function () {
        activeNodes.forEach(function (node) { try { node.stop(); } catch (error) {} });
        activeNodes = [];
        if (audioContext) audioContext.close();
        audioContext = null;
        masterGain = null;
      }, 1600);
    }
    updateButton(false);
  }

  function updateButton(state) {
    var button = document.getElementById('calm-play');
    if (button) button.textContent = state ? 'Pausar ambiente' : 'Reproducir ambiente';
    document.body.classList.toggle('calm-playing', state);
  }

  window.CalmAudio = {
    start: start,
    stop: stop,
    isPlaying: function () { return playing; },
    defaults: modeDefaults
  };
}());
