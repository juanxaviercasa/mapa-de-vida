import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I need to add the audio trigger and chakra UI to the inline script
audio_script = '''
    const freq = document.getElementById('freq-label');
    if (freq) {
      freq.addEventListener('click', () => {
        if(window.AmbientAudio) {
          if(window.AmbientAudio.isPlaying()) {
            window.AmbientAudio.stop();
            freq.textContent = '> Activa el sonido para sintonizar';
            freq.classList.remove('active');
          } else {
            window.AmbientAudio.start();
            freq.innerHTML = '> Sintonizando... <span id="chakra-indicator"></span>';
            freq.classList.add('active');
          }
        }
      });
    }
'''

if 'window.AmbientAudio.start()' not in html:
    html = html.replace('const mb = document.getElementById(\'mb\');', audio_script + '\n    const mb = document.getElementById(\'mb\');')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Added audio trigger!")
else:
    print("Audio trigger already there")
