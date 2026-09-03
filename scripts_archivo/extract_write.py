import json

path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

fecha_content = None

with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                for call in data.get('tool_calls', []):
                    if call['name'] == 'write_to_file':
                        args = call.get('args', {})
                        if args.get('TargetFile', '').endswith('fecha.js'):
                            fecha_content = args.get('CodeContent')
        except Exception:
            pass

if fecha_content:
    with open('fecha_base.js', 'w', encoding='utf-8') as f:
        f.write(fecha_content)
    print("RESTORED FECHA_BASE.JS")
else:
    print("NOT FOUND")
