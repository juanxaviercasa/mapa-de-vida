with open('fecha.js', 'rb') as f:
    raw = f.read()

# read as utf-16
try:
    text = raw.decode('utf-16')
except:
    text = raw.decode('utf-16le')

# fix the literal backtick issue
text = text.replace('}\
  var monthNames', '}\n  var monthNames')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(text)
