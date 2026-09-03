with open('fecha.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacement = '''document.getElementById('year').dispatchEvent(new Event('input'));'''
js = js.replace('setTimeout(render, 100);', replacement)

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(js)
