import re

with open('fecha.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove cosmic-mode from body in fecha.html so it returns to its native light theme
html = html.replace('<body class="cosmic-mode">', '<body>')

with open('fecha.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("COSMIC MODE REMOVED FROM FECHA.HTML")
