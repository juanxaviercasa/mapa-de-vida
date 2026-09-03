import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Let's just find the offending block by line context
lines = js.split('\n')
new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'MANEJO DEL PORTAL' in line:
        new_lines.append(line)
        # Skip the next two lines if they contain '}' and '});'
        if i + 2 < len(lines) and '}' in lines[i+1] and '});' in lines[i+2]:
            lines[i+1] = ''
            lines[i+2] = ''
    else:
        if line.strip() == '}' or line.strip() == '});':
            # Check if this is the stray one before GENERADOR PROCEDIMENTAL
            if i + 2 < len(lines) and 'GENERADOR PROCEDIMENTAL' in lines[i+2]:
                continue
            if i + 1 < len(lines) and 'GENERADOR PROCEDIMENTAL' in lines[i+1]:
                continue
        new_lines.append(line)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(new_lines))
print("Done manual parse")
