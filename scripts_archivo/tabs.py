import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the old header and the old setup-panel that contains the redundant date fields
regex_remove = r'(<header class="view-header">.*?</header>\s*<section class="panel setup-panel cosmic-portal">.*?</section>)'
html = re.sub(regex_remove, '', html, flags=re.DOTALL)

# 2. Add the Tabs UI and wrap the content
tabs_html = '''
      <!-- NUEVAS PESTAÑAS -->
      <div class="oracle-tabs" style="margin-bottom: 40px; border-radius: 8px; overflow: hidden; background: rgba(5,7,18,0.7); border: 1px solid rgba(212,168,67,0.3);">
         <button id="btn-tab-esoterico" class="active" style="padding:18px; font-size:1.1rem; flex:1; text-transform:uppercase; letter-spacing:2px; font-family:'Cinzel', serif;">? Mapa Esotérico</button>
         <button id="btn-tab-clasico" style="padding:18px; font-size:1.1rem; flex:1; text-transform:uppercase; letter-spacing:2px; font-family:'Cinzel', serif;">? Culturas e Hitos</button>
      </div>

      <div id="tab-content-esoterico" class="tab-content-view">
'''

# We need to wrap #dash-content in tab-content-esoterico
# And the rest in tab-content-clasico
# Let's find #dash-content
dash_content_html = '<div id="dash-content" style="margin-bottom: 50px;"></div>'

html = html.replace(
    dash_content_html, 
    tabs_html + '\n        ' + dash_content_html + '\n      </div>\n\n      <div id="tab-content-clasico" class="tab-content-view" style="display:none;">\n'
)

# 3. Close the tab-content-clasico at the end of the app-shell
html = html.replace('</main>', '      </div>\n  </main>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("SUCCESS TABS")
