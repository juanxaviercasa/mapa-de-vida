log1 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1772.log'
log2 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1778.log'
log3 = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1787.log'
log_script = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1766.log'
log_head = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\tasks\task-1760.log' # ?

def extract(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.read().split('\n')
    except:
        return []
    
    out = []
    capture = False
    for line in lines:
        if line == 'Output:':
            capture = True
            continue
        if capture and line == '</SYSTEM_MESSAGE>':
            capture = False
            break
        if capture:
            # remove grep match indicator '>'
            if line.startswith('>     '): line = '      ' + line[6:]
            elif line.startswith('> '): line = line[2:]
            out.append(line)
    return out

p1 = extract(log1)
p2 = extract(log2)
p3 = extract(log3)

# Actually, I can just read the whole diff from transcript.jsonl using json!
# The diff was printed in step_index 76!
import json
transcript_path = r'C:\Users\cabel\.gemini\antigravity\brain\7e73ed47-65fd-446a-acb9-df5730bb0d88\.system_generated\logs\transcript_full.jsonl'
full_file = None
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'PLANNER_RESPONSE':
                for tool in data.get('tool_calls', []):
                    if tool['name'] == 'write_to_file' and 'fecha.js' in tool['args'].get('TargetFile', ''):
                        full_file = tool['args']['CodeContent']
                        break
        except:
            pass

if full_file:
    with open('fecha.js', 'w', encoding='utf-8') as f:
        f.write(full_file)
    print("SUCCESS FROM WRITE_TO_FILE")
else:
    print("NO WRITE_TO_FILE FOUND")

