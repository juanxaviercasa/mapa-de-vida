import re
with open('fecha.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the literal backtick-n
js = js.replace('}\
  var', '}\n  var')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(js)
