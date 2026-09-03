document.documentElement.classList.add('js');

if(!document.querySelector('link[href="assets/css/v3.css"]')){
  const v3=document.createElement('link');
  v3.rel='stylesheet';
  v3.href='assets/css/v3.css';
  document.head.appendChild(v3);
}

const favicon=document.querySelector('link[rel="icon"]')||document.createElement('link');
favicon.rel='icon';
favicon.type='image/svg+xml';
favicon.href='assets/img/isotipo.svg';
if(!favicon.parentNode)document.head.appendChild(favicon);

document.body.classList.add('page-enter');
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('page-loaded')));

const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu');
const links=document.querySelector('.links');

if(links){
  const all=[...links.querySelectorAll(':scope > a')];
  const cta=all.find(a=>a.classList.contains('btn'));
  const regular=all.filter(a=>!a.classList.contains('btn'));
  const order=['nosotros.html','servicios.html','proyectos.html','contacto.html'];
  regular.sort((a,b)=>{
    const ah=(a.getAttribute('href')||'').split('#')[0];
    const bh=(b.getAttribute('href')||'').split('#')[0];
    return order.indexOf(ah)-order.indexOf(bh);
  });
  regular.forEach(a=>links.appendChild(a));
  if(cta)links.appendChild(cta);

  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  regular.forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(href===current)a.setAttribute('aria-current','page');
  });
}

const iconBars='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="2" stroke-linecap="round"/></svg>';
const iconClose='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-width="2" stroke-linecap="round"/></svg>';
const backdrop=document.createElement('div');
backdrop.className='mobile-nav-backdrop';
backdrop.style.zIndex='40';
document.body.appendChild(backdrop);

function setMenu(open){
  if(!menu||!links)return;
  links.classList.toggle('open',open);
  backdrop.classList.toggle('show',open);
  document.body.classList.toggle('nav-open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  menu.innerHTML=open?iconClose:iconBars;
}
if(menu&&links){
  setMenu(false);
  menu.addEventListener('click',()=>setMenu(!links.classList.contains('open')));
  backdrop.addEventListener('click',()=>setMenu(false));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',()=>{if(innerWidth>980)setMenu(false)},{passive:true});
}

const progress=document.createElement('div');
progress.className='scroll-progress';
document.body.appendChild(progress);
function onScroll(){
  if(header)header.classList.toggle('scrolled',scrollY>18);
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max>0?Math.min(100,(scrollY/max)*100):0)+'%';
}
onScroll();
addEventListener('scroll',onScroll,{passive:true});

const revealSelectors=[
  '.section-head','.content-grid > *','.service-links > *','.portfolio-grid > article',
  '.process > li','.feature-list > article','.purpose-card','.value-card','.journey > article',
  '.visual-stats > div','.gallery > img','.case-media','.brand-photo','.contact-photo',
  '.contact-form-card','.people-mosaic figure','.people-showcase-copy','.cta-band .container'
];
const revealItems=[...new Set(revealSelectors.flatMap(s=>[...document.querySelectorAll(s)]))];
revealItems.forEach((el,i)=>{
  el.classList.add('reveal-up');
  el.style.setProperty('--reveal-delay',`${Math.min((i%5)*55,220)}ms`);
});
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  revealItems.forEach(el=>io.observe(el));
}else revealItems.forEach(el=>el.classList.add('is-visible'));

const footerBottom=document.querySelector('.footer-bottom');
if(footerBottom){
  footerBottom.innerHTML='© <span id="year"></span> Futuro Digital Ecuador · Guayaquil · Ecuador · Proyectos en todo el mundo';
}
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();

const carousel=document.querySelector('#project-carousel');
const prev=document.querySelector('.carousel-btn.prev');
const next=document.querySelector('.carousel-btn.next');
function step(){const slide=carousel?.querySelector('.project-slide');return slide?slide.getBoundingClientRect().width+18:600}
if(carousel&&prev&&next){
  prev.addEventListener('click',()=>carousel.scrollBy({left:-step(),behavior:'smooth'}));
  next.addEventListener('click',()=>carousel.scrollBy({left:step(),behavior:'smooth'}));
}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href]');
  if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(a.target==='_blank'||a.hasAttribute('download'))return;
  const href=a.getAttribute('href');
  if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))return;
  const url=new URL(a.href,location.href);
  if(url.origin!==location.origin)return;
  if(url.pathname===location.pathname&&url.search===location.search)return;
  e.preventDefault();
  setMenu(false);
  document.body.classList.add('page-leaving');
  setTimeout(()=>{location.href=url.href},170);
});

const form=document.querySelector('#demo-form');
const note=document.querySelector('#form-note');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return}
    if(note)note.textContent='Gracias por compartir el contexto de tu proyecto. El envío directo desde la web estará disponible próximamente.';
  });
}
