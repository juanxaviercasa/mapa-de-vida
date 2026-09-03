import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add your-life-data to the save logic so the whole app works
if 'your-life-data' not in js:
    js = js.replace(
        "localStorage.setItem('dob', JSON.stringify({d: parseInt(d), m: parseInt(m), y: parseInt(y)}));",
        "localStorage.setItem('dob', JSON.stringify({d: parseInt(d), m: parseInt(m), y: parseInt(y)}));\n" +
        "            localStorage.setItem('your-life-data', JSON.stringify({ name: n, dob: { month: parseInt(m), day: parseInt(d), year: parseInt(y) } }));"
    )
    with open('portal.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Added your-life-data compatibility")
else:
    print("your-life-data already there")
