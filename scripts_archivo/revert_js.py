import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the broken top nav/tab logic
tab_regex = r'// Lógica del Menú Superior.*'
js = re.sub(tab_regex, '', js, flags=re.DOTALL)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('JS REVERTED')
