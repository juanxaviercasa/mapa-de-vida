const fs = require('fs');
const js = fs.readFileSync('ambient-audio.js', 'utf-8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<html><body><button id="audio-btn"></button><div id="node-1"><div class="glow"></div></div></body></html>', { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

window.AudioContext = function() {
    this.createGain = () => ({ gain: { setValueAtTime: ()=>{}, linearRampToValueAtTime: ()=>{} }, connect: ()=>{} });
    this.createConvolver = () => ({ connect: ()=>{} });
    this.createBuffer = () => ({ getChannelData: ()=>([]) });
    this.createOscillator = () => ({ frequency: { setValueAtTime: ()=>{}, value: 0 }, connect: ()=>{}, start: ()=>{}, stop: ()=>{} });
    this.createBufferSource = () => ({ connect: ()=>{}, start: ()=>{} });
    this.createBiquadFilter = () => ({ frequency: { value: 0 }, Q: { value: 0 }, connect: ()=>{} });
    this.destination = {};
    this.currentTime = 0;
    this.sampleRate = 44100;
};
window.webkitAudioContext = window.AudioContext;

try {
    dom.window.eval(js);
    window.AmbientAudio.start();
    console.log("SUCCESS");
} catch(e) {
    console.log("ERROR", e.message, e.stack);
}
