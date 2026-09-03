with open('fecha.js', 'rb') as f:
    raw = f.read()

# If it has an odd number of bytes, truncate the last byte to allow utf-16le decoding
if len(raw) % 2 != 0:
    raw = raw[:-1]

text = raw.decode('utf-16le', errors='ignore')

# Now fix the issue that started all this
text = text.replace('}\
  var monthNames', '}\n  var monthNames')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(text)
