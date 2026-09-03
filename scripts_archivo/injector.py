import re

with open('fecha.html', 'r', encoding='utf-8') as f:
    fecha_html = f.read()

match = re.search(r'(<section id="identity-output".*?</footer>)', fecha_html, re.DOTALL)
if match:
    sections = match.group(1)
    
    with open('index.html', 'r', encoding='utf-8') as f:
        idx_html = f.read()
    
    # regex to find dash-content div and its closing tag
    new_idx = re.sub(
        r'(<div class="dash-panel" id="dash-content">.*?</div>)',
        r'\1\n\n    <!-- === MÓDULOS DE FECHA.JS (ORIGINALES) === -->\n    <div id="fecha-modules-container" style="display:none; width: 100%; margin: 0 auto; margin-top: 50px;">\n' + sections.replace('\\', '\\\\') + '\n    </div>',
        idx_html,
        flags=re.DOTALL
    )
        
    new_idx = new_idx.replace('id="start-month"', 'id="month"')
    new_idx = new_idx.replace('id="start-day"', 'id="day"')
    new_idx = new_idx.replace('id="start-year"', 'id="year"')
    
    if '<script src="portal.js"></script>' in new_idx and '<script src="fecha.js"></script>' not in new_idx:
        new_idx = new_idx.replace('<script src="portal.js"></script>', '<script src="fecha.js"></script>\n  <script src="portal.js"></script>')
        
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_idx)
    print('INJECTED SUCESSFULLY')
