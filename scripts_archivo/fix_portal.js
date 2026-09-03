const fs = require('fs');
let js = fs.readFileSync('portal.js', 'utf8');

// The file has a syntax error around line 203 which looks like:
//   }
// });
// function generarSignificadoMistico

js = js.replace(/[\s\S]*?(function generarSignificadoMistico)/, '\'); 

// Wait, NO! I need to keep everything BEFORE the error too!
// The error is after limpiarTexto.
const parts = js.split('function generarSignificadoMistico');
if (parts.length > 1) {
    let before = parts[0];
    let after = 'function generarSignificadoMistico' + parts[1];
    
    // find the end of limpiarTexto
    const cleanIdx = before.indexOf('function limpiarTexto');
    if (cleanIdx !== -1) {
        const endOfClean = before.indexOf('}', cleanIdx) + 1;
        before = before.substring(0, endOfClean);
    }
    fs.writeFileSync('portal.js', before + '\n\n' + after);
    console.log("Fixed!");
}
