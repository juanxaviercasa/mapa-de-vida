with open('fecha.js', 'r', encoding='utf-8') as f:
    js = f.read()

# find literal backtick followed by n
js = js.replace('\
', '\n')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(js)
