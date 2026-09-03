import re

with open('fecha.html', 'r', encoding='utf-8') as f:
    fecha_html = f.read()

# Extract the pristine main shell from fecha.html
match_main = re.search(r'(<main class="app-shell">.*?</main>)', fecha_html, flags=re.DOTALL)
if not match_main:
    print("Could not find main in fecha.html")
    exit(1)

pristine_main = match_main.group(1)
# Modify it slightly to be hidden initially (so the homepage shows first) and give it the ID portal.js expects
pristine_main = pristine_main.replace('<main class="app-shell">', '<main id="results-app-shell" class="app-shell" style="display:none; position:relative; z-index:10;">\n      <!-- Módulo Esotérico Nuevo -->\n      <div id="dash-content" style="margin-bottom: 50px;"></div>')

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace the broken main in index.html with the pristine one
# First find the broken main
broken_match = re.search(r'(<main id="results-app-shell".*?</main>)', index_html, flags=re.DOTALL)
if broken_match:
    index_html = index_html.replace(broken_match.group(1), pristine_main)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    print('HTML REVERTED TO PRISTINE STATE')
else:
    print('Could not find broken main in index.html')

