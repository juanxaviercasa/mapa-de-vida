import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the dash-right and its contents from inside .page
dash_right_regex = r'\s*<div class="dash-right">.*?<div class="dash-panel" id="dash-content">\s*</div>\s*<!-- === MÓDULOS DE FECHA\.JS \(ORIGINALES\) === -->\s*<div id="fecha-modules-container".*?</div>\s*</div>'

match = re.search(dash_right_regex, html, re.DOTALL)
if match:
    dash_right_block = match.group(0)
    html = html.replace(dash_right_block, '')
    
    # We need to extract just the inside (dash-content and fecha-modules-container)
    inner_regex = r'(<div class="dash-panel" id="dash-content">\s*</div>\s*<!-- === MÓDULOS DE FECHA\.JS \(ORIGINALES\) === -->\s*<div id="fecha-modules-container".*?</div>)'
    inner_match = re.search(inner_regex, dash_right_block, re.DOTALL)
    if inner_match:
        inner_content = inner_match.group(1)
        
        # Strip the display:none and inline styles from fecha-modules-container so it flows naturally
        inner_content = re.sub(r'style="display:none; width: 100%; margin: 0 auto; margin-top: 50px;"', 'style="margin-top: 50px;"', inner_content)
        
        # 2. Append the app-shell container right after closing </div class="page">
        # Let's find closing of page. Wait, page contains col-left, col-center, col-right...
        # It's easier to just insert it before <script src="ambient-audio.js">
        
        app_shell_html = '\n  <!-- === CONTENEDOR ORIGINAL DE RESULTADOS === -->\n  <main class="app-shell" id="results-app-shell" style="display:none; position:relative; z-index: 10;">\n    ' + inner_content + '\n  </main>\n'
        
        html = html.replace('<script src="ambient-audio.js">', app_shell_html + '  <script src="ambient-audio.js">')

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print('HTML RESTRUCTURED SUCESSFULLY')
    else:
        print('COULD NOT FIND INNER CONTENT')
else:
    print('COULD NOT FIND DASH RIGHT')
