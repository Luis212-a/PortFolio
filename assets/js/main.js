/* ============================================================
   main.js — Portfolio logic
   Luis Rod · Video Editor Portfolio
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════
   DATOS — Edita aquí tu información
══════════════════════════════════════════ */

// Videos base (fijos). Agrega más desde el panel admin ⚙️
const BASE_VIDEOS = [
    // Ejemplo — descomenta y rellena cuando tengas videos:
    // { id:1, title:'Nombre del video', category:'publicidad',
    //   ytId:'XXXXXXXXXXX', description:'Descripción del video.' }
];

const SKILLS = [
    {
        icon:'🎬',
        name:'DaVinci Resolve Studio',
        type:'Edición & Post-producción',
        desc:'Plataforma principal de trabajo. Edición multicámara, corrección de color avanzada, Fusion VFX y Fairlight Audio en un solo flujo profesional.',
        tags:['Edición','Color Grading','Fusion VFX','Fairlight','Multicámara']
    },
    {
        icon:'✨',
        name:'After Effects',
        type:'Motion Graphics & VFX',
        desc:'Diseño de movimiento, animaciones de texto, efectos visuales y composición para piezas de alto impacto visual.',
        tags:['Motion Design','Animación','VFX','Composición','Expresiones']
    },
    {
        icon:'🎭',
        name:'Motion Graphics',
        type:'Especialidad',
        desc:'Títulos animados, lower thirds, infografías en movimiento y gráficos que dan identidad visual única a cada proyecto.',
        tags:['Títulos','Lower Thirds','Kinetic Type','Infografías']
    },
    {
        icon:'🌈',
        name:'Color Grading',
        type:'Post-producción',
        desc:'Corrección técnica y grading creativo. LUTs personalizados, trabajo con scopes y estética cinematográfica coherente.',
        tags:['Corrección','LUTs','Scopes','Skin Tones','Look Cinematográfico']
    },
    {
        icon:'🎵',
        name:'Diseño de Audio',
        type:'Sonorización',
        desc:'Sincronización de música, selección de SFX, mezcla de niveles y masterización para entrega en cualquier plataforma.',
        tags:['Sincronización','SFX','Mezcla','Masterización']
    }
];

// Clientes — edita nombres y agrega fotos reales cuando las tengas
// O administra desde el panel admin ⚙️
const DEFAULT_CLIENTS = [
    { id:1, name:'Ana García',    photo:'https://i.pravatar.cc/150?img=1'  },
    { id:2, name:'Carlos López',  photo:'https://i.pravatar.cc/150?img=3'  },
    { id:3, name:'Sofia Martínez',photo:'https://i.pravatar.cc/150?img=5'  },
    { id:4, name:'Diego Ramírez', photo:'https://i.pravatar.cc/150?img=8'  },
    { id:5, name:'Laura Torres',  photo:'https://i.pravatar.cc/150?img=9'  },
    { id:6, name:'Andrés Ruiz',   photo:'https://i.pravatar.cc/150?img=11' },
];

// Testimonios — edita o administra desde el panel admin ⚙️
const DEFAULT_TESTIMONIALS = [
    {
        id:1,
        quote:'Entregó el proyecto antes de tiempo y la calidad superó todas mis expectativas. El color grading quedó espectacular.',
        name:'Ana García',
        role:'Creadora de Contenido',
        photo:'https://i.pravatar.cc/150?img=1',
        stars:5
    },
    {
        id:2,
        quote:'Excelente manejo de los motion graphics. Le dio exactamente el look cinematográfico que buscábamos para la campaña.',
        name:'Carlos López',
        role:'Director de Marca',
        photo:'https://i.pravatar.cc/150?img=3',
        stars:5
    },
    {
        id:3,
        quote:'Muy profesional y puntual. Se comunicó perfectamente durante todo el proceso y el resultado final fue increíble.',
        name:'Sofia Martínez',
        role:'Agencia Publicitaria',
        photo:'https://i.pravatar.cc/150?img=5',
        stars:5
    }
];

const CATEGORIES = {
    todos:'Todos', youtube:'YouTube', publicidad:'Publicidad',
    redes:'Redes Sociales', educativo:'Educativo'
};

const STORAGE_KEY    = 'lr_v3_videos';
const ADMIN_PASSWORD = 'luisrod2025'; // ← Cambia tu contraseña aquí

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let videos       = [];
let clients      = [];
let testimonials = [];
let currentSlide = 0;
let filterCat    = 'todos';
let tapCount     = 0;
let tapTimer     = null;

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const esc = str => String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function getYtId(url) {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
}
function ytThumb(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }
function ytEmbed(id) { return `https://www.youtube.com/embed/${id}`; }
function initials(name) {
    return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
}

/* ══════════════════════════════════════════
   STORAGE
══════════════════════════════════════════ */
function loadAll() {
    // Videos
    videos = [...BASE_VIDEOS];
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        saved.forEach(v => { if (!videos.find(x => x.id === v.id)) videos.push(v); });
    } catch(_) {}

    // Clientes
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY + '_clients') || 'null');
        clients = saved !== null ? saved : [...DEFAULT_CLIENTS];
    } catch(_) { clients = [...DEFAULT_CLIENTS]; }

    // Testimonios
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY + '_testimonials') || 'null');
        testimonials = saved !== null ? saved : [...DEFAULT_TESTIMONIALS];
    } catch(_) { testimonials = [...DEFAULT_TESTIMONIALS]; }
}
function saveVideos()       { localStorage.setItem(STORAGE_KEY, JSON.stringify(videos.filter(v => v.source === 'admin'))); }
function saveClients()      { localStorage.setItem(STORAGE_KEY + '_clients', JSON.stringify(clients)); }
function saveTestimonials() { localStorage.setItem(STORAGE_KEY + '_testimonials', JSON.stringify(testimonials)); }

/* ══════════════════════════════════════════
   SLIDER
══════════════════════════════════════════ */
function renderSlider() {
    const track = $('sliderTrack');
    const dots  = $('dots');
    if (!track) return;

    const list = videos.length ? videos : [{
        id:0, title:'Próximamente',
        category:'youtube', ytId:null,
        description:'Nuevos proyectos en camino.'
    }];

    track.innerHTML = list.map(v => `
        <div class="slide">
            <div class="slide__media">
                ${v.ytId
                    ? `<img src="${ytThumb(v.ytId)}" alt="${esc(v.title)}" loading="lazy">`
                    : `<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;color:var(--text-3);font-size:0.85rem;">Sin imagen</div>`
                }
            </div>
            <div class="slide__info">
                <span class="slide__cat">${CATEGORIES[v.category]||v.category}</span>
                <h3 class="slide__title">${esc(v.title)}</h3>
                <p class="slide__desc">${esc(v.description||'')}</p>
                ${v.ytId ? `<button class="btn btn--primary" onclick="openModal(${v.id})">Ver video ↗</button>` : ''}
            </div>
        </div>`).join('');

    dots.innerHTML = list.map((_,i) =>
        `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`
    ).join('');

    currentSlide = 0;
    moveSlider();
}

function moveSlider() {
    const track = $('sliderTrack');
    if (!track) return;
    const total = videos.length || 1;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===currentSlide));
}

function nextSlide() { currentSlide = (currentSlide + 1) % Math.max(1, videos.length||1); moveSlider(); }
function prevSlide() { currentSlide = (currentSlide - 1 + Math.max(1, videos.length||1)) % Math.max(1, videos.length||1); moveSlider(); }

/* ══════════════════════════════════════════
   FILTERS + GRID
══════════════════════════════════════════ */
function renderFilters() {
    const el = $('filters');
    if (!el) return;
    const cats = ['todos', ...new Set(videos.map(v => v.category))];
    el.innerHTML = cats.map(c =>
        `<button class="filter-btn${c===filterCat?' active':''}" data-cat="${c}">${CATEGORIES[c]||c}</button>`
    ).join('');
}

function renderGrid() {
    const el = $('videosGrid');
    if (!el) return;
    const list = filterCat==='todos' ? videos : videos.filter(v => v.category===filterCat);

    if (!list.length) {
        el.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Sin videos en esta categoría todavía.</div>`;
        return;
    }
    el.innerHTML = list.map((v,i) => `
        <div class="video-card anim-scale" style="animation-delay:${i*0.07}s" data-id="${v.id}">
            <div class="card-thumb">
                ${v.ytId
                    ? `<img src="${ytThumb(v.ytId)}" alt="${esc(v.title)}" loading="lazy">`
                    : `<div style="width:100%;height:100%;background:var(--surface-3)"></div>`}
                <div class="card-overlay"></div>
            </div>
            <div class="card-info">
                <div class="card-title">${esc(v.title)}</div>
                <span class="card-tag">${CATEGORIES[v.category]||v.category}</span>
            </div>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(el => observer.observe(el));
}

function refreshAll() { renderSlider(); renderFilters(); renderGrid(); }

/* ══════════════════════════════════════════
   CLIENTS
══════════════════════════════════════════ */
function renderClients() {
    const el = $('clientsGrid');
    if (!el) return;
    el.innerHTML = clients.map((c,i) => `
        <div class="client-card anim-scale" style="animation-delay:${i*0.07}s">
            <div class="client-avatar">
                ${c.photo
                    ? `<img src="${esc(c.photo)}" alt="${esc(c.name)}" loading="lazy">`
                    : `<div class="client-avatar__placeholder"><span class="client-avatar__initials">${initials(c.name)}</span></div>`
                }
            </div>
            <span class="client-name">${esc(c.name)}</span>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
function renderTestimonials() {
    const el = $('testimonialsGrid');
    if (!el) return;
    el.innerHTML = testimonials.map((t,i) => `
        <div class="testimonial-card anim-scale" style="animation-delay:${i*0.1}s">
            <p class="testimonial-quote">${esc(t.quote)}</p>
            <div class="testimonial-footer">
                <div class="testimonial-avatar">
                    ${t.photo
                        ? `<img src="${esc(t.photo)}" alt="${esc(t.name)}">`
                        : `<span class="testimonial-avatar__initials">${initials(t.name)}</span>`}
                </div>
                <div>
                    <div class="testimonial-name">${esc(t.name)}</div>
                    <div class="testimonial-role">${esc(t.role)}</div>
                </div>
                <div class="testimonial-stars">${'<span class="star">★</span>'.repeat(t.stars)}</div>
            </div>
        </div>`).join('');
    el.querySelectorAll('.anim-scale').forEach(el => observer.observe(el));
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
    el.querySelectorAll('.anim-scale').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
function openModal(id) {
    const v = videos.find(x => x.id===id);
    if (!v) return;
    $('modalCat').textContent   = CATEGORIES[v.category]||v.category;
    $('modalTitle').textContent = v.title;
    $('modalDesc').textContent  = v.description||'';
    $('modalMedia').innerHTML   = v.ytId
        ? `<iframe src="${ytEmbed(v.ytId)}?autoplay=1" frameborder="0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>`
        : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-3)">Sin video</div>`;
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
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target); }
    });
}, { threshold:0.08, rootMargin:'0px 0px -32px 0px' });

/* ══════════════════════════════════════════
   NAV ACTIVE LINK
══════════════════════════════════════════ */
function setActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 100;
    sections.forEach(s => {
        const link = document.querySelector(`.nav__links a[href="#${s.id}"]`);
        if (!link) return;
        const inView = scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight;
        link.classList.toggle('active', inView);
    });
}

/* ══════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════ */
function openAdmin() {
    $('adminOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeAdmin() {
    $('adminOverlay').classList.remove('active');
    document.body.style.overflow = '';
    $('loginSection').style.display = 'block';
    $('adminPanel').style.display   = 'none';
}
function showAdminTab(name) {
    ['tab-add','tab-clients','tab-testimonials','tab-manage'].forEach(id => {
        const el = $(id); if(el) el.style.display = 'none';
    });
    const target = $('tab-' + name);
    if (target) target.style.display = 'block';
    if (name === 'manage')       renderAdminList();
    if (name === 'clients')      renderAdminClients();
    if (name === 'testimonials') renderAdminTestimonials();
}
function renderAdminList() {
    const el = $('adminVideoList');
    if (!el) return;
    if (!videos.length) { el.innerHTML = '<div class="empty-state">Sin videos todavía.</div>'; return; }
    el.innerHTML = videos.map(v => `
        <div class="admin-item">
            <div class="admin-thumb">
                ${v.ytId ? `<img src="${ytThumb(v.ytId)}" alt="">` : ''}
            </div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(v.title)}</div>
                <div class="admin-item-meta">${CATEGORIES[v.category]||v.category}</div>
            </div>
            ${v.source==='admin'
                ? `<button class="btn-del" data-id="${v.id}">Quitar</button>`
                : `<span style="font-size:0.7rem;color:var(--text-3);flex-shrink:0">Fijo</span>`}
        </div>`).join('');

    el.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = videos.findIndex(v => v.id===+btn.dataset.id);
            if (idx!==-1) { videos.splice(idx,1); saveVideos(); refreshAll(); renderAdminList(); }
        });
    });
}
function addVideo(url, title, desc, cat, successId) {
    if (!url||!title) { alert('Completa el link y el título.'); return; }
    const ytId = getYtId(url);
    if (!ytId) { alert('Link de YouTube no válido. Asegúrate de pegar el link completo.'); return; }
    videos.push({ id:Date.now(), title, category:cat, ytId,
        thumbnail:ytThumb(ytId), description:desc||'', source:'admin' });
    saveVideos(); refreshAll();
    $('ytUrl').value=''; $('ytTitle').value=''; $('ytDesc').value='';
    const msg=$(successId);
    if(msg){ msg.style.display='block'; setTimeout(()=>msg.style.display='none',3000); }
}

/* ══════════════════════════════════════════
   ADMIN — Clientes
══════════════════════════════════════════ */
function renderAdminClients() {
    const el = $('adminClientsList');
    if (!el) return;
    if (!clients.length) { el.innerHTML = '<div class="empty-state">Sin clientes todavía.</div>'; return; }
    el.innerHTML = clients.map(c => `
        <div class="admin-item">
            <div class="admin-thumb" style="border-radius:50%;overflow:hidden">
                ${c.photo
                    ? `<img src="${esc(c.photo)}" alt="">`
                    : `<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);font-size:0.85rem">${initials(c.name)}</div>`}
            </div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(c.name)}</div>
                ${c.photo ? `<div class="admin-item-meta">Con foto</div>` : `<div class="admin-item-meta">Con iniciales</div>`}
            </div>
            <button class="btn-del" data-client-id="${c.id}">Quitar</button>
        </div>`).join('');

    el.querySelectorAll('[data-client-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = clients.findIndex(c => c.id === +btn.dataset.clientId);
            if (idx !== -1) { clients.splice(idx,1); saveClients(); renderClients(); renderAdminClients(); }
        });
    });
}

function addClient(name, photo) {
    if (!name.trim()) { alert('Escribe el nombre del cliente.'); return; }
    clients.push({ id:Date.now(), name:name.trim(), photo:photo.trim()||null });
    saveClients(); renderClients(); renderAdminClients();
    $('clientName').value = ''; $('clientPhoto').value = '';
    const msg = $('clientSuccess');
    msg.style.display='block'; setTimeout(()=>msg.style.display='none',3000);
}

/* ══════════════════════════════════════════
   ADMIN — Testimonios
══════════════════════════════════════════ */
function renderAdminTestimonials() {
    const el = $('adminTestimonialsList');
    if (!el) return;
    if (!testimonials.length) { el.innerHTML = '<div class="empty-state">Sin testimonios todavía.</div>'; return; }
    el.innerHTML = testimonials.map(t => `
        <div class="admin-item">
            <div class="admin-thumb" style="border-radius:50%;overflow:hidden">
                ${t.photo
                    ? `<img src="${esc(t.photo)}" alt="">`
                    : `<div style="width:100%;height:100%;background:var(--surface-3);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);font-size:0.85rem">${initials(t.name)}</div>`}
            </div>
            <div style="flex:1;min-width:0">
                <div class="admin-item-title">${esc(t.name)}</div>
                <div class="admin-item-meta" style="white-space:normal;line-height:1.4">"${esc(t.quote.substring(0,60))}${t.quote.length>60?'…':''}"</div>
            </div>
            <button class="btn-del" data-test-id="${t.id}">Quitar</button>
        </div>`).join('');

    el.querySelectorAll('[data-test-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = testimonials.findIndex(t => t.id === +btn.dataset.testId);
            if (idx !== -1) { testimonials.splice(idx,1); saveTestimonials(); renderTestimonials(); renderAdminTestimonials(); }
        });
    });
}

function addTestimonial(name, role, quote, photo, stars) {
    if (!name.trim()||!quote.trim()) { alert('El nombre y el testimonio son obligatorios.'); return; }
    testimonials.push({ id:Date.now(), name:name.trim(), role:role.trim(), quote:quote.trim(), photo:photo.trim()||null, stars:+stars||5 });
    saveTestimonials(); renderTestimonials(); renderAdminTestimonials();
    ['testName','testRole','testQuote','testPhoto'].forEach(id => { const el=$(id); if(el) el.value=''; });
    $('testStars').value = '5';
    const msg = $('testSuccess');
    msg.style.display='block'; setTimeout(()=>msg.style.display='none',3000);
}

/* ══════════════════════════════════════════
   HERO PARALLAX
══════════════════════════════════════════ */
function heroParallax() {
    const bg = document.querySelector('.hero__bg');
    if (!bg) return;
    const scrolled = window.scrollY;
    bg.style.transform = `translateY(${scrolled * 0.3}px)`;
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    loadAll();
    renderSkills();
    renderClients();
    renderTestimonials();
    refreshAll();

    // Hero bg loaded animation
    const heroBg = document.querySelector('.hero__bg');
    if (heroBg) {
        const img = new Image();
        img.onload = () => heroBg.classList.add('loaded');
        img.src = 'assets/img/hero-bg.png';
    }

    // Scroll observer para elementos estáticos
    document.querySelectorAll('.anim-up, .anim-left, .anim-right, .anim-scale').forEach(el => observer.observe(el));

    // Auto-slider
    setInterval(nextSlide, 9000);

    // Slider buttons
    $('nextBtn')?.addEventListener('click', nextSlide);
    $('prevBtn')?.addEventListener('click', prevSlide);
    $('dots')?.addEventListener('click', e => {
        if (e.target.dataset.i !== undefined) { currentSlide=+e.target.dataset.i; moveSlider(); }
    });

    // Filters
    $('filters')?.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterCat = btn.dataset.cat;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid();
    });

    // Grid → modal
    $('videosGrid')?.addEventListener('click', e => {
        const card = e.target.closest('.video-card');
        if (card) openModal(+card.dataset.id);
    });

    // Modal close
    $('modalCloseBtn')?.addEventListener('click', closeModal);
    $('modal')?.addEventListener('click', e => { if(e.target===e.currentTarget) closeModal(); });
    document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

    // Nav hamburger
    const toggle = $('navToggle');
    const mobile = $('navMobile');
    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('open');
        mobile?.classList.toggle('open');
    });
    mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        toggle?.classList.remove('open');
        mobile?.classList.remove('open');
    }));

    // Active nav on scroll
    window.addEventListener('scroll', () => { setActiveNav(); heroParallax(); }, { passive:true });

    // Admin — triple click en punto oculto
    $('adminTrigger')?.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => tapCount=0, 700);
        if (tapCount>=3) { tapCount=0; openAdmin(); }
    });
    $('adminOverlay')?.addEventListener('click', e => { if(e.target===e.currentTarget) closeAdmin(); });
    $('adminCloseBtn')?.addEventListener('click', closeAdmin);

    // Login
    $('loginBtn')?.addEventListener('click', () => {
        if ($('pwdInput').value===ADMIN_PASSWORD) {
            $('loginSection').style.display='none';
            $('adminPanel').style.display='block';
            $('loginErr').style.display='none';
            $('pwdInput').value='';
            showAdminTab('add');
        } else {
            $('loginErr').style.display='block';
        }
    });
    $('pwdInput')?.addEventListener('keydown', e => { if(e.key==='Enter') $('loginBtn').click(); });

    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showAdminTab(tab.dataset.tab);
        });
    });

    // Add video
    $('addYtBtn')?.addEventListener('click', () => {
        addVideo(
            $('ytUrl').value.trim(),
            $('ytTitle').value.trim(),
            $('ytDesc').value.trim(),
            $('ytCat').value,
            'ytSuccess'
        );
    });
});
