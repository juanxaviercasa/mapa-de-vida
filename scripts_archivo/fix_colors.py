import re

# 1. Update portal.js to remove cosmic-mode when entering results
with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

if "document.body.classList.remove('cosmic-mode');" not in js:
    js = js.replace(
        "document.body.style.overflow = 'auto';",
        "document.body.style.overflow = 'auto';\n      document.body.classList.remove('cosmic-mode');"
    )

# Also update the dash-content to have a dark background card so it looks good on light theme
js = js.replace(
    '''<div class="dash-section" style="margin-bottom: 50px;">''',
    '''<div class="dash-section" style="margin-bottom: 50px; background: #0a0d1a; padding: 30px; border-radius: 12px; border: 1px solid rgba(212,168,67,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.1);">'''
)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("PORTAL FIXED")
