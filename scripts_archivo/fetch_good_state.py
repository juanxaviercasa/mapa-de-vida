import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

css_content = None
index_js_content = None

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                
                # Check if it's the view_file output of your-life.css
                if '/* Layout de Cuadrícula */' in content and '.identity-grid' in content and 'body.cosmic-mode' not in content:
                    # We might have found an early version of the CSS
                    css_content = content
                    
                # Check index.js
                if "document.getElementById('dob-form').addEventListener('submit'" in content:
                    index_js_content = content
                    
            if data.get('type') == 'USER_INPUT':
                prompt = data.get('content', '')
                if 'Bien, vamos a hacer este proyecto que sea inmersivo' in prompt:
                    # STOP HERE! We want the CSS right before this prompt.
                    break
        except Exception as e:
            pass

if css_content:
    with open('your-life_recovered.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("RECOVERED CSS")
else:
    print("CSS NOT FOUND")
    
if index_js_content:
    with open('index_recovered.js', 'w', encoding='utf-8') as f:
        f.write(index_js_content)
    print("RECOVERED INDEX.JS")
