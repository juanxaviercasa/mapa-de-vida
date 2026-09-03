import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# We need to completely remove the block that causes the syntax error.
# The block is right after eturn fases[b]; \n} or limpiarTexto
# Let's search for the text between limpiarTexto and generarSignificadoMistico

match = re.search(r'(function limpiarTexto.*?\}).*?(function generarSignificadoMistico)', js, flags=re.DOTALL)
if match:
    js = js[:match.end(1)] + '\n\n' + js[match.start(2):]
    with open('portal.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Forced block removal")
else:
    print("Match not found")
