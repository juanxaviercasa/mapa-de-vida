import re

with open('fecha.html', 'r', encoding='utf-8') as f:
    fecha_html = f.read()

# Extract the pristine main shell from fecha.html
match_main = re.search(r'(<main class="app-shell cultural-page">.*?</main>)', fecha_html, flags=re.DOTALL)
if not match_main:
    print("Could not find main in fecha.html")
    exit(1)

pristine_main = match_main.group(1)
# Modify it slightly to be hidden initially (so the homepage shows first)
pristine_main = pristine_main.replace('<main class="app-shell cultural-page">', '<main id="results-app-shell" class="app-shell cultural-page" style="display:none; position:relative; z-index:10;">\n      <!-- Módulo Esotérico -->\n      <div id="dash-content"></div>')

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Replace EVERYTHING from the start of the nav or main down to </main>
# We'll just replace everything between <main id="results-app-shell" and </main> first
broken_match = re.search(r'(<nav class="top-nav cosmic-nav".*?</main>)', index_html, flags=re.DOTALL)
if broken_match:
    index_html = index_html.replace(broken_match.group(1), pristine_main)
else:
    broken_match2 = re.search(r'(<main id="results-app-shell".*?</main>)', index_html, flags=re.DOTALL)
    if broken_match2:
        index_html = index_html.replace(broken_match2.group(1), pristine_main)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)
print('HTML REVERTED')
