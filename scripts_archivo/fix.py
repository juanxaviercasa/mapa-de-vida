import re

with open('fecha.html', 'r', encoding='utf-8') as f:
    fecha_html = f.read()

match = re.search(r'(<main class="app-shell cultural-page">.*?</main>)', fecha_html, re.DOTALL)
if match:
    app_shell_content = match.group(1)
    
    # Hide it initially
    app_shell_content = app_shell_content.replace('<main class="app-shell cultural-page">', '<main id="results-app-shell" class="app-shell" style="display:none; position:relative; z-index:10; margin-top: 60px;">')
    
    app_shell_content = app_shell_content.replace(
        '<section id="identity-output"',
        '<!-- NEW ESOTERIC CONTENT -->\n    <div id="dash-content" style="margin-bottom: 50px;"></div>\n    <section id="identity-output"'
    )
    
    with open('index.html', 'r', encoding='utf-8') as f:
        idx = f.read()
        
    part1, sep, part2 = idx.partition('<div class="dash-right">')
    sub_part1, sub_sep, sub_part2 = part2.partition('<script src="ambient-audio.js">')
    
    # We close the col-right and page divs!
    new_sub_part1 = '\n      </div>\n    </div>\n\n    <!-- === RESULTADOS === -->\n' + app_shell_content + '\n  '
    
    new_idx = part1 + new_sub_part1 + sub_sep + sub_part2
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_idx)
    print("SUCCESS")
else:
    print("COULD NOT FIND APP SHELL")
