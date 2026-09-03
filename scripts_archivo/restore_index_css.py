import json

transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'

cosmic_lines = []

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('status') == 'OK':
                content = data.get('content', '')
                if 'html:has(body.cosmic-mode)' in content and '.landing-shell' in content:
                    # Found the CSS with the landing page stuff
                    lines = content.split('\n')
                    cosmic_lines = [l for l in lines if 'cosmic-mode' in l or 'landing-' in l or 'start-' in l or 'portal' in l]
        except:
            pass

if cosmic_lines:
    with open('index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
    
    style_addition = '\n'.join(cosmic_lines) + '\nhtml { background: #0a0d1a !important; }\nbody { background: transparent !important; color: #eee8d5 !important; }'
    
    # Inject before </style>
    if '</style>' in index_html:
        index_html = index_html.replace('</style>', style_addition + '\n</style>')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(index_html)
        print("Restored cosmic CSS to index.html successfully")
    else:
        print("No </style> tag found in index.html")
else:
    print("Could not find cosmic lines in transcript")
