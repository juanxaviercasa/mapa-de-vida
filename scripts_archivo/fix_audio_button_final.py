import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the old #freq-label inside hero-text if it exists
html = re.sub(r'<div id="freq-label">.*?</div>', '', html, flags=re.DOTALL)

# 2. Add the glowing floating button
floating_btn = '''
  <button id="audio-btn" class="glowing-btn">
    <span class="icon"></span> Sintonizar Audio
  </button>
'''
if 'id="audio-btn"' not in html:
    html = html.replace('<!-- Men del Dashboard -->', floating_btn + '\n        <!-- Men del Dashboard -->')

# 3. Add CSS for it
css = '''
    .glowing-btn {
      position: fixed;
      bottom: 40px;
      left: 40px;
      z-index: 1000;
      background: rgba(10, 13, 26, 0.8);
      border: 1px solid rgba(212,168,67,0.5);
      border-radius: 30px;
      padding: 12px 24px;
      color: rgba(238,232,213,0.9);
      font-family: 'DM Mono', monospace;
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 20px rgba(212,168,67,0.2);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .glowing-btn:hover {
      box-shadow: 0 0 30px rgba(212,168,67,0.6);
      border-color: rgba(212,168,67,1);
      transform: translateY(-2px);
    }
    .glowing-btn.active {
      background: rgba(212,168,67,0.15);
      box-shadow: 0 0 40px rgba(212,168,67,0.8);
      border-color: rgba(212,168,67,1);
      color: #fff;
    }
'''
if '.glowing-btn' not in html:
    html = html.replace('</style>', css + '\n</style>')

# 4. Update the Javascript to use audio-btn
js = '''
    const freq = document.getElementById('audio-btn');
    if (freq) {
      freq.addEventListener('click', () => {
        if(window.AmbientAudio) {
          if(window.AmbientAudio.isPlaying()) {
            window.AmbientAudio.stop();
            freq.innerHTML = '<span class="icon"></span> Sintonizar Audio';
            freq.classList.remove('active');
          } else {
            window.AmbientAudio.start();
            freq.innerHTML = '<span class="icon"></span> Silenciar Audio <span id="chakra-indicator"></span>';
            freq.classList.add('active');
          }
        }
      });
    }
'''
# Replace the old JS listener
html = re.sub(r'const freq = document\.getElementById\(\'freq-label\'\).*?\}\);.*?\}', js, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Added floating button!")
