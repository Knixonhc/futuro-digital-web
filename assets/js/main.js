document.documentElement.classList.add('js');

['assets/css/v3.css','assets/css/v4.css'].forEach(href=>{
  if(!document.querySelector(`link[href="${href}"]`)){
    const css=document.createElement('link');css.rel='stylesheet';css.href=href;document.head.appendChild(css);
  }
});

const favicon=document.querySelector('link[rel="icon"]')||document.createElement('link');
favicon.rel='icon';favicon.type='image/svg+xml';favicon.href='assets/img/isotipo.svg';if(!favicon.parentNode)document.head.appendChild(favicon);

document.body.classList.add('page-enter');requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('page-loaded')));

const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
let servicesNav=null;let submenuToggle=null;

const ICONS={
  web:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M7 6h.01M10 6h.01M8 22h8"/></svg>',
  code:'<svg viewBox="0 0 24 24"><path d="m8 9-3 3 3 3m8-6 3 3-3 3M14 5l-4 14"/></svg>',
  server:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h7M11 17h7"/></svg>',
  mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3"/></svg>',
  layers:'<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.2c0 4.5 2.7 8.1 7.5 9.8 4.8-1.7 7.5-5.3 7.5-9.8V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  spark:'<svg viewBox="0 0 24 24"><path d="M12 2v5M12 17v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M2 12h5M17 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5"/><circle cx="12" cy="12" r="3"/></svg>'
};

if(links){
  const all=[...links.querySelectorAll(':scope > a')];
  const cta=all.find(a=>a.classList.contains('btn'));
  const regular=all.filter(a=>!a.classList.contains('btn'));
  const order=['nosotros.html','servicios.html','proyectos.html','contacto.html'];
  regular.sort((a,b)=>order.indexOf((a.getAttribute('href')||'').split('#')[0])-order.indexOf((b.getAttribute('href')||'').split('#')[0]));
  regular.forEach(a=>links.appendChild(a));if(cta)links.appendChild(cta);
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  regular.forEach(a=>{if((a.getAttribute('href')||'').split('#')[0].toLowerCase()===current)a.setAttribute('aria-current','page')});
  const servicesLink=regular.find(a=>(a.getAttribute('href')||'').split('#')[0].toLowerCase()==='servicios.html');
  if(servicesLink){
    servicesNav=document.createElement('div');servicesNav.className='nav-item services-nav';links.insertBefore(servicesNav,servicesLink);servicesNav.appendChild(servicesLink);
    submenuToggle=document.createElement('button');submenuToggle.className='submenu-toggle';submenuToggle.type='button';submenuToggle.setAttribute('aria-expanded','false');submenuToggle.setAttribute('aria-label','Mostrar servicios');submenuToggle.innerHTML='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 9 5 5 5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';servicesNav.appendChild(submenuToggle);
    const submenu=document.createElement('div');submenu.className='services-submenu';submenu.setAttribute('aria-label','Servicios de Futuro Digital');submenu.innerHTML=`<a href="desarrollo-web.html"><span>Desarrollo web</span><small>Sitios, catálogos y e-commerce</small></a><a href="software-a-medida.html"><span>Software a medida</span><small>Aplicaciones, procesos e integraciones</small></a><a href="hosting-dominios.html"><span>Hosting y dominios</span><small>Infraestructura y publicación</small></a><a href="correo-corporativo.html"><span>Correo corporativo</span><small>Comunicación con tu propio dominio</small></a>`;servicesNav.appendChild(submenu);
    const servicePages=['servicios.html','desarrollo-web.html','software-a-medida.html','hosting-dominios.html','correo-corporativo.html'];if(servicePages.includes(current)){servicesNav.classList.add('active');servicesLink.setAttribute('aria-current','page')}
    submenu.querySelectorAll('a').forEach(a=>{if((a.getAttribute('href')||'').toLowerCase()===current)a.setAttribute('aria-current','page')});
    submenuToggle.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const open=servicesNav.classList.toggle('submenu-open');submenuToggle.setAttribute('aria-expanded',String(open));submenuToggle.setAttribute('aria-label',open?'Ocultar servicios':'Mostrar servicios')});
    document.addEventListener('click',e=>{if(innerWidth>980&&!servicesNav.contains(e.target)){servicesNav.classList.remove('submenu-open');submenuToggle.setAttribute('aria-expanded','false')}});
  }
}

const iconBars='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="2" stroke-linecap="round"/></svg>';
const iconClose='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-width="2" stroke-linecap="round"/></svg>';
const backdrop=document.createElement('div');backdrop.className='mobile-nav-backdrop';backdrop.style.zIndex='40';document.body.appendChild(backdrop);
function closeServicesSubmenu(){if(!servicesNav||!submenuToggle)return;servicesNav.classList.remove('submenu-open');submenuToggle.setAttribute('aria-expanded','false');submenuToggle.setAttribute('aria-label','Mostrar servicios')}
function setMenu(open){if(!menu||!links)return;links.classList.toggle('open',open);backdrop.classList.toggle('show',open);document.body.classList.toggle('nav-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.innerHTML=open?iconClose:iconBars;if(!open)closeServicesSubmenu()}
if(menu&&links){setMenu(false);menu.addEventListener('click',()=>setMenu(!links.classList.contains('open')));backdrop.addEventListener('click',()=>setMenu(false));links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});window.addEventListener('resize',()=>{if(innerWidth>980)setMenu(false)},{passive:true})}

/* Service overview icons */
document.querySelectorAll('.service-links a').forEach(a=>{
  if(a.querySelector('.service-nav-icon'))return;
  const href=(a.getAttribute('href')||'');const type=href.includes('desarrollo-web')?'web':href.includes('software')?'code':href.includes('hosting')?'server':'mail';
  const icon=document.createElement('span');icon.className='service-nav-icon';icon.innerHTML=ICONS[type];a.prepend(icon);
});

/* Feature card icons */
const featureIcons=['target','layers','shield','spark'];
document.querySelectorAll('.feature-list article').forEach((article,i)=>{if(article.querySelector('.icon-orb'))return;const el=document.createElement('span');el.className='icon-orb';el.innerHTML=ICONS[featureIcons[i%featureIcons.length]];article.prepend(el)});

/* Project visual transformation */
const projectMap={
  'Arzana Reformas':{img:'assets/img/people/arzana-renovation.jpg',cls:'project-arzana',logo:'assets/img/brands/arzana-logo.svg',label:'ARZANA REFORMAS',sub:'Reformas integrales'},
  'Nutri Orgánicos del Campo':{img:'assets/img/nutri/aplicacion-campo.webp',cls:'project-nutri',logo:'assets/img/brands/nutri-logo.png',label:'Nutri Orgánicos',sub:'Agricultura'},
  'CDECO':{img:'assets/img/people/cdeco-ultrasound.jpg',cls:'project-cdeco',logo:'assets/img/brands/cdeco-logo.svg',label:'CDECO',sub:'Salud integral'},
  'Estracoach':{img:'assets/img/people/estracoach-coaching.jpg',cls:'project-estracoach',logo:'assets/img/brands/estracoach-logo.svg',label:'ESTRACOACH',sub:'Consultoría & coaching'},
  'Grandoffice':{cls:'project-grandoffice',mark:'GO',label:'GRANDOFFICE',sub:'Servicios empresariales'},
  'Venezia Foods':{cls:'project-venezia',mark:'VF',label:'VENEZIA FOODS',sub:'E-commerce'},
  'GrandStore Ecuador':{cls:'project-grandstore',mark:'GS',label:'GRANDSTORE',sub:'E-commerce'},
  'Circuitos Fácil':{cls:'project-circuitos',mark:'CF',label:'CIRCUITOS FÁCIL',sub:'Tecnología'},
  'Global University':{cls:'project-global',mark:'GU',label:'GLOBAL UNIVERSITY',sub:'Educación'},
  'DesignSoft':{cls:'project-designsoft',mark:'DS',label:'DESIGNSOFT',sub:'Software'}
};
document.querySelectorAll('.portfolio-grid article').forEach(article=>{
  const h=article.querySelector('h3');const source=article.querySelector(':scope > img');if(!h||!source||source.closest('.project-visual'))return;
  const name=h.textContent.trim();const meta=projectMap[name]||{mark:name.slice(0,2).toUpperCase(),label:name,sub:'Proyecto digital'};
  if(meta.img)source.src=meta.img;source.classList.add('project-shot');source.removeAttribute('referrerpolicy');
  const visual=document.createElement('div');visual.className=`project-visual ${meta.cls||''}`;source.parentNode.insertBefore(visual,source);visual.appendChild(source);
  const chip=document.createElement('div');chip.className='project-brand-chip';
  chip.innerHTML=meta.logo?`<img src="${meta.logo}" alt="${meta.label}">`:`<span class="project-brand-mark">${meta.mark}</span><span class="project-brand-word"><strong>${meta.label}</strong><small>${meta.sub}</small></span>`;
  visual.appendChild(chip);
});

/* Metrics */
function metricSection(items){return `<section class="metric-ribbon"><div class="container metric-grid">${items.map(x=>`<article class="metric-card"><span class="metric-label">${x.label}</span><strong class="metric-number" ${x.count?`data-count="${x.count}"`:''}>${x.count?'0':x.value}</strong><p>${x.text}</p></article>`).join('')}</div></section>`}
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
if(page==='index.html' || page===''){
  const manifesto=document.querySelector('.manifesto');if(manifesto&&!document.querySelector('.metric-ribbon'))manifesto.insertAdjacentHTML('afterend',metricSection([
    {label:'Origen',count:2019,text:'Año en que comenzó la historia de Futuro Digital.'},{label:'Servicios',count:4,text:'Líneas principales que pueden trabajar como un solo ecosistema.'},{label:'Proceso',count:5,text:'Etapas para convertir una necesidad en una solución publicada.'},{label:'Alcance',value:'Global',text:'Base en Guayaquil con colaboración remota para otros mercados.'}
  ]));
}
if(page==='nosotros.html'){
  const evolution=[...document.querySelectorAll('.content-section')].find(s=>s.textContent.includes('NUESTRA EVOLUCIÓN'));
  if(evolution&&!document.querySelector('.metric-ribbon'))evolution.insertAdjacentHTML('beforebegin',metricSection([
    {label:'Desde',count:2019,text:'Construyendo experiencia en proyectos digitales.'},{label:'Servicios',count:4,text:'Web, software, infraestructura y comunicación corporativa.'},{label:'Etapas',count:5,text:'Un proceso ordenado desde entender hasta acompañar.'},{label:'Mercados',count:3,text:'Guayaquil, Ecuador y colaboración internacional.'}
  ]));
}

/* Rich service stories */
const serviceStories={
 'desarrollo-web.html':{eyebrow:'DESARROLLO WEB',title:'Una web no es una vitrina: es parte de cómo tu negocio genera confianza.',desc:'Trabajamos contenido, experiencia, diseño, estructura técnica y publicación como una sola solución. La meta es que el sitio sea claro para las personas y sólido para buscadores y dispositivos.',img:'assets/img/people/hero-team.jpg',badge:'Diseño y desarrollo conectados al objetivo del negocio.',steps:[['01','Descubrimiento','Entendemos oferta, público y objetivo.'],['02','Arquitectura','Ordenamos contenidos y recorridos.'],['03','Diseño + desarrollo','Convertimos la estructura en una experiencia responsive.'],['04','Publicación','Pruebas, SEO técnico base y salida a producción.']],metrics:[['4','etapas conectadas'],['3','tamaños de pantalla'],['1','base SEO técnica']]},
 'software-a-medida.html':{eyebrow:'SOFTWARE A MEDIDA',title:'Cuando el proceso es particular, la herramienta también puede serlo.',desc:'Partimos del flujo real de trabajo para definir qué conviene automatizar, integrar o convertir en una aplicación. Así la tecnología se adapta al negocio y no al revés.',img:'assets/img/people/software-team.jpg',badge:'Procesos reales convertidos en herramientas utilizables.',steps:[['01','Mapeo','Identificamos tareas, usuarios y puntos de fricción.'],['02','Modelo','Definimos datos, reglas y alcance inicial.'],['03','Construcción','Desarrollamos módulos, automatizaciones e integraciones.'],['04','Evolución','Probamos, ajustamos y dejamos una base extensible.']],metrics:[['4','fases de trabajo'],['3','tipos de solución'],['1','hoja de ruta compartida']]},
 'hosting-dominios.html':{eyebrow:'HOSTING & DOMINIOS',title:'La parte invisible de una web también define la experiencia.',desc:'Dominio, hosting, DNS, SSL y soporte forman la infraestructura que sostiene una presencia digital. Los organizamos para reducir fricción y mantener cada componente bajo control.',img:'assets/img/people/hosting-tech.jpg',badge:'Infraestructura administrada con una visión de continuidad.',steps:[['01','Dominio','Registro y configuración del nombre digital.'],['02','Hosting','Alojamiento adecuado al proyecto.'],['03','Seguridad','HTTPS, DNS y configuración técnica.'],['04','Continuidad','Soporte ante cambios, renovaciones e incidencias.']],metrics:[['4','pilares operativos'],['3','capas técnicas'],['1','punto de soporte']]},
 'correo-corporativo.html':{eyebrow:'CORREO CORPORATIVO',title:'Cada correo enviado también comunica la identidad de tu empresa.',desc:'Configuramos el dominio, las cuentas y la autenticación necesaria para que el equipo utilice direcciones profesionales de forma ordenada en sus dispositivos habituales.',img:'assets/img/people/email-team.jpg',badge:'Comunicación profesional alineada con la identidad de marca.',steps:[['01','Dominio','Definimos las direcciones que necesita el equipo.'],['02','DNS','Configuramos registros y autenticación.'],['03','Cuentas','Creamos buzones y accesos.'],['04','Dispositivos','Acompañamos la configuración en clientes compatibles.']],metrics:[['4','puntos de configuración'],['3','entornos habituales'],['1','identidad de dominio']]}
};
const story=serviceStories[page];
if(story&&!document.querySelector('.service-story')){
  const hero=document.querySelector('.page-hero');
  const html=`<section class="service-story"><div class="container service-story-grid"><figure class="service-photo"><img src="${story.img}" alt="Profesionales trabajando en ${story.eyebrow.toLowerCase()}" loading="lazy"><figcaption class="service-photo-badge"><strong>${story.eyebrow}</strong><span>${story.badge}</span></figcaption></figure><div class="service-dashboard"><p class="eyebrow">CÓMO LO CONSTRUIMOS</p><h2>${story.title}</h2><p>${story.desc}</p><div class="service-process">${story.steps.map(s=>`<div class="service-process-item"><b>${s[0]}</b><strong>${s[1]}</strong><span>${s[2]}</span></div>`).join('')}</div><div class="service-progress"><span></span></div><div class="service-progress-labels"><span>Contexto</span><span>Solución</span><span>Producción</span></div><div class="service-mini-metrics">${story.metrics.map(m=>`<div><strong data-count="${m[0]}">0</strong><span>${m[1]}</span></div>`).join('')}</div></div></div></section>`;
  hero.insertAdjacentHTML('afterend',html);
}

/* Services overview visual explanation */
if(page==='servicios.html'&&!document.querySelector('.visual-explainer')){
 const target=document.querySelector('.people-showcase');
 const html=`<section class="visual-explainer"><div class="container visual-explainer-grid"><div class="visual-explainer-copy"><p class="eyebrow">UN ECOSISTEMA, NO PIEZAS SUELTAS</p><h2>Así se conectan nuestros servicios.</h2><p>Una necesidad puede empezar por una web y terminar involucrando infraestructura, correo o una herramienta interna. La ventaja de una visión integral es que cada decisión considera lo que viene después.</p></div><div class="explainer-stack"><article class="explainer-card"><span class="icon-orb">${ICONS.web}</span><div><h3>Presencia</h3><p>La web presenta, explica y convierte interés en contacto.</p></div><span class="step-dot"></span></article><article class="explainer-card"><span class="icon-orb">${ICONS.server}</span><div><h3>Infraestructura</h3><p>Dominio, hosting y seguridad mantienen esa presencia disponible.</p></div><span class="step-dot"></span></article><article class="explainer-card"><span class="icon-orb">${ICONS.mail}</span><div><h3>Comunicación</h3><p>El correo corporativo extiende la identidad a la conversación diaria.</p></div><span class="step-dot"></span></article><article class="explainer-card"><span class="icon-orb">${ICONS.code}</span><div><h3>Operación</h3><p>El software a medida conecta procesos cuando la solución necesita ir más lejos.</p></div><span class="step-dot"></span></article></div></div></section>`;
 if(target)target.insertAdjacentHTML('beforebegin',html);
}

const progress=document.createElement('div');progress.className='scroll-progress';document.body.appendChild(progress);
function onScroll(){if(header)header.classList.toggle('scrolled',scrollY>18);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,(scrollY/max)*100):0)+'%'}onScroll();addEventListener('scroll',onScroll,{passive:true});

const revealSelectors=['.section-head','.content-grid > *','.service-links > *','.portfolio-grid > article','.process > li','.feature-list > article','.purpose-card','.value-card','.journey > article','.visual-stats > div','.gallery > img','.case-media','.brand-photo','.contact-photo','.contact-form-card','.people-mosaic figure','.people-showcase-copy','.cta-band .container','.metric-card','.service-photo','.service-dashboard','.visual-explainer-copy','.explainer-card'];
const revealItems=[...new Set(revealSelectors.flatMap(s=>[...document.querySelectorAll(s)]))];
revealItems.forEach((el,i)=>{el.classList.add('reveal-up');el.style.setProperty('--reveal-delay',`${Math.min((i%5)*55,220)}ms`)});

function animateCounter(el){if(el.dataset.counted)return;el.dataset.counted='1';const end=parseInt(el.dataset.count,10);if(!Number.isFinite(end))return;const startTime=performance.now();const duration=end>100?1200:850;function frame(now){const p=Math.min(1,(now-startTime)/duration);const eased=1-Math.pow(1-p,3);el.textContent=Math.round(end*eased).toLocaleString('es-EC');if(p<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)}

if('IntersectionObserver' in window){
 const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');entry.target.querySelectorAll?.('[data-count]').forEach(animateCounter);if(entry.target.matches('[data-count]'))animateCounter(entry.target);if(entry.target.classList.contains('journey'))entry.target.style.setProperty('--journey-progress','100%');io.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 revealItems.forEach(el=>io.observe(el));document.querySelectorAll('[data-count],.journey').forEach(el=>io.observe(el));
}else{revealItems.forEach(el=>el.classList.add('is-visible'));document.querySelectorAll('[data-count]').forEach(animateCounter);document.querySelectorAll('.journey').forEach(j=>j.style.setProperty('--journey-progress','100%'))}

const footerBottom=document.querySelector('.footer-bottom');if(footerBottom)footerBottom.innerHTML='© <span id="year"></span> Futuro Digital Ecuador · Guayaquil · Ecuador · Proyectos en todo el mundo';const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();

const carousel=document.querySelector('#project-carousel');const prev=document.querySelector('.carousel-btn.prev');const next=document.querySelector('.carousel-btn.next');function step(){const slide=carousel?.querySelector('.project-slide');return slide?slide.getBoundingClientRect().width+18:600}if(carousel&&prev&&next){prev.addEventListener('click',()=>carousel.scrollBy({left:-step(),behavior:'smooth'}));next.addEventListener('click',()=>carousel.scrollBy({left:step(),behavior:'smooth'}))}

document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(a.target==='_blank'||a.hasAttribute('download'))return;const href=a.getAttribute('href');if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin)return;if(url.pathname===location.pathname&&url.search===location.search)return;e.preventDefault();setMenu(false);document.body.classList.add('page-leaving');setTimeout(()=>{location.href=url.href},170)});

const form=document.querySelector('#demo-form');const note=document.querySelector('#form-note');if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}if(note)note.textContent='Gracias por compartir el contexto de tu proyecto. El envío directo desde la web estará disponible próximamente.'})}
