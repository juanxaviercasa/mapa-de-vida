import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# find identity-output and its trailing divider
regex = r'(<section id="identity-output" class="identity-grid cosmic-fade" aria-live="polite"></section>\s*<div class="ritual-divider">.*?</div>)'

match = re.search(regex, html, flags=re.DOTALL)
if match:
    identity_block = match.group(1)
    # remove it from its current position
    html = html.replace(identity_block, '')
    
    # inject it at the end of tab-content-esoterico
    # tab-content-esoterico looks like:
    # <div id="tab-content-esoterico" class="tab-content-view">
    #     <div id="dash-content" style="margin-bottom: 50px;"></div>
    # </div>
    
    inject_target = '<div id="dash-content" style="margin-bottom: 50px;"></div>\n'
    html = html.replace(inject_target, inject_target + '        ' + identity_block + '\n')
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("MOVED IDENTITY BLOCK")
else:
    print("COULD NOT FIND IDENTITY BLOCK")
