import re

with open('your-life.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the override block I added
override_idx = css.find('/* Override de variables para modo cósmico */')
if override_idx != -1:
    css = css[:override_idx]

# Remove the nav styles I added
nav_idx = css.find('/* Estilos para la barra de navegación superior */')
if nav_idx != -1:
    css = css[:nav_idx]

with open('your-life.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('CSS REVERTED TO ORIGINAL')
