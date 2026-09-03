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
let servicesNav=null;
let submenuToggle=null;

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

  const servicesLink=regular.find(a=>(a.getAttribute('href')||'').split('#')[0].toLowerCase()==='servicios.html');
  if(servicesLink){
    servicesNav=document.createElement('div');
    servicesNav.className='nav-item services-nav';
    links.insertBefore(servicesNav,servicesLink);
    servicesNav.appendChild(servicesLink);

    submenuToggle=document.createElement('button');
    submenuToggle.className='submenu-toggle';
    submenuToggle.type='button';
    submenuToggle.setAttribute('aria-expanded','false');
    submenuToggle.setAttribute('aria-label','Mostrar servicios');
    submenuToggle.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 9 5 5 5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    servicesNav.appendChild(submenuToggle);

    const submenu=document.createElement('div');
    submenu.className='services-submenu';
    submenu.setAttribute('aria-label','Servicios de Futuro Digital');
    submenu.innerHTML=`
      <a href="desarrollo-web.html"><span>Desarrollo web</span><small>Sitios, catálogos y e-commerce</small></a>
      <a href="software-a-medida.html"><span>Software a medida</span><small>Aplicaciones, procesos e integraciones</small></a>
      <a href="hosting-dominios.html"><span>Hosting y dominios</span><small>Infraestructura y publicación</small></a>
      <a href="correo-corporativo.html"><span>Correo corporativo</span><small>Comunicación con tu propio dominio</small></a>`;
    servicesNav.appendChild(submenu);

    const servicePages=['servicios.html','desarrollo-web.html','software-a-medida.html','hosting-dominios.html','correo-corporativo.html'];
    if(servicePages.includes(current)){
      servicesNav.classList.add('active');
      servicesLink.setAttribute('aria-current','page');
    }
    submenu.querySelectorAll('a').forEach(a=>{
      if((a.getAttribute('href')||'').toLowerCase()===current)a.setAttribute('aria-current','page');
    });

    submenuToggle.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      const open=servicesNav.classList.toggle('submenu-open');
      submenuToggle.setAttribute('aria-expanded',String(open));
      submenuToggle.setAttribute('aria-label',open?'Ocultar servicios':'Mostrar servicios');
    });
    document.addEventListener('click',e=>{
      if(innerWidth>980&&!servicesNav.contains(e.target)){
        servicesNav.classList.remove('submenu-open');
        submenuToggle.setAttribute('aria-expanded','false');
      }
    });
  }
}

const iconBars='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="2" stroke-linecap="round"/></svg>';
const iconClose='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-width="2" stroke-linecap="round"/></svg>';
const backdrop=document.createElement('div');
backdrop.className='mobile-nav-backdrop';
backdrop.style.zIndex='40';
document.body.appendChild(backdrop);

function closeServicesSubmenu(){
  if(!servicesNav||!submenuToggle)return;
  servicesNav.classList.remove('submenu-open');
  submenuToggle.setAttribute('aria-expanded','false');
  submenuToggle.setAttribute('aria-label','Mostrar servicios');
}
function setMenu(open){
  if(!menu||!links)return;
  links.classList.toggle('open',open);
  backdrop.classList.toggle('show',open);
  document.body.classList.toggle('nav-open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  menu.innerHTML=open?iconClose:iconBars;
  if(!open)closeServicesSubmenu();
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
