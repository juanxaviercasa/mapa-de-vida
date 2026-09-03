import re

with open('portal.js', 'r', encoding='utf-8') as f:
    js = f.read()

regex = r'// Lógica de Pestañas.*'
new_logic = '''
// Lógica del Menú Superior
document.addEventListener('DOMContentLoaded', () => {
  const btnEso = document.getElementById('btn-tab-esoterico');
  const btnCla = document.getElementById('btn-tab-clasico');
  const tabEso = document.getElementById('tab-content-esoterico');
  const tabCla = document.getElementById('tab-content-clasico');
  
  if (btnEso && btnCla) {
    btnEso.addEventListener('click', () => {
      btnEso.style.color = '#d4a843';
      btnEso.style.borderBottomColor = '#d4a843';
      
      btnCla.style.color = 'rgba(238,232,213,0.6)';
      btnCla.style.borderBottomColor = 'transparent';
      
      if(tabEso) tabEso.style.display = 'block';
      if(tabCla) tabCla.style.display = 'none';
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    btnCla.addEventListener('click', () => {
      btnCla.style.color = '#d4a843';
      btnCla.style.borderBottomColor = '#d4a843';
      
      btnEso.style.color = 'rgba(238,232,213,0.6)';
      btnEso.style.borderBottomColor = 'transparent';
      
      if(tabCla) tabCla.style.display = 'block';
      if(tabEso) tabEso.style.display = 'none';
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }
});
'''

js = re.sub(regex, new_logic.strip(), js, flags=re.DOTALL)

with open('portal.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("PORTAL JS UPDATED FOR NAV")
