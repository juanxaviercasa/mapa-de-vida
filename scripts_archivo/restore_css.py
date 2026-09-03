import json
import re
import os

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

good_css = ""

with open(transcript_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in reversed(lines):
    try:
        data = json.loads(line)
        if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
            content = data.get('content', '')
            # Look for the last time we read your-life.css that had the landing page styles
            if '/* Landing cósmico */' in content and 'body.cosmic-mode .landing-body' in content:
                # We need to make sure we extract just the file content, not the whole log output if it's truncated or weird.
                # Actually, let's just find the section where I injected the landing CSS.
                pass
    except:
        pass

# Even simpler: I'll just look for the first time the file was modified today.
# Wait, I can just use PowerShell's history or just write the necessary CSS for the landing page.
