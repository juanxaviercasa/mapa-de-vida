import re

log1 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1772.log'
log2 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1778.log'
log3 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1787.log'

lines = []
for log in [log1, log2, log3]:
    try:
        with open(log, 'r', encoding='utf-8') as f:
            lines.extend(f.readlines())
    except:
        pass

# The files have 'Output:\n' followed by the text. Let's just grab the block between 'Output:\n' and '</SYSTEM_MESSAGE>'
fecha_lines = []
capturing = False
for line in lines:
    if line.startswith('Output:'):
        capturing = True
        continue
    if capturing and '</SYSTEM_MESSAGE>' in line:
        capturing = False
        continue
    if capturing:
        fecha_lines.append(line.replace('>\t', '').replace('>     ', '      ')) # Clean the grep highlights

if fecha_lines:
    # Just to be safe, since they might be fragments, let's just write the second block we captured which was the whole file? No, I used cat -Head and cat -Context, so they are overlapping chunks.
    pass

