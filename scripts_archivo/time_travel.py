import json
import re
import os

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

user_prompts = []
file_states = {}

# We will read the transcript line by line
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            
            # Keep track of file edits to know the latest state
            # Tools that modify files: replace_file_content, run_command (if writing), etc.
            # But the easiest way is to look for when the tool 'view_file' was called or when we wrote the whole file.
            
            # Let's just collect all user messages to see the timeline
            if data.get('type') == 'USER_INPUT':
                user_prompts.append(data.get('content', ''))
                
        except Exception as e:
            pass

print("USER PROMPTS TIMELINE:")
for i, p in enumerate(user_prompts):
    # Print the first 100 chars of each prompt to identify the moment
    print(f"[{i}] {p[:100].replace(chr(10), ' ')}")

