import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# find <section class="panel setup-panel cosmic-portal"> and remove it
regex = r'<section class="panel setup-panel cosmic-portal">.*?</section>'
html = re.sub(regex, '', html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("REMOVED PANEL")
