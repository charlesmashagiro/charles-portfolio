const button=document.querySelector('.menu-button');
const links=document.querySelector('.nav-links');
button?.addEventListener('click',()=>{const open=links.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
links?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');button?.setAttribute('aria-expanded','false')}));

const checklist=[...document.querySelectorAll('[data-check]')];
const progressNumber=document.querySelector('#progress-number');
const progressFill=document.querySelector('#progress-fill');
const storageKey='charles-portfolio-career-progress';

function savedChecks(){
  try{return JSON.parse(localStorage.getItem(storageKey)||'[]')}catch{return []}
}

function updateProgress(){
  const selected=checklist.filter(item=>item.checked).map(item=>item.dataset.check);
  const percentage=checklist.length?Math.round((selected.length/checklist.length)*100):0;
  localStorage.setItem(storageKey,JSON.stringify(selected));
  if(progressNumber)progressNumber.textContent=`${percentage}%`;
  if(progressFill)progressFill.style.width=`${percentage}%`;
}

const selected=savedChecks();
checklist.forEach(item=>{
  item.checked=selected.includes(item.dataset.check);
  item.addEventListener('change',updateProgress);
});
document.querySelector('#reset-checklist')?.addEventListener('click',()=>{
  checklist.forEach(item=>{item.checked=false});
  updateProgress();
});
updateProgress();
