import json
import re

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'
fecha_content = None
max_len = 0

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if 'var storageKey' in content and 'function render()' in content:
                    if len(content) > max_len:
                        fecha_content = content
                        max_len = len(content)
        except Exception as e:
            pass

if fecha_content:
    if fecha_content.startswith('Output:\n'):
        fecha_content = fecha_content[8:]
    with open('fecha.js', 'w', encoding='utf-8') as f:
        f.write(fecha_content)
    print("RESTORED FECHA.JS FROM TRANSCRIPT")
else:
    print("COULD NOT FIND FECHA.JS")
