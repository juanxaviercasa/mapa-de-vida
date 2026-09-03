import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if 'ambient-audio.js' in content and '<html' in content:
                    lines = content.split('\n')
                    for l in lines:
                        if 'audio' in l.lower() or 'play' in l.lower() or 'button' in l.lower():
                            print("HTML:", l.strip())
        except:
            pass
