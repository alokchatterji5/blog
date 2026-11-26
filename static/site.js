// theme switcher, progress bar, copy buttons, tabs, TOC, home filter. No deps.
(()=>{
const h=document.documentElement,$=(s,r=document)=>[...r.querySelectorAll(s)];
const set=t=>{h.dataset.theme=t;localStorage.theme=t;$('#themes button').forEach(b=>b.classList.toggle('on',b.dataset.t===t))};
set(localStorage.theme||'workshop');
$('#themes button').forEach(b=>b.onclick=()=>set(b.dataset.t));
const bar=document.getElementById('progress');
if(bar)addEventListener('scroll',()=>{const d=h.scrollHeight-innerHeight;bar.style.width=(d>0?scrollY/d*100:0)+'%'},{passive:true});
$('pre').forEach(p=>{const b=document.createElement('button');b.className='copy';b.textContent='copy';b.onclick=()=>navigator.clipboard.writeText(p.innerText.replace(/^copy\n?/,'')).then(()=>{b.textContent='copied';setTimeout(()=>b.textContent='copy',1200)});p.appendChild(b)});
// tabs: <div class=tabs><section data-title="A">..</section>...</div>
$('.tabs').forEach(t=>{const secs=$(':scope>section',t),nav=document.createElement('nav');
 secs.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.dataset.title;b.onclick=()=>{secs.forEach((x,j)=>x.classList.toggle('on',i===j));$('button',nav).forEach((x,j)=>x.classList.toggle('on',i===j))};nav.appendChild(b)});
 t.prepend(nav);$('button',nav)[0].click()});
// TOC: <div class=toc></div> auto-filled from h2
$('.toc').forEach(t=>{$('article h2').forEach((h2,i)=>{h2.id=h2.id||'s'+i;const a=document.createElement('a');a.href='#'+h2.id;a.textContent=h2.textContent;t.appendChild(a)})});
// home filter
const chips=$('.chip');chips.forEach(c=>c.onclick=()=>{chips.forEach(x=>x.classList.toggle('on',x===c));$('.card[data-cat]').forEach(k=>k.style.display=(c.dataset.f==='all'||k.dataset.cat===c.dataset.f)?'':'none')});
})();
