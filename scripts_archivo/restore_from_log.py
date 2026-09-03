import os

log_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1294.log'

with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
cosmic_lines = [l for l in lines if 'cosmic-mode' in l or 'landing-' in l or 'start-' in l or 'portal' in l]

if cosmic_lines:
    with open('index.html', 'r', encoding='utf-8') as f:
        index_html = f.read()
    
    style_addition = '\n'.join(cosmic_lines) + '\nhtml { background: #0a0d1a !important; }\nbody { background: transparent !important; color: #eee8d5 !important; }'
    
    # Inject before </style>
    if '</style>' in index_html:
        index_html = index_html.replace('</style>', style_addition + '\n</style>')
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(index_html)
        print("Restored cosmic CSS to index.html successfully from log")
    else:
        print("No </style> tag found in index.html")
else:
    print("No cosmic lines found in log")
