import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'
found = False

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                # Looking for a button or SVG related to audio
                if 'btn-audio' in content or 'audio-toggle' in content or 'play-sound' in content or 'sound-btn' in content:
                    lines = content.split('\n')
                    for i, l in enumerate(lines):
                        if 'audio' in l.lower() or 'sound' in l.lower():
                            print("FOUND:", l.strip())
                            found = True
        except:
            pass

if not found:
    print("No audio button found in transcript")
