import re
import os

# 1. READ FECHA.HTML ORIGINAL
with open('fecha.html', 'r', encoding='utf-8') as f:
    fecha_html = f.read()

# 2. INJECT DASH-CONTENT INTO FECHA.HTML
# Encontramos donde inyectar el módulo esotérico (después del setup-panel)
injection_marker = '</section>'
if 'id="identity-output"' in fecha_html:
    # insert before identity-output
    parts = fecha_html.split('<section id="identity-output"')
    if len(parts) == 2:
        new_fecha = parts[0] + '<!-- Módulo Esotérico -->\n      <div id="dash-content"></div>\n      <section id="identity-output"' + parts[1]
        
        # Make sure portal.js is loaded
        if 'portal.js' not in new_fecha:
            new_fecha = new_fecha.replace('<script src="index.js"></script>', '<script src="portal.js"></script>\n  <script src="index.js"></script>')
            
        with open('fecha.html', 'w', encoding='utf-8') as f:
            f.write(new_fecha)

# 3. CREATE CLEAN INDEX.HTML
# We will use the current index.html but strip EVERYTHING related to results
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# We only keep up to <!-- === RESULTADOS === -->
if '<!-- === RESULTADOS === -->' in index_html:
    index_clean = index_html.split('<!-- === RESULTADOS === -->')[0]
    # We close the body and html
    index_clean += '''
  <script src="ambient-audio.js"></script>
  <script src="portal.js"></script>
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
        const tt = document.getElementById('chakra-tt');
        tt.style.setProperty('--c-color', node.dataset.color || '#fff');
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
    if(mb) {
      mb.addEventListener('click', () => {
        if(mb.classList.contains('on')) {
          mb.textContent = '♪';
          mb.classList.remove('on');
        } else {
          mb.textContent = '▶♪';
          mb.classList.add('on');
        }
      });
    }
  </script>
</body>
</html>
'''
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_clean)

# 4. FIX PORTAL.JS SO IT REDIRECTS FROM INDEX AND RENDERS IN FECHA
with open('portal.js', 'r', encoding='utf-8') as f:
    portal_js = f.read()

new_portal_js = '''
// Lógica compartida o específica por página
document.addEventListener('DOMContentLoaded', () => {
    
    // SI ESTAMOS EN LA PORTADA (index.html)
    const startForm = document.getElementById('start-form');
    if (startForm) {
        startForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let n = document.getElementById('start-name').value.trim();
            let s = document.getElementById('start-surname').value.trim();
            let d = document.getElementById('day').value;
            let m = document.getElementById('month').value; // Wait, IDs are day/month/year!
            let y = document.getElementById('year').value;
            
            // Guardamos en localStorage para que fecha.html lo lea
            localStorage.setItem('portal_data', JSON.stringify({n, s, d, m, y}));
            localStorage.setItem('dob', JSON.stringify({d: parseInt(d), m: parseInt(m), y: parseInt(y)})); // Para compatibilidad con fecha.js
            
            // Redirigir a resultados
            window.location.href = 'fecha.html';
        });
    }

    // SI ESTAMOS EN RESULTADOS (fecha.html)
    const dashContent = document.getElementById('dash-content');
    if (dashContent) {
        let pData = localStorage.getItem('portal_data');
        if (pData) {
            pData = JSON.parse(pData);
            
            // Cargar conocimiento esotérico (las funciones de numerología, etc)
            // Aquí podemos reusar las funciones que ya teníamos en portal.js
            cargarConocimiento();
            
            // Recreamos el objeto d que espera seleccionarSeccion
            window.d = parsearFecha(${pData.y}--);
            window.nombre = pData.n;
            window.apellido = pData.s;
            
            seleccionarSeccion();
            
            // Limpiar para que si recarga o vuelve al inicio esté vacío
            // localStorage.removeItem('portal_data'); 
            // localStorage.removeItem('dob');
        }
    }
});
'''

# Extraemos las funciones lógicas de portal.js (parsearFecha, calcularNumero, etc)
logic_match = re.search(r'(function parsearFecha.*?)</script>', portal_js, flags=re.DOTALL)
if not logic_match:
    # just extract everything except DOMContentLoaded
    logic_part = re.sub(r'document\.addEventListener\(\'DOMContentLoaded\'.*?\}\);', '', portal_js, flags=re.DOTALL)
else:
    logic_part = logic_match.group(1)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(new_portal_js + '\n' + logic_part)

print("SPLIT ARCHITECTURE COMPLETE")
