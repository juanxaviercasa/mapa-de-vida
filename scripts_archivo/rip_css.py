with open('your-life.css', 'r', encoding='utf-8') as f:
    css = f.read()

marker = '/* \n   COSMIC MODE - MAPA DE VIDA ANCESTRAL'
if marker not in css:
    marker = 'COSMIC MODE'

idx = css.find(marker)
if idx != -1:
    idx = css.rfind('/*', 0, idx + 20)
    base_css = css[:idx]
    cosmic_css = css[idx:]
    with open('your-life.css', 'w', encoding='utf-8') as f:
        f.write(base_css)
    with open('cosmic.css', 'w', encoding='utf-8') as f:
        f.write(cosmic_css)
    print("SEPARATED CSS")
else:
    print("COULD NOT FIND MARKER")
