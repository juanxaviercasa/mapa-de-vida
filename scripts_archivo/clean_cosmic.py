import os
import re

# 1. Clean cosmic-mode class from ALL html files EXCEPT index.html
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for file in html_files:
    if file == 'index.html': continue
    
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'cosmic-mode' in content:
        content = content.replace('class="cosmic-mode"', '')
        content = content.replace('class=" cosmic-mode"', '')
        content = content.replace(' cosmic-mode', '')
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {file}")

# 2. Extract cosmic CSS from your-life.css
with open('your-life.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to remove these lines:
# html:has(body.cosmic-mode) { background: #0a0d1a !important; }
# body.cosmic-mode { background: transparent !important; color: #eee8d5 !important; }
css_lines = css.split('\n')
new_css = []
cosmic_css = []
for line in css_lines:
    if 'cosmic-mode' in line or 'landing-' in line or 'start-' in line or 'portal' in line:
        cosmic_css.append(line)
    else:
        new_css.append(line)

with open('your-life.css', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_css))
print("Cleaned your-life.css")

# 3. Inject the cosmic CSS into index.html <style>
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

style_block = f"<style>\n{chr(10).join(cosmic_css)}\nhtml {{ background: #0a0d1a !important; }}\nbody {{ background: transparent !important; color: #eee8d5 !important; }}\n</style>"

if '<style>' not in index_html:
    index_html = index_html.replace('</head>', f'{style_block}\n</head>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    print("Injected CSS into index.html")
