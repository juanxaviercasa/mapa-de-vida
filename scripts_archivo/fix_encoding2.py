with open('fecha.js', 'rb') as f:
    raw = f.read()

# PowerShell Set-Content without explicitly setting Encoding will use UTF-16 LE (2 bytes per char) in Windows.
# It will have a BOM (FF FE).
if raw.startswith(b'\xff\xfe'):
    text = raw.decode('utf-16')
else:
    text = raw.replace(b'\x00', b'').decode('utf-8', errors='ignore')

with open('fecha.js', 'w', encoding='utf-8') as f:
    f.write(text)
