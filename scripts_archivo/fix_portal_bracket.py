import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the dangling closing braces
js = js.replace('''//  MANEJO DEL PORTAL 

  }
});''', '//  MANEJO DEL PORTAL ')

# There might be some garbled text from utf8
js = re.sub(r'// \? MANEJO DEL PORTAL \?\s*\}\s*\n\}\);', '//', js)
js = re.sub(r'//  MANEJO DEL PORTAL \s*\}\s*\n\}\);', '//', js)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Dangling braces removed")
