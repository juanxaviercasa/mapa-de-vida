import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

files_state = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                
                # Check for CSS
                if 'body {' in content and '.info-card' in content:
                    files_state['your-life.css'] = content
                
                # Check for fecha.html
                if 'id="calendar-output"' in content and '<html' in content:
                    files_state['fecha.html'] = content
                    
                # Check for fecha.js
                if 'function render()' in content and 'function card(' in content:
                    files_state['fecha.js'] = content
                    
            if data.get('type') == 'USER_INPUT':
                prompt = data.get('content', '')
                if 'Bien, vamos a hacer este proyecto que sea inmersivo' in prompt:
                    break
        except Exception as e:
            pass

for k, v in files_state.items():
    with open(k + '.backup', 'w', encoding='utf-8') as f:
        f.write(v)
    print(f"Restored {k}")
