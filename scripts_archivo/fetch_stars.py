import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

stars_script = None

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if 'star-canvas' in content and 'requestAnimationFrame' in content:
                    stars_script = content
        except:
            pass

if stars_script:
    with open('stars_recovered.js', 'w', encoding='utf-8') as f:
        f.write(stars_script)
    print("Found stars script!")
else:
    print("Could not find stars script")
