import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add code to bridge the date into the old form and trigger render
bridge_code = '''
    // Transferir la fecha de la portada al formulario antiguo para que fecha.js haga su magia
    document.getElementById('day').value = d.dia;
    document.getElementById('month').value = d.mes;
    document.getElementById('year').value = d.anio;
    
    // Disparar render de fecha.js
    if(typeof render === 'function') render();
'''

if 'document.getElementById(\'day\').value = d.dia;' not in js:
    js = js.replace('seleccionarSeccion();', 'seleccionarSeccion();\n' + bridge_code)
    with open('portal.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("BRIDGE ADDED")
else:
    print("BRIDGE ALREADY THERE")
