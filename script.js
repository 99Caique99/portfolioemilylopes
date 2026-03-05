const hdr=document.getElementById('hdr');
const upH=()=>hdr.classList.toggle('s',scrollY>50);
window.addEventListener('scroll',upH,{passive:true});upH();

const hbtn=document.getElementById('hbtn'),mnav=document.getElementById('mnav');
hbtn.addEventListener('click',()=>{hbtn.classList.toggle('x');mnav.classList.toggle('o')});
mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{hbtn.classList.remove('x');mnav.classList.remove('o')}));

const phrases=['Eternizando Momentos.','Contando Histórias.','Capturando Emoções.','Criando Memórias.'];
let pi=0,ci=0,dl=false;
const tw=document.getElementById('tw');
function type(){
  const p=phrases[pi];
  if(!dl){tw.textContent=p.slice(0,++ci);if(ci===p.length){dl=true;setTimeout(type,2600);return}}
  else{tw.textContent=p.slice(0,--ci);if(!ci){dl=false;pi=(pi+1)%phrases.length;setTimeout(type,500);return}}
  setTimeout(type,dl?48:90);
}
setTimeout(type,100);

const words=['Fotografia','Retratos','Ensaios','Momentos','Memórias','Emoção','Arte'];
const mq=document.getElementById('mq');
let mh='';
for(let i=0;i<4;i++) words.forEach(w=>{mh+=`<span>${w}</span><span class="d">◆</span>`});
mq.innerHTML=mh;

if(window.innerWidth>=1024){
  const c=document.getElementById('cvs');
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  const resize=()=>{
    W=c.width=c.parentElement.offsetWidth;
    H=c.height=c.parentElement.offsetHeight;
    pts=[];
    const n=Math.min(50,Math.floor(W*H/15000));
    for(let i=0;i<n;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*.7+.2,a:Math.random()*.35+.07});
  };
  const draw=()=>{
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(201,168,124,${.045*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke()}
    }
    pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(201,168,124,${p.a})`;ctx.fill()});
    requestAnimationFrame(draw);
  };
  window.addEventListener('resize',resize,{passive:true});resize();draw();
}

if(window.innerWidth>=1024){
  const himg=document.querySelector('.hero-bg img');
  window.addEventListener('scroll',()=>{
    if(himg&&scrollY<innerHeight*1.2) himg.style.transform=`scale(1) translateY(${scrollY*.07}px)`;
  },{passive:true});
}

const rvEls=document.querySelectorAll('.rv,.rl,.rr');
const rio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}});
},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
rvEls.forEach(e=>rio.observe(e));

const giEls=document.querySelectorAll('.gi');
const gio=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const delay=parseInt(e.target.dataset.delay)||0;
      e.target.style.transitionDelay=delay+'ms';
      requestAnimationFrame(()=>requestAnimationFrame(()=>e.target.classList.add('in')));
      gio.unobserve(e.target);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -20px 0px'});
giEls.forEach(g=>gio.observe(g));
