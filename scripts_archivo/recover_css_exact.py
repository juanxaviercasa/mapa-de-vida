import json
import re

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

# We want the content of your-life.css before 19:00 today.
# We can find the tool output where we viewed your-life.css for the first time.

found = False
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if '/* Override de variables' not in content and '--paper' in content and 'body[data-theme=' in content:
                    # Is this your-life.css?
                    if '.identity-grid' in content and '.app-shell' in content:
                        with open('your-life_recovered.css', 'w', encoding='utf-8') as out:
                            # If content is a direct view_file output, we might need to strip some metadata if there's any, 
                            # but usually view_file returns exactly the file content.
                            out.write(content)
                        found = True
                        break
        except Exception as e:
            pass
            
if found:
    print("Found an original CSS!")
else:
    print("Not found yet")
