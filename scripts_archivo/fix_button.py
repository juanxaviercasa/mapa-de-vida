with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The button is defined at the end of the file.
# I will extract it and place it BEFORE the <script> tags.

import re

# find the button
button_match = re.search(r'(<button id="audio-btn".*?</button>)', html, re.DOTALL)
if button_match:
    button_html = button_match.group(1)
    # remove it from current position
    html = html.replace(button_html, '')
    # place it right before <script src="ambient-audio.js"></script>
    html = html.replace('<script src="ambient-audio.js"></script>', button_html + '\n  <script src="ambient-audio.js"></script>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS")
else:
    print("BUTTON NOT FOUND")
