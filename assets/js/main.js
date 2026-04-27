/* ============================================================
   main.js — Portfolio Luis Rod
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════
   TUS VIDEOS — Agrega aquí
   ytId = los 11 caracteres del link de YouTube
   Ej: youtube.com/watch?v=JSiPee4PDko → ytId: 'JSiPee4PDko'
        youtube.com/shorts/JSiPee4PDko  → ytId: 'JSiPee4PDko'
══════════════════════════════════════════ */
const VIDEOS = [
       { id:1, title:'Reel Viral', category:'Redes', ytId:'JSiPee4PDko', description:'Descripción breve.' },
    // Categorías disponibles: youtube | publicidad | redes | educativo
];

/* ══════════════════════════════════════════
   TUS CLIENTES
   photo: URL de imagen, o null para mostrar iniciales
══════════════════════════════════════════ */
const CLIENTS = [
    { id:1, name:'Ana García',     photo:'https://i.pravatar.cc/150?img=1'  },
    { id:2, name:'Carlos López',   photo:'https://i.pravatar.cc/150?img=3'  },
    { id:3, name:'Sofia Martínez', photo:'https://i.pravatar.cc/150?img=5'  },
    { id:4, name:'Diego Ramírez',  photo:'https://i.pravatar.cc/150?img=8'  },
    { id:5, name:'Laura Torres',   photo:'https://i.pravatar.cc/150?img=9'  },
    { id:6, name:'Andrés Ruiz',    photo:'https://i.pravatar.cc/150?img=11' },
];

/* ══════════════════════════════════════════
   TUS TESTIMONIOS
══════════════════════════════════════════ */
const TESTIMONIALS = [
    { id:1, quote:'Entregó el proyecto antes de tiempo y la calidad superó todas mis expectativas. El color grading quedó espectacular.', name:'Ana García',     role:'Creadora de Contenido', photo:'https://i.pravatar.cc/150?img=1', stars:5 },
    { id:2, quote:'Excelente manejo de los motion graphics. Le dio exactamente el look cinematográfico que buscábamos para la campaña.', name:'Carlos López',   role:'Director de Marca',      photo:'https://i.pravatar.cc/150?img=3', stars:5 },
    { id:3, quote:'Muy profesional y puntual. Se comunicó perfectamente durante todo el proceso y el resultado final fue increíble.',    name:'Sofia Martínez', role:'Agencia Publicitaria',   photo:'https://i.pravatar.cc/150?img=5', stars:5 },
];

/* ══════════════════════════════════════════
   SKILLS (no necesitas cambiar esto)
══════════════════════════════════════════ */
const SKILLS = [
    { icon:'🎬', name:'DaVinci Resolve Studio', type:'Edición & Post-producción',
      desc:'Plataforma principal de trabajo. Edición multicámara, corrección de color avanzada, Fusion VFX y Fairlight Audio en un solo flujo profesional.',
      tags:['Edición','Color Grading','Fusion VFX','Fairlight','Multicámara'] },
    { icon:'✨', name:'After Effects', type:'Motion Graphics & VFX',
      desc:'Diseño de movimiento, animaciones de texto, efectos visuales y composición para piezas de alto impacto visual.',
      tags:['Motion Design','Animación','VFX','Composición','Expresiones'] },
    { icon:'🎭', name:'Motion Graphics', type:'Especialidad',
      desc:'Títulos animados, lower thirds, infografías en movimiento y gráficos que dan identidad visual única a cada proyecto.',
      tags:['Títulos','Lower Thirds','Kinetic Type','Infografías'] },
    { icon:'🌈', name:'Color Grading', type:'Post-producción',
      desc:'Corrección técnica y grading creativo. LUTs personalizados, trabajo con scopes y estética cinematográfica coherente.',
      tags:['Corrección','LUTs','Scopes','Skin Tones','Look Cinematográfico'] },
    { icon:'🎵', name:'Diseño de Audio', type:'Sonorización',
      desc:'Sincronización de música, selección de SFX, mezcla de niveles y masterización para entrega en cualquier plataforma.',
      tags:['Sincronización','SFX','Mezcla','Masterización'] },
];

const CATEGORIES    = { todos:'Todos', youtube:'YouTube', publicidad:'Publicidad', redes:'Redes Sociales', educativo:'Educativo' };
const ADMIN_PASSWORD = 'luisrod2025';

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let currentSlide = 0;
let filterCat    = 'todos';
let tapCount     = 0;
let tapTimer     = null;

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const esc = str => String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function getYtId(url) {
    // Acepta: watch?v=, youtu.be/, shorts/, embed/
    const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
}
function ytThumb(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }
function ytEmbed(id) { return `https://www.youtube.com/embed/${id}`; }
function initials(name) { return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase(); }

/* ══════════════════════════════════════════
   SLIDER
══════════════════════════════════════════ */
function renderSlider() {
    const track = $('sliderTrack');
    const dots  = $('dots');
    if (!track || !dots) return;

    const list = VIDEOS.length ? VIDEOS : [{
        id:0, title:'Próximamente', category:'youtube', ytId:null,
        description:'Nuevos proyectos en camino.'
    }];

    track.innerHTML = list.map(v => `
        <div class="slide">
            <div class="slide__media">
                ${v.ytId
                    ? `<img src="${ytThumb(v.ytId)}" alt="${esc(v.title)}" loading="lazy">`
                    : `<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:0.9rem;">Próximamente</div>`}
            </div>
            <div class="slide__info">
                <span class="slide__cat">${CATEGORIES[v.category]||v.category}</span>
                <h3 class="slide__title">${esc(v.title)}</h3>
                <p class="slide__desc">${esc(v.description||'')}</p>
                ${v.ytId ? `<button class="btn btn--primary" onclick="openModal(${v.id})">Ver video ↗</button>` : ''}
            </div>
        </div>`).join('');

    dots.innerHTML = list.map((_,i) => `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`).join('');
    currentSlide = 0;
    moveSlider();
}

function moveSlider() {
    const track = $('sliderTrack');
    if (!track) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
}

function nextSlide() { currentSlide = (currentSlide+1) % Math.max(1, VIDEOS.length||1); moveSlider(); }
function prevSlide() { currentSlide = (currentSlide-1+Math.max(1, VIDEOS.length||1)) % Math.max(1, VIDEOS.length||1); moveSlider(); }

/* ══════════════════════════════════════════
   FILTERS + GRID
══════════════════════════════════════════ */
function renderFilters() {
    const el = $('filters');
    if (!el) return;
    const cats = ['todos', ...new Set(VIDEOS.map(v=>v.category))];
    el.innerHTML = cats.map(c => `<button class="filter-btn${c===filterCat?' active':''}" data-cat="${c}">${CATEGORIES[c]||c}</button>`).join('');
}

function renderGrid() {
    const el = $('videosGrid');
    if (!el) return;
    const list = filterCat==='todos' ? VIDEOS : VIDEOS.filter(v=>v.category===filterCat);
    if (!list.length) {
        el.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Sin videos aquí todavía.</div>`;
        return;
    }
    el.innerHTML = list.map((v,i) => `
        <div class="video-card anim-scale" style="animation-delay:${i*0.07}s" data-id="${v.id}">
            <div class="card-thumb">
                ${v.ytId ? `<img src="${ytThumb(v.ytId)}" alt="${esc(v.title)}" loading="lazy">` : `<div style="width:100%;height:100%;background:var(--surface-3)"></div>`}
                <div class="card-overlay"></div>
            </div>
            <div class="card-info">
                <div class="card-title">${esc(v.title)}</div>
                <span class="card-tag">${CATEGORIES[v.category]||v.category}</span>
            </div>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(e => observer.observe(e));
}

function refreshAll() { renderSlider(); renderFilters(); renderGrid(); }

/* ══════════════════════════════════════════
   CLIENTS — Carrusel infinito sin espacios
   Duplica las suficientes veces para llenar
   siempre toda la pantalla
══════════════════════════════════════════ */
function renderClients() {
    const el = $('clientsGrid');
    if (!el) return;

    function makeCard(c) {
        return `<div class="client-card">
            <div class="client-avatar">
                ${c.photo
                    ? `<img src="${esc(c.photo)}" alt="${esc(c.name)}" loading="lazy">`
                    : `<div class="client-avatar__placeholder"><span class="client-avatar__initials">${initials(c.name)}</span></div>`}
            </div>
            <span class="client-name">${esc(c.name)}</span>
        </div>`;
    }

    // Repetir suficientes veces para que SIEMPRE llene la pantalla (mínimo 4x)
    const copies = Math.max(4, Math.ceil(20 / CLIENTS.length));
    const repeated = Array.from({ length: copies }, () => CLIENTS).flat();
    el.innerHTML = repeated.map(makeCard).join('');

    // Velocidad proporcional — más suave con más clientes
    const duration = CLIENTS.length * 3.5;
    el.style.animationDuration = Math.max(18, duration) + 's';
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
function renderTestimonials() {
    const el = $('testimonialsGrid');
    if (!el) return;
    el.innerHTML = TESTIMONIALS.map((t,i) => `
        <div class="testimonial-card anim-scale" style="animation-delay:${i*0.1}s">
            <p class="testimonial-quote">${esc(t.quote)}</p>
            <div class="testimonial-footer">
                <div class="testimonial-avatar">
                    ${t.photo ? `<img src="${esc(t.photo)}" alt="">` : `<span class="testimonial-avatar__initials">${initials(t.name)}</span>`}
                </div>
                <div>
                    <div class="testimonial-name">${esc(t.name)}</div>
                    <div class="testimonial-role">${esc(t.role||'')}</div>
                </div>
                <div class="testimonial-stars">${'<span class="star">★</span>'.repeat(t.stars||5)}</div>
            </div>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(e => observer.observe(e));
}

/* ══════════════════════════════════════════
   SKILLS
══════════════════════════════════════════ */
function renderSkills() {
    const el = $('skillsGrid');
    if (!el) return;
    el.innerHTML = SKILLS.map((s,i) => `
        <div class="skill-card anim-scale" style="animation-delay:${i*0.08}s">
            <div class="skill-card__icon">${s.icon}</div>
            <div class="skill-card__name">${s.name}</div>
            <div class="skill-card__type">${s.type}</div>
            <p class="skill-card__desc">${s.desc}</p>
            <div class="skill-tags">${s.tags.map(t=>`<span class="skill-tag">${t}</span>`).join('')}</div>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(e => observer.observe(e));
}

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
function openModal(id) {
    const v = VIDEOS.find(x => x.id===id);
    if (!v) return;
    $('modalCat').textContent   = CATEGORIES[v.category]||v.category;
    $('modalTitle').textContent = v.title;
    $('modalDesc').textContent  = v.description||'';
    $('modalMedia').innerHTML   = v.ytId
        ? `<iframe src="${ytEmbed(v.ytId)}?autoplay=1" frameborder="0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>`
        : '';
    $('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    $('modal').classList.remove('active');
    $('modalMedia').innerHTML = '';
    document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   SCROLL OBSERVER
══════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('on'); observer.unobserve(e.target); } });
}, { threshold:0.08, rootMargin:'0px 0px -32px 0px' });

function setActiveNav() {
    const scrollY = window.scrollY + 100;
    document.querySelectorAll('section[id]').forEach(s => {
        const link = document.querySelector(`.nav__links a[href="#${s.id}"]`);
        if (link) link.classList.toggle('active', scrollY>=s.offsetTop && scrollY<s.offsetTop+s.offsetHeight);
    });
}

/* ══════════════════════════════════════════
   ADMIN PANEL
   (Para agregar videos edita VIDEOS arriba
    y sube el archivo a GitHub)
══════════════════════════════════════════ */
function openAdmin()  { $('adminOverlay').classList.add('active'); document.body.style.overflow='hidden'; }
function closeAdmin() {
    $('adminOverlay').classList.remove('active');
    document.body.style.overflow='';
    $('loginSection').style.display='block';
    $('adminPanel').style.display='none';
}

function showAdminTab(name) {
    ['tab-add','tab-clients','tab-testimonials','tab-manage'].forEach(id => { const e=$(id); if(e) e.style.display='none'; });
    const t=$('tab-'+name); if(t) t.style.display='block';
    if(name==='manage')       renderAdminList();
    if(name==='clients')      renderAdminClients();
    if(name==='testimonials') renderAdminTestimonials();
}

function renderAdminList() {
    const el=$('adminVideoList');
    if(!el) return;
    if(!VIDEOS.length){
        el.innerHTML=`<div class="empty-state">
            <p style="margin-bottom:1rem">Para agregar videos abre <code style="background:var(--surface-3);padding:0.1rem 0.4rem;border-radius:4px">assets/js/main.js</code> en GitHub y edita el array <code style="background:var(--surface-3);padding:0.1rem 0.4rem;border-radius:4px">VIDEOS</code>.</p>
            <p>Ejemplo:<br><code style="background:var(--surface-3);padding:0.5rem;border-radius:4px;display:block;margin-top:0.5rem;font-size:0.75rem;line-height:1.6;">{ id:1, title:'Mi Reel', category:'redes',<br>  ytId:'JSiPee4PDko', description:'...' }</code></p>
        </div>`;
        return;
    }
    el.innerHTML = VIDEOS.map(v=>`
        <div class="admin-item">
            <div class="admin-thumb">${v.ytId?`<img src="${ytThumb(v.ytId)}" alt="">`:''}</div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(v.title)}</div>
                <div class="admin-item-meta">${CATEGORIES[v.category]||v.category} · ${v.ytId}</div>
            </div>
        </div>`).join('');
}

function renderAdminClients() {
    const el=$('adminClientsList');
    if(!el) return;
    el.innerHTML = CLIENTS.map(c=>`
        <div class="admin-item">
            <div class="admin-thumb" style="border-radius:50%;overflow:hidden">
                ${c.photo?`<img src="${esc(c.photo)}" alt="">`:`<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);font-size:0.85rem">${initials(c.name)}</div>`}
            </div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(c.name)}</div>
                <div class="admin-item-meta">${c.photo?'Con foto':'Con iniciales'}</div>
            </div>
        </div>`).join('');
}

function renderAdminTestimonials() {
    const el=$('adminTestimonialsList');
    if(!el) return;
    el.innerHTML = TESTIMONIALS.map(t=>`
        <div class="admin-item">
            <div class="admin-thumb" style="border-radius:50%;overflow:hidden">
                ${t.photo?`<img src="${esc(t.photo)}" alt="">`:`<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);font-size:0.85rem">${initials(t.name)}</div>`}
            </div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(t.name)}</div>
                <div class="admin-item-meta" style="white-space:normal">"${esc(t.quote.substring(0,55))}${t.quote.length>55?'…':''}"</div>
            </div>
        </div>`).join('');
}

/* ══════════════════════════════════════════
   HERO PARALLAX
══════════════════════════════════════════ */
function heroParallax() {
    const bg = document.querySelector('.hero__bg');
    if (bg) bg.style.transform = `translateY(${window.scrollY*0.3}px)`;
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderClients();
    renderTestimonials();
    refreshAll();

    // Hero bg
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        const img = new Image();
        img.onload = () => heroBg.classList.add('loaded');
        img.src = 'assets/img/hero-bg.png';
    }

    document.querySelectorAll('.anim-up,.anim-left,.anim-right,.anim-scale').forEach(e=>observer.observe(e));
    setInterval(nextSlide, 9000);

    $('nextBtn')?.addEventListener('click', nextSlide);
    $('prevBtn')?.addEventListener('click', prevSlide);
    $('dots')?.addEventListener('click', e=>{ if(e.target.dataset.i!==undefined){ currentSlide=+e.target.dataset.i; moveSlider(); } });

    $('filters')?.addEventListener('click', e=>{
        const btn=e.target.closest('.filter-btn'); if(!btn) return;
        filterCat=btn.dataset.cat;
        document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active'); renderGrid();
    });

    $('videosGrid')?.addEventListener('click', e=>{ const c=e.target.closest('.video-card'); if(c) openModal(+c.dataset.id); });
    $('modalCloseBtn')?.addEventListener('click', closeModal);
    $('modal')?.addEventListener('click', e=>{ if(e.target===e.currentTarget) closeModal(); });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

    const toggle=$('navToggle'), mobile=$('navMobile');
    toggle?.addEventListener('click',()=>{ toggle.classList.toggle('open'); mobile?.classList.toggle('open'); });
    mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ toggle?.classList.remove('open'); mobile?.classList.remove('open'); }));

    window.addEventListener('scroll',()=>{ setActiveNav(); heroParallax(); },{passive:true});

    // Admin — triple clic en punto oculto
    $('adminTrigger')?.addEventListener('click',()=>{
        tapCount++; clearTimeout(tapTimer);
        tapTimer=setTimeout(()=>tapCount=0,700);
        if(tapCount>=3){ tapCount=0; openAdmin(); }
    });
    $('adminOverlay')?.addEventListener('click',e=>{ if(e.target===e.currentTarget) closeAdmin(); });
    $('adminCloseBtn')?.addEventListener('click', closeAdmin);

    $('loginBtn')?.addEventListener('click',()=>{
        if($('pwdInput').value===ADMIN_PASSWORD){
            $('loginSection').style.display='none';
            $('adminPanel').style.display='block';
            $('loginErr').style.display='none';
            $('pwdInput').value='';
            showAdminTab('manage');
        } else { $('loginErr').style.display='block'; }
    });
    $('pwdInput')?.addEventListener('keydown',e=>{ if(e.key==='Enter') $('loginBtn').click(); });

    document.querySelectorAll('.admin-tab').forEach(tab=>{
        tab.addEventListener('click',()=>{
            document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');
            showAdminTab(tab.dataset.tab);
        });
    });
});
