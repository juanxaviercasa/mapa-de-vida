with open('fecha.js', 'rb') as f:
    raw = f.read()
    
# Remove null bytes if it's UTF-16 LE disguised as UTF-8
text = raw.replace(b'\x00', b'').decode('utf-8', errors='ignore')

# Fix the backtick issue
text = text.replace('}\
  var', '}\n  var')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(text)
