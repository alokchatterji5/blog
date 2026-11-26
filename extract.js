const fs=require('fs');const x=fs.readFileSync('rss.xml','utf8').replace(/<!\[CDATA\[/g,'').replace(/\]\]>/g,'');
const idx=[];
const g=(s,t)=>{const a=s.indexOf('<'+t);if(a<0)return'';const b=s.indexOf('>',a)+1;return s.slice(b,s.indexOf('</'+t+'>',b))};
for(const it of x.split('<item>').slice(1)){const link=g(it,'link');const slug=link.split('/').pop();
 const cats=[...it.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(m=>m[1]);
 const enc=g(it,'content:encoded');
 idx.push({slug,title:g(it,'title'),link,date:g(it,'pubDate'),cats,cover:(it.match(/<enclosure[^>]*url="([^"]+)"/)||[])[1]||'',desc:g(it,'description'),chars:enc.length});
 fs.writeFileSync('posts/'+slug+'.html',enc);}
fs.writeFileSync('index.json',JSON.stringify(idx,null,1));
idx.forEach(m=>console.log(m.date.slice(5,16),m.chars,m.slug));
