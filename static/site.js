// theme toggle (follows system until chosen), progress bar, copy buttons, tabs, TOC, filter, reveal, typed prompt. No deps.
(()=>{
const h=document.documentElement,$=(s,r=document)=>[...r.querySelectorAll(s)];
const mq=matchMedia('(prefers-color-scheme: light)');
const ok=t=>t==='dark'||t==='light';const cur=()=>ok(localStorage.theme)?localStorage.theme:(mq.matches?'light':'dark');
const paint=()=>{h.dataset.theme=cur();const b=document.getElementById('tt');if(b){b.textContent=h.dataset.theme==='dark'?'☀':'☾';b.title='Switch to '+(h.dataset.theme==='dark'?'light':'dark')+' theme';b.setAttribute('aria-label',b.title)}};
paint();mq.addEventListener('change',()=>{if(!ok(localStorage.theme))paint()});
const tt=document.getElementById('tt');if(tt)tt.onclick=()=>{localStorage.theme=h.dataset.theme==='dark'?'light':'dark';paint()};
const bar=document.getElementById('progress');
if(bar)addEventListener('scroll',()=>{const d=h.scrollHeight-innerHeight;bar.style.width=(d>0?scrollY/d*100:0)+'%'},{passive:true});
$('pre').forEach(p=>{const b=document.createElement('button');b.className='copy';b.textContent='copy';b.onclick=()=>navigator.clipboard.writeText(p.innerText.replace(/^copy\n?/,'')).then(()=>{b.textContent='copied';setTimeout(()=>b.textContent='copy',1200)});p.appendChild(b)});
$('.tabs').forEach(t=>{const secs=$(':scope>section',t),nav=document.createElement('nav');
 secs.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s.dataset.title;b.onclick=()=>{secs.forEach((x,j)=>x.classList.toggle('on',i===j));$('button',nav).forEach((x,j)=>x.classList.toggle('on',i===j))};nav.appendChild(b)});
 t.prepend(nav);$('button',nav)[0].click()});
$('.toc').forEach(t=>{$('article h2').forEach((h2,i)=>{h2.id=h2.id||'s'+i;const a=document.createElement('a');a.href='#'+h2.id;a.textContent=h2.textContent;t.appendChild(a)})});
const chips=$('.chip');chips.forEach(c=>c.onclick=()=>{chips.forEach(x=>x.classList.toggle('on',x===c));$('.card[data-cat]').forEach(k=>k.style.display=(c.dataset.f==='all'||k.dataset.cat===c.dataset.f)?'':'none')});
$('[data-go]').forEach(a=>a.addEventListener('click',()=>{const c=chips.find(x=>x.dataset.f===a.dataset.go);if(c)c.click()}));
// scroll reveal (content stays visible without JS: .rv is only hidden under .js)
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});$('.rv').forEach(e=>io.observe(e))}else $('.rv').forEach(e=>e.classList.add('in'));
// typed prompt
const ty=document.getElementById('typed');if(ty){const t=ty.dataset.text;if(matchMedia('(prefers-reduced-motion: reduce)').matches)ty.textContent=t;else{let i=0;const k=setInterval(()=>{ty.textContent=t.slice(0,++i);if(i>=t.length)clearInterval(k)},90)}}
})();
// hero rack: click a unit -> terminal "runs" its status; auto-cycles until the visitor clicks
(()=>{const units=[...document.querySelectorAll('.rack .unit')];if(!units.length)return;
const cmd=document.getElementById('tcmd'),out=document.getElementById('tout');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let timer,run=0,idx=0,user=false;
const show=u=>{units.forEach(x=>x.classList.toggle('on',x===u));const id=++run,text=u.dataset.cmd,lines=u.dataset.out.split('|');out.innerHTML='';
 if(reduce){cmd.textContent=text;lines.forEach(l=>out.insertAdjacentHTML('beforeend','<div class="l"></div>'));[...out.children].forEach((d,i)=>d.textContent=lines[i]);return}
 cmd.textContent='';let i=0;const t=setInterval(()=>{if(id!==run)return clearInterval(t);cmd.textContent=text.slice(0,++i);if(i>=text.length){clearInterval(t);lines.forEach((l,k)=>setTimeout(()=>{if(id===run){const d=document.createElement('div');d.className='l';d.textContent=l;out.appendChild(d)}},k*320))}},45)};
const pick=(u,byUser)=>{if(byUser){user=true;clearInterval(timer)}idx=units.indexOf(u);show(u)};
units.forEach(u=>{u.addEventListener('click',()=>pick(u,true));u.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(u,true)}})});
show(units[0]);if(!reduce)timer=setInterval(()=>{if(!user){idx=(idx+1)%units.length;show(units[idx])}},5200)})();
