import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the broken template literal line
broken_line = r'window\.d = parsearFecha\(\-\-\);'
# Actually it was written as parsearFecha(--) or parsearFecha(`); because the variables expanded to nothing.
# Let's just replace whatever window.d = parsearFecha is on that line.
js = re.sub(r'window\.d = parsearFecha\(.*?\);', 'window.d = parsearFecha(pData.y + "-" + String(pData.m).padStart(2,"0") + "-" + String(pData.d).padStart(2,"0"));', js)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("FIXED SYNTAX ERROR IN PORTAL.JS")
