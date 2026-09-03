with open('fecha.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('}
  var monthNames', '}\n  var monthNames')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(js)
