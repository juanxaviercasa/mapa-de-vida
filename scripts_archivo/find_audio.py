import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                content = data.get('content', '')
                if 'ambient-audio.js' in content or 'AmbientAudio' in content:
                    pass # maybe print?
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if ('ambient-audio.js' in content or 'AmbientAudio' in content) and 'class=' in content:
                    lines = content.split('\n')
                    for l in lines:
                        if 'button' in l.lower() or 'audio' in l.lower() or 'btn' in l.lower() or 'click' in l.lower():
                            if 'html' in l.lower() or '<' in l:
                                print(l.strip())
        except:
            pass
