import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Fix the CSS for the homepage that was stripped from your-life.css
if 'html:has(body.cosmic-mode)' not in html:
    css_fix = '''
    /* FIX PARA MODO COSMICO HOMEPAGE */
    html:has(body.cosmic-mode) { background: #0a0d1a !important; }
    body.cosmic-mode { background: transparent !important; color: #eee8d5 !important; }
    '''
    html = html.replace('</style>', css_fix + '\n  </style>')

# 2. Fix the duplicate <main> tag and broken structure
# Find where the homepage ends
split_marker = '<!-- === RESULTADOS === -->'
if split_marker in html:
    homepage_part = html.split(split_marker)[0]
    
    # Read the pristine main from fecha.html
    with open('fecha.html', 'r', encoding='utf-8') as f:
        fecha_html = f.read()
    
    match_main = re.search(r'(<main class="app-shell cultural-page">.*?</main>)', fecha_html, flags=re.DOTALL)
    pristine_main = match_main.group(1)
    
    pristine_main = pristine_main.replace('<main class="app-shell cultural-page">', '<main id="results-app-shell" class="app-shell cultural-page" style="display:none; position:relative; z-index:10; margin-top: 60px;">\n      <!-- Módulo Esotérico -->\n      <div id="dash-content"></div>')
    
    # Scripts to append at the end
    scripts = '''
  <script src="ambient-audio.js"></script>
  <script src="fecha.js"></script>
  <script src="portal.js"></script>
  <script src="index.js"></script>
  <script>
    var CHAKRA_INFO = {
      7: { name:'Sahasrara', title:'Chakra Corona', desc:'Conexión espiritual pura, sabiduría cósmica, trascendencia y la glándula pineal.' },
      6: { name:'Ajna', title:'Tercer Ojo', desc:'Intuición, claridad mental, percepción más allá del mundo físico.' },
      5: { name:'Vishuddha', title:'Chakra Garganta', desc:'Comunicación, verdad, autoexpresión, autenticidad.' },
      4: { name:'Anahata', title:'Chakra Corazón', desc:'Amor incondicional, compasión, sanación, paz interior.' },
      3: { name:'Manipura', title:'Plexo Solar', desc:'Poder personal, voluntad, confianza, fuego transformador.' },
      2: { name:'Svadhisthana', title:'Chakra Sacro', desc:'Creatividad, emociones, sexualidad, fluidez.' },
      1: { name:'Muladhara', title:'Chakra Raíz', desc:'Supervivencia, estabilidad, seguridad, conexión con la tierra.' }
    };

    document.querySelectorAll('.c-node').forEach(node => {
      node.addEventListener('mouseenter', (e) => {
        const info = CHAKRA_INFO[node.dataset.id];
        document.getElementById('tt-name').textContent = info.name;
        document.getElementById('tt-title').textContent = info.title;
        document.getElementById('tt-desc').textContent = info.desc;
        const color = node.dataset.color || '#fff';
        const tt = document.getElementById('chakra-tt');
        tt.style.setProperty('--c-color', color);
        
        const rect = node.getBoundingClientRect();
        tt.style.left = rect.left + (rect.width/2) + 'px';
        tt.style.top = rect.top + 'px';
        tt.classList.add('visible');
      });
      node.addEventListener('mouseleave', () => {
        document.getElementById('chakra-tt').classList.remove('visible');
      });
    });

    const mb = document.getElementById('mb');
    mb.addEventListener('click', () => {
      if(mb.classList.contains('on')) {
        mb.textContent = '♪';
        mb.classList.remove('on');
      } else {
        mb.textContent = '▶♪';
        mb.classList.add('on');
      }
    });
  </script>
</body>
</html>
'''
    
    # Combine
    new_html = homepage_part + split_marker + '\n' + pristine_main + '\n' + scripts
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("HTML FIXED AND REBUILT")
else:
    print("Could not find marker")
