import json

path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

lines_found = False
content_extracted = ''

with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                text = data.get('content', '')
                if 'var storageKey' in text and 'function render()' in text and '(function () {' in text:
                    for chunk in text.split('\n'):
                        if chunk.startswith('(function () {'):
                            content_extracted = chunk + '\n'
                            lines_found = True
                        elif lines_found:
                            content_extracted += chunk + '\n'
                            if chunk.startswith('})();'):
                                lines_found = False
                                break
                    if len(content_extracted) > 1000:
                        break # Found it
        except Exception:
            pass

if len(content_extracted) > 1000:
    # Now let's inject our fix correctly at the bottom before '})();'
    addition = '''
  // -- CONEXION CON PORTADA --
  try {
      let pData = localStorage.getItem('portal_data');
      if (pData) {
          pData = JSON.parse(pData);
          if (pData.d && pData.m && pData.y) {
              document.getElementById('day').value = parseInt(pData.d);
              document.getElementById('month').value = parseInt(pData.m);
              document.getElementById('year').value = parseInt(pData.y);
              // Trigger render automatically
              document.getElementById('year').dispatchEvent(new Event('input'));
          }
      }
  } catch(e) {}
'''
    
    # We place it right before the last '})();'
    final_js = content_extracted.rsplit('})();', 1)[0] + addition + '\n})();\n'
    
    with open('fecha.js', 'w', encoding='utf-8') as f:
        f.write(final_js)
    print("SUCCESS")
else:
    print("FAILED")

