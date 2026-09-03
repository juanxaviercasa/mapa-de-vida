import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will replace the previously appended logic
regex = r'// Lógica de Pestañas.*'
new_logic = '''
// Lógica de Pestañas
document.addEventListener('DOMContentLoaded', () => {
  const btnEso = document.getElementById('btn-tab-esoterico');
  const btnCla = document.getElementById('btn-tab-clasico');
  const tabEso = document.getElementById('tab-content-esoterico');
  const tabCla = document.getElementById('tab-content-clasico');
  
  if (btnEso && btnCla) {
    btnEso.addEventListener('click', () => {
      btnEso.classList.add('active');
      btnCla.classList.remove('active');
      tabEso.style.display = 'block';
      tabCla.style.display = 'none';
    });
    
    btnCla.addEventListener('click', () => {
      btnCla.classList.add('active');
      btnEso.classList.remove('active');
      tabCla.style.display = 'block';
      tabEso.style.display = 'none';
    });
  }
});
'''

js = re.sub(regex, new_logic.strip(), js, flags=re.DOTALL)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("SUCCESS TABS JS FIX")
