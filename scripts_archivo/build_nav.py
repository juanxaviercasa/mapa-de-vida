import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove the giant cosmic-header
html = re.sub(r'<header class="title-box cosmic-header">.*?</header>', '', html, flags=re.DOTALL)

# 2. Remove the old oracle-tabs that I injected
html = re.sub(r'<div class="oracle-tabs"[^>]*>.*?</div>', '', html, flags=re.DOTALL)

# 3. Extract the footer links
footer_match = re.search(r'<footer><p[^>]*>.*?</p>(.*?)</footer>', html, flags=re.DOTALL)
footer_links = footer_match.group(1) if footer_match else '<a href="dashboard.html">Dashboard</a><a href="timeline.html">Línea de vida</a><a href="journal.html">Diario</a>'

# 4. Create the new Top Nav HTML
top_nav_html = f'''
      <!-- MENÚ PRINCIPAL SUPERIOR -->
      <nav class="top-nav cosmic-nav" style="display: flex; align-items: center; justify-content: space-between; padding: 15px 30px; background: rgba(5,7,18,0.95); border-bottom: 1px solid rgba(212,168,67,0.2); position: sticky; top: 0; z-index: 100; flex-wrap: wrap; gap: 10px;">
        <div style="font-family: 'Cinzel', serif; font-weight: 700; color: #d4a843; font-size: 1.2rem; letter-spacing: 2px;">MAPA DE VIDA</div>
        <div class="nav-links" style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
          <button id="btn-tab-esoterico" class="nav-btn active" style="background:none; border:none; color:#d4a843; font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:0.95rem; cursor:pointer; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #d4a843; padding-bottom:4px;">Mapa Esotérico</button>
          <button id="btn-tab-clasico" class="nav-btn" style="background:none; border:none; color:rgba(238,232,213,0.6); font-family:'Space Grotesk', sans-serif; font-weight:600; font-size:0.95rem; cursor:pointer; text-transform:uppercase; letter-spacing:1px; padding-bottom:4px; border-bottom:2px solid transparent;">Culturas e Hitos</button>
          <span style="color: rgba(212,168,67,0.3);">|</span>
          <div class="footer-links-inline" style="display: flex; gap: 15px; font-size: 0.85rem;">
            {footer_links}
          </div>
        </div>
      </nav>
'''

# 5. Insert the new top_nav_html right after <main id="results-app-shell"...>
html = re.sub(r'(<main id="results-app-shell"[^>]*>)', r'\1\n' + top_nav_html, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("NAV INJECTED")
