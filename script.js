const cabecalho=document.getElementById('cabecalho-principal');
const atualizarCabecalho=()=>cabecalho.classList.toggle('rolado',scrollY>50);
window.addEventListener('scroll',atualizarCabecalho,{passive:true});atualizarCabecalho();

const botaoMenu=document.getElementById('botao-menu-hamburguer'),menuMobile=document.getElementById('navegacao-mobile');
botaoMenu.addEventListener('click',()=>{botaoMenu.classList.toggle('aberto');menuMobile.classList.toggle('visivel')});
menuMobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{botaoMenu.classList.remove('aberto');menuMobile.classList.remove('visivel')}));

const frases=['Eternizando Momentos.','Construindo Marcas.','Capturando Emoções.','Estratégia & Arte.'];
let indiceFrase=0,indiceCaractere=0,deletando=false;
const elementoTexto=document.getElementById('elemento-digitacao');
function animarTexto(){
  const fraseAtual=frases[indiceFrase];
  if(!deletando){elementoTexto.textContent=fraseAtual.slice(0,++indiceCaractere);if(indiceCaractere===fraseAtual.length){deletando=true;setTimeout(animarTexto,2600);return}}
  else{elementoTexto.textContent=fraseAtual.slice(0,--indiceCaractere);if(!indiceCaractere){deletando=false;indiceFrase=(indiceFrase+1)%frases.length;setTimeout(animarTexto,500);return}}
  setTimeout(animarTexto,deletando?48:90);
}
setTimeout(animarTexto,100);

const palavrasLetreiro=['Fotografia','Social Media','Retratos','Estratégia','Momentos','Conteúdo','Arte'];
const conteinerLetreiro=document.getElementById('letreiro-animado');
let htmlLetreiro='';
for(let i=0;i<4;i++) palavrasLetreiro.forEach(palavra=>{htmlLetreiro+=`<span>${palavra}</span><span class="ponto-separador">◆</span>`});
conteinerLetreiro.innerHTML=htmlLetreiro;

if(window.innerWidth>=1024){
  const canvasElemento=document.getElementById('canvas-fundo');
  const contexto=canvasElemento.getContext('2d');
  let largura,altura,particulas=[];
  const redimensionarCanvas=()=>{
    largura=canvasElemento.width=canvasElemento.parentElement.offsetWidth;
    altura=canvasElemento.height=canvasElemento.parentElement.offsetHeight;
    particulas=[];
    const quantidade=Math.min(50,Math.floor(largura*altura/15000));
    for(let i=0;i<quantidade;i++) particulas.push({x:Math.random()*largura,y:Math.random()*altura,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*.7+.2,a:Math.random()*.35+.07});
  };
  const desenharCanvas=()=>{
    contexto.clearRect(0,0,largura,altura);
    for(let i=0;i<particulas.length;i++) for(let j=i+1;j<particulas.length;j++){
      const distX=particulas[i].x-particulas[j].x,distY=particulas[i].y-particulas[j].y,distancia=Math.sqrt(distX*distX+distY*distY);
      if(distancia<100){contexto.beginPath();contexto.moveTo(particulas[i].x,particulas[i].y);contexto.lineTo(particulas[j].x,particulas[j].y);contexto.strokeStyle=`rgba(201,168,124,${.045*(1-distancia/100)})`;contexto.lineWidth=.5;contexto.stroke()}
    }
    particulas.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>largura)p.vx*=-1;if(p.y<0||p.y>altura)p.vy*=-1;contexto.beginPath();contexto.arc(p.x,p.y,p.r,0,Math.PI*2);contexto.fillStyle=`rgba(201,168,124,${p.a})`;contexto.fill()});
    requestAnimationFrame(desenharCanvas);
  };
  window.addEventListener('resize',redimensionarCanvas,{passive:true});redimensionarCanvas();desenharCanvas();
}

if(window.innerWidth>=1024){
  const imagemFundo=document.querySelector('.fundo-destaque img');
  window.addEventListener('scroll',()=>{
    if(imagemFundo&&scrollY<innerHeight*1.2) imagemFundo.style.transform=`scale(1) translateY(${scrollY*.07}px)`;
  },{passive:true});
}

const elementosRevelar=document.querySelectorAll('.revelar-de-baixo,.revelar-da-esquerda,.revelar-da-direita, .item-galeria-midia');
const observadorIntersecao=new IntersectionObserver(entradas=>{
  entradas.forEach(entrada=>{
    if(entrada.isIntersecting){
      const atraso=parseInt(entrada.target.dataset.delay)||0;
      entrada.target.style.transitionDelay=atraso+'ms';
      requestAnimationFrame(()=>requestAnimationFrame(()=>entrada.target.classList.add('visivel-na-tela')));
      observadorIntersecao.unobserve(entrada.target);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
elementosRevelar.forEach(elemento=>observadorIntersecao.observe(elemento));

const imagensPortfolio=document.querySelectorAll('.item-fotografia');
const observadorPortfolio=new IntersectionObserver(entradas=>{
  entradas.forEach(entrada=>{
    if(entrada.isIntersecting){
      const atraso=parseInt(entrada.target.dataset.delay)||0;
      entrada.target.style.transitionDelay=atraso+'ms';
      requestAnimationFrame(()=>requestAnimationFrame(()=>entrada.target.classList.add('visivel-na-tela')));
      observadorPortfolio.unobserve(entrada.target);
    }
  });
},{threshold:.08,rootMargin:'0px 0px -20px 0px'});
imagensPortfolio.forEach(galeria=>observadorPortfolio.observe(galeria));

const carrosseisGaleria = document.querySelectorAll('.carrossel-imagens');
carrosseisGaleria.forEach(carrossel => {
  const slidesCarrossel = carrossel.querySelectorAll('.slide-imagem');
  const containerPontos = carrossel.parentElement.querySelector('.pontos-navegacao');
  let pontosApoio = [];
  if (containerPontos) pontosApoio = containerPontos.querySelectorAll('.ponto-carrossel');
  
  let indiceAtualSlide = 0;
  setInterval(() => {
    slidesCarrossel[indiceAtualSlide].classList.remove('slide-ativo');
    if (pontosApoio.length > 0) pontosApoio[indiceAtualSlide].classList.remove('slide-ativo');
    
    indiceAtualSlide = (indiceAtualSlide + 1) % slidesCarrossel.length;
    
    slidesCarrossel[indiceAtualSlide].classList.add('slide-ativo');
    if (pontosApoio.length > 0) pontosApoio[indiceAtualSlide].classList.add('slide-ativo');
  }, 2000); 
});
