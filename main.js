/* ============================================================
   components.css — All UI components
   Luis Rod · Video Editor Portfolio
   ============================================================ */

/* ══════════════════════════════════════════
   NAV
══════════════════════════════════════════ */
.nav {
    position:sticky; top:0; z-index:100;
    background:var(--nav-bg);
    backdrop-filter:blur(24px) saturate(1.6);
    -webkit-backdrop-filter:blur(24px) saturate(1.6);
    border-bottom:2px solid var(--accent);
    box-shadow:0 4px 16px rgba(0,0,0,0.1);
    animation:navSlide 0.5s var(--ease);
}
.nav__inner {
    display:flex; align-items:center; justify-content:space-between;
    max-width:1160px; margin:0 auto; padding:0 1.5rem; height:70px;
}
.nav__logo {
    font-size:1.25rem; font-weight:800; color:var(--text-1);
    display:flex; align-items:center; gap:0.25rem; letter-spacing:-0.02em;
    text-transform:uppercase; tracking:0.05em;
}
.nav__logo span { color:var(--accent); font-weight:800; }
.nav__links { display:flex; gap:0.5rem; }
.nav__links a {
    font-size:0.9rem; font-weight:600; color:var(--text-2);
    padding:0.5rem 1rem; border-radius:var(--r-full);
    transition:all 0.25s; text-transform:capitalize;
    border:2px solid transparent;
}
.nav__links a:hover {
    color:var(--accent);
    background:var(--accent-glow);
    border-color:var(--accent);
    transform:translateY(-2px);
}
.nav__links a.active {
    color:var(--accent);
    border-color:var(--accent);
    background:var(--accent-glow);
}

/* Hamburger */
.nav__toggle {
    display:none; flex-direction:column; gap:5px;
    padding:6px; border-radius:var(--r-sm);
    transition:background 0.2s;
}
.nav__toggle:hover { background:var(--surface-2); }
.nav__toggle span {
    display:block; width:20px; height:2px;
    background:var(--text-1); border-radius:2px; transition:all 0.3s var(--ease);
}
.nav__toggle.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
.nav__toggle.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
.nav__toggle.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

/* Mobile menu */
.nav__mobile {
    display:none; flex-direction:column;
    background:var(--nav-bg);
    backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border);
    padding:0.5rem 1rem 1rem;
}
.nav__mobile.open { display:flex; }
.nav__mobile a {
    padding:0.75rem 0.85rem; font-size:1rem; font-weight:500;
    color:var(--text-2); border-radius:var(--r-sm); transition:all 0.2s;
}
.nav__mobile a:hover { color:var(--text-1); background:var(--surface-2); }

/* Social links in nav */
.nav__social { display:flex; gap:0.6rem; align-items:center; }
.nav__social a {
    width:40px; height:40px; border-radius:var(--r-md);
    border:2px solid var(--border); display:flex; align-items:center;
    justify-content:center; color:var(--text-2);
    transition:all 0.25s; font-size:1rem; background:var(--surface-2);
}
.nav__social a:hover {
    border-color:var(--accent);
    color:var(--accent);
    background:var(--accent-glow);
    transform:translateY(-3px);
    box-shadow:0 6px 20px rgba(200,169,110,0.25);
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
.hero {
    position:relative; text-align:center;
    padding:9rem 0 7rem;
    overflow:hidden;
}

/* Fondo imagen */
.hero__bg {
    position:absolute; top:0; left:0; right:0; bottom:0;
    background-image: url('../img/hero-bg.png');
    background-size:cover; background-position:center center;
    transform:scale(1.02);
    transition:transform 8s ease-out;
}
.hero__bg.loaded { transform:scale(1); }

/* Overlay gradiente */
.hero__overlay {
    position:absolute; inset:0;
    background:linear-gradient(
        160deg,
        rgba(10,9,7,0.78) 0%,
        rgba(10,9,7,0.60) 45%,
        rgba(10,9,7,0.80) 100%
    );
}

/* Contenido siempre sobre el overlay */
.hero .container { position:relative; z-index:2; }

.hero__eyebrow {
    display:inline-flex; align-items:center; gap:0.5rem;
    font-size:0.72rem; font-weight:700; letter-spacing:0.14em;
    text-transform:uppercase; color:#c8a96e;
    background:rgba(200,169,110,0.12); border:1px solid rgba(200,169,110,0.4);
    padding:0.4rem 1.1rem; border-radius:var(--r-full);
    margin-bottom:1.75rem;
    animation:fadeUp 0.6s var(--ease);
}
.hero__eyebrow::before {
    content:''; width:5px; height:5px; border-radius:50%;
    background:#c8a96e; display:block;
}

.hero__title {
    margin-bottom:1.25rem; color:#f2ede4;
    animation:fadeUp 0.6s 0.1s var(--ease) backwards;
}
.hero__title em { font-style:normal; color:#c8a96e; }

.hero__subtitle {
    font-size:1.1rem; color:rgba(240,234,220,0.75);
    max-width:520px; margin:0 auto 2.75rem; line-height:1.7;
    animation:fadeUp 0.6s 0.2s var(--ease) backwards;
}

.hero__cta {
    display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;
    animation:fadeUp 0.6s 0.3s var(--ease) backwards;
}

.hero__scroll {
    position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
    z-index:2; display:flex; flex-direction:column; align-items:center;
    gap:0.5rem; color:rgba(240,234,220,0.4); font-size:0.72rem;
    font-weight:500; letter-spacing:0.1em; text-transform:uppercase;
    animation:fadeUp 1s 0.8s var(--ease) backwards;
}
.hero__scroll::after {
    content:''; width:1px; height:32px;
    background:linear-gradient(to bottom, rgba(200,169,110,0.5), transparent);
}

/* ══════════════════════════════════════════
   PORTFOLIO
══════════════════════════════════════════ */
.portfolio { background:var(--surface); }

/* Slider */
.slider-wrap {
    border-radius:var(--r-lg); overflow:hidden;
    border:1px solid var(--border); box-shadow:var(--shadow-xl);
    margin-bottom:3rem; background:var(--surface);
}
.slider-track { display:flex; transition:transform 0.6s cubic-bezier(0.4,0,0.2,1); }
.slide {
    min-width:100%;
    display:grid; grid-template-columns:1fr 1fr; align-items:stretch;
}
.slide__media {
    aspect-ratio:16/9; overflow:hidden;
    background:var(--surface-3); position:relative;
}
.slide__media img,
.slide__media iframe {
    width:100%; height:100%; object-fit:cover;
    border:none; display:block;
}
.slide__info { padding:3rem 2.5rem; display:flex; flex-direction:column; justify-content:center; }
.slide__cat {
    display:inline-block; font-size:0.7rem; font-weight:700;
    letter-spacing:0.12em; text-transform:uppercase;
    color:var(--accent); border:1px solid var(--accent);
    border-radius:var(--r-full); padding:0.3rem 0.9rem;
    margin-bottom:1rem; width:fit-content;
}
.slide__title { font-size:1.6rem; font-weight:700; margin-bottom:0.75rem; color:var(--text-1); line-height:1.3; }
.slide__desc  { color:var(--text-2); margin-bottom:1.75rem; font-size:0.93rem; line-height:1.7; }

/* Slider controls */
.slider-controls {
    display:flex; align-items:center; justify-content:center; gap:1rem;
    margin-top:1.5rem;
}
.s-btn {
    width:38px; height:38px; border-radius:50%;
    border:1px solid var(--border-2); background:var(--surface);
    color:var(--text-2); font-size:0.95rem;
    display:flex; align-items:center; justify-content:center;
    transition:all 0.2s; box-shadow:var(--shadow-sm);
}
.s-btn:hover { border-color:var(--accent); color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
.dots { display:flex; gap:5px; }
.dot {
    width:7px; height:7px; border-radius:50%;
    background:var(--border-2); cursor:pointer; transition:all 0.3s;
}
.dot.active { background:var(--accent); width:22px; border-radius:4px; }

/* Filters */
.filters {
    display:flex; gap:0.5rem; flex-wrap:wrap;
    justify-content:center; margin-bottom:2rem;
}
.filter-btn {
    padding:0.45rem 1rem; border-radius:var(--r-full);
    border:1px solid var(--border-2); background:transparent;
    color:var(--text-2); font-size:0.82rem; font-weight:500;
    transition:all 0.2s;
}
.filter-btn:hover  { border-color:var(--accent); color:var(--accent); background:var(--accent-glow2); }
.filter-btn.active { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); }

/* Video grid */
.videos-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(280px,1fr));
    gap:1.25rem;
}
.video-card {
    background:var(--surface); border-radius:var(--r-md);
    border:1px solid var(--border); overflow:hidden; cursor:pointer;
    transition:transform 0.25s var(--ease), box-shadow 0.25s, border-color 0.25s;
    box-shadow:var(--shadow-sm);
}
.video-card:hover {
    transform:translateY(-5px); box-shadow:var(--shadow-lg); border-color:var(--accent);
}
.card-thumb {
    aspect-ratio:16/9; overflow:hidden;
    background:var(--surface-3); position:relative;
}
.card-thumb img {
    width:100%; height:100%; object-fit:cover;
    transition:transform 0.4s var(--ease);
}
.video-card:hover .card-thumb img { transform:scale(1.06); }
.card-overlay {
    position:absolute; inset:0; background:rgba(0,0,0,0);
    display:flex; align-items:center; justify-content:center;
    transition:background 0.3s;
}
.card-overlay::after {
    content:''; width:44px; height:44px; border-radius:50%;
    background:rgba(255,255,255,0.92);
    clip-path:polygon(30% 15%, 80% 50%, 30% 85%);
    opacity:0; transform:scale(0.6);
    transition:all 0.3s var(--ease-spring);
}
.video-card:hover .card-overlay { background:rgba(0,0,0,0.32); }
.video-card:hover .card-overlay::after { opacity:1; transform:scale(1); }
.card-info { padding:1rem 1.25rem 1.25rem; }
.card-title { font-size:0.93rem; font-weight:600; color:var(--text-1); margin-bottom:0.4rem; }
.card-tag {
    font-size:0.68rem; font-weight:700; letter-spacing:0.08em;
    text-transform:uppercase; color:var(--accent);
    padding:0.2rem 0.6rem; border:1px solid var(--accent);
    border-radius:var(--r-full); display:inline-block;
}

/* ══════════════════════════════════════════
   SKILLS
══════════════════════════════════════════ */
.skills { background:var(--bg); }
.skills-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(300px,1fr));
    gap:1.25rem;
}
.skill-card {
    background:var(--surface); border-radius:var(--r-md);
    border:1px solid var(--border); padding:2rem;
    transition:transform 0.25s var(--ease), box-shadow 0.25s, border-color 0.25s;
    box-shadow:var(--shadow-sm);
}
.skill-card:hover {
    transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:var(--accent);
}
.skill-card__icon {
    width:46px; height:46px; border-radius:var(--r-md);
    background:var(--accent-glow); border:1px solid rgba(200,169,110,0.3);
    display:flex; align-items:center; justify-content:center;
    font-size:1.4rem; margin-bottom:1.25rem;
}
.skill-card__name { font-size:1rem; font-weight:700; color:var(--text-1); margin-bottom:0.2rem; }
.skill-card__type {
    font-size:0.7rem; font-weight:700; letter-spacing:0.12em;
    text-transform:uppercase; color:var(--accent); margin-bottom:0.85rem;
}
.skill-card__desc { font-size:0.88rem; color:var(--text-2); line-height:1.65; margin-bottom:1rem; }
.skill-tags { display:flex; flex-wrap:wrap; gap:0.4rem; }
.skill-tag {
    font-size:0.72rem; font-weight:500; color:var(--text-3);
    background:var(--surface-2); border:1px solid var(--border);
    padding:0.22rem 0.6rem; border-radius:var(--r-full);
}

/* ══════════════════════════════════════════
   CLIENTES — Carrusel infinito sin espacios
══════════════════════════════════════════ */
.clients { background:var(--surface); overflow:hidden; }

/* Leyenda */
.clients-cta {
    text-align:center; margin-top:2.5rem;
    padding-top:2rem; border-top:1px solid var(--border);
}
.clients-cta__text {
    font-size:0.8rem; font-weight:700; letter-spacing:0.14em;
    text-transform:uppercase; color:var(--text-3); margin-bottom:0.5rem;
}
.clients-cta__headline {
    font-size:clamp(1.1rem, 2.5vw, 1.4rem); font-weight:700; color:var(--text-1);
}
.clients-cta__headline em { font-style:normal; color:var(--accent); }

/* Wrapper: fade en bordes, sin overflow */
.clients-marquee-wrap {
    position:relative; overflow:hidden;
    mask-image:linear-gradient(to right,
        transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image:linear-gradient(to right,
        transparent 0%, black 8%, black 92%, transparent 100%);
}

/* Track — flex sin gaps que rompan el loop */
@keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

/* El JS duplica los items suficientes veces.
   El track siempre mide el doble de lo visible,
   y la animación desplaza exactamente la mitad. */
.clients-track {
    display: flex;
    align-items: center;
    width: max-content;
    gap: 2.5rem;
    padding: 0.75rem 0;
    animation: marquee-scroll linear infinite;
    /* duración se asigna por JS según la cantidad de clientes */
    will-change: transform;
}

/* Pausa suave al hover */
.clients-marquee-wrap:hover .clients-track {
    animation-play-state: paused;
}

/* Cards */
.client-card {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.65rem; flex-shrink: 0; width: 88px; cursor: default;
}
.client-avatar {
    width: 78px; height: 78px; border-radius: 50%;
    overflow: hidden; border: 2px solid var(--border);
    background: var(--surface-3); box-shadow: var(--shadow-md);
    transition: all 0.3s var(--ease);
    display: flex; align-items: center; justify-content: center;
}
.client-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
.client-avatar__initials { font-size:1.3rem; font-weight:700; color:var(--accent); line-height:1; }
.client-avatar__placeholder {
    width:100%; height:100%;
    background:linear-gradient(135deg, var(--surface-2), var(--surface-3));
    display:flex; align-items:center; justify-content:center;
}
.client-card:hover .client-avatar {
    transform: scale(1.1); border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-glow), var(--shadow-md);
}
.client-name {
    font-size: 0.78rem; font-weight: 600; color: var(--text-2);
    text-align: center; line-height: 1.3; white-space: nowrap;
}

/* ══════════════════════════════════════════
   TESTIMONIOS
══════════════════════════════════════════ */
.testimonials { background:var(--bg); }
.testimonials-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(300px,1fr));
    gap:1.5rem;
}
.testimonial-card {
    background:var(--surface); border-radius:var(--r-lg);
    border:1px solid var(--border); padding:2rem;
    box-shadow:var(--shadow-sm);
    transition:transform 0.25s var(--ease), box-shadow 0.25s, border-color 0.25s;
    display:flex; flex-direction:column; gap:1.25rem;
}
.testimonial-card:hover {
    transform:translateY(-4px); box-shadow:var(--shadow-lg); border-color:var(--accent);
}
.testimonial-quote {
    font-size:0.95rem; color:var(--text-2); line-height:1.75;
    font-style:italic; flex:1;
    position:relative; padding-left:1.25rem;
}
.testimonial-quote::before {
    content:'"'; position:absolute; left:0; top:-0.25rem;
    font-size:2.5rem; color:var(--accent); font-style:normal;
    line-height:1; font-weight:700; opacity:0.7;
}
.testimonial-footer {
    display:flex; align-items:center; gap:0.85rem;
    padding-top:1rem; border-top:1px solid var(--border);
}
.testimonial-avatar {
    width:42px; height:42px; border-radius:50%; overflow:hidden;
    border:2px solid var(--border); background:var(--surface-3);
    flex-shrink:0; display:flex; align-items:center; justify-content:center;
}
.testimonial-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
.testimonial-avatar__initials { font-size:1rem; font-weight:700; color:var(--accent); }
.testimonial-name { font-size:0.9rem; font-weight:700; color:var(--text-1); }
.testimonial-role { font-size:0.75rem; color:var(--text-3); margin-top:0.1rem; }
.testimonial-stars { display:flex; gap:2px; margin-left:auto; }
.star { color:var(--accent); font-size:0.85rem; }

/* ══════════════════════════════════════════
   CONTACTO
══════════════════════════════════════════ */
.contact { background:var(--surface); }
.contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:start; }
.contact-info__title { margin-bottom:0.6rem; }
.contact-info__sub   { color:var(--text-2); margin-bottom:2rem; font-size:0.93rem; }
.contact-items       { display:flex; flex-direction:column; gap:0.65rem; }

.contact-item {
    display:flex; align-items:center; gap:1rem;
    padding:0.9rem 1.1rem; background:var(--surface-2);
    border-radius:var(--r-md); border:1px solid var(--border);
    transition:transform 0.2s var(--ease), border-color 0.2s, box-shadow 0.2s;
    text-decoration:none;
}
.contact-item:hover {
    border-color:var(--accent); transform:translateX(5px);
    box-shadow:0 4px 16px var(--accent-glow);
}
.contact-item__icon {
    width:38px; height:38px; border-radius:var(--r-sm);
    background:var(--accent-glow); border:1px solid rgba(200,169,110,0.25);
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; color:var(--accent); font-size:1rem;
}
.contact-item__label {
    font-size:0.68rem; font-weight:700; letter-spacing:0.1em;
    text-transform:uppercase; color:var(--text-3); margin-bottom:0.15rem;
}
.contact-item__value { font-size:0.9rem; font-weight:500; color:var(--text-1); }

/* CTA box */
.contact-cta {
    background:var(--surface-2); border-radius:var(--r-lg);
    border:1px solid var(--border); padding:2.5rem;
}
.contact-cta__title  { margin-bottom:0.5rem; }
.contact-cta__sub    { color:var(--text-2); font-size:0.93rem; margin-bottom:1.75rem; }
.contact-cta__btns   { display:flex; flex-direction:column; gap:0.65rem; }
.contact-cta__btns .btn { justify-content:center; }

/* Social icons row */
.social-row {
    display:flex; gap:0.6rem; margin-top:1.5rem; flex-wrap:wrap;
}
.social-btn {
    display:flex; align-items:center; gap:0.5rem;
    padding:0.5rem 1rem; border-radius:var(--r-full);
    border:1px solid var(--border); color:var(--text-2);
    font-size:0.82rem; font-weight:500;
    transition:all 0.2s; background:var(--surface);
}
.social-btn:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); }
.social-btn svg   { width:15px; height:15px; fill:currentColor; flex-shrink:0; }

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
.footer {
    background:var(--surface); border-top:1px solid var(--border);
    padding:3rem 0 2rem;
}
.footer__grid {
    display:grid; grid-template-columns:1fr auto; gap:2rem;
    align-items:start; margin-bottom:2.5rem;
}
.footer__brand { max-width:280px; }
.footer__logo  {
    font-size:1.1rem; font-weight:700; color:var(--text-1);
    display:flex; align-items:center; gap:0.3rem; margin-bottom:0.75rem;
}
.footer__logo span { color:var(--accent); }
.footer__tagline { font-size:0.85rem; color:var(--text-3); line-height:1.6; }
.footer__social  { display:flex; gap:0.5rem; }
.footer__social a {
    width:36px; height:36px; border-radius:var(--r-sm);
    border:1px solid var(--border); display:flex; align-items:center;
    justify-content:center; color:var(--text-3);
    transition:all 0.2s;
}
.footer__social a:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-glow); }
.footer__social svg { width:15px; height:15px; fill:currentColor; }
.footer__bottom {
    border-top:1px solid var(--border); padding-top:1.5rem;
    display:flex; align-items:center; justify-content:space-between;
    flex-wrap:wrap; gap:1rem;
}
.footer__copy  { font-size:0.8rem; color:var(--text-3); }
.footer__links { display:flex; gap:1.25rem; }
.footer__links a {
    font-size:0.8rem; color:var(--text-3); transition:color 0.2s;
}
.footer__links a:hover { color:var(--accent); }

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
.modal-overlay {
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.8); z-index:300;
    align-items:center; justify-content:center;
    padding:1rem; backdrop-filter:blur(8px);
}
.modal-overlay.active { display:flex; animation:fadeUp 0.3s var(--ease); }
.modal-box {
    background:var(--surface); border-radius:var(--r-lg);
    width:100%; max-width:820px; max-height:92vh;
    overflow-y:auto; box-shadow:var(--shadow-xl);
    animation:scaleIn 0.35s var(--ease-spring);
}
.modal-media {
    aspect-ratio:16/9; background:#000; overflow:hidden;
    border-radius:var(--r-lg) var(--r-lg) 0 0;
}
.modal-media iframe,
.modal-media img { width:100%; height:100%; object-fit:cover; border:none; display:block; }
.modal-body  { padding:1.75rem 2rem 2rem; }
.modal-meta  { display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; }
.modal-cat   {
    font-size:0.7rem; font-weight:700; letter-spacing:0.12em;
    text-transform:uppercase; color:var(--accent);
}
.modal-close {
    display:flex; align-items:center; gap:0.35rem;
    font-size:0.8rem; color:var(--text-3);
    border:1px solid var(--border); border-radius:var(--r-sm);
    padding:0.3rem 0.75rem; transition:all 0.2s;
}
.modal-close:hover { border-color:var(--border-2); color:var(--text-1); }
.modal-title { font-size:1.4rem; color:var(--text-1); margin-bottom:0.5rem; }
.modal-desc  { color:var(--text-2); font-size:0.93rem; line-height:1.7; }

/* ══════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════ */
.admin-trigger {
    position:fixed; bottom:1.25rem; right:1.25rem;
    width:12px; height:12px; border-radius:50%;
    background:var(--border); z-index:200;
    opacity:0.2; transition:opacity 0.2s;
    border:none; cursor:pointer;
}
.admin-trigger:hover { opacity:0.45; }

.admin-overlay {
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.7); z-index:400;
    align-items:center; justify-content:center;
    padding:1rem; backdrop-filter:blur(8px);
}
.admin-overlay.active { display:flex; animation:fadeUp 0.3s var(--ease); }
.admin-box {
    background:var(--surface); border-radius:var(--r-lg);
    width:100%; max-width:540px; max-height:92vh; overflow-y:auto;
    box-shadow:var(--shadow-xl); border:1px solid var(--border);
    animation:scaleIn 0.35s var(--ease-spring);
}
.admin-head {
    display:flex; align-items:center; justify-content:space-between;
    padding:1.25rem 1.5rem; border-bottom:1px solid var(--border);
}
.admin-head h3    { font-size:0.95rem; font-weight:700; color:var(--text-1); }
.admin-head-close { color:var(--text-3); font-size:1.25rem; line-height:1; transition:color 0.2s; padding:0.25rem; }
.admin-head-close:hover { color:var(--text-1); }
.admin-body       { padding:1.5rem; }

.login-box     { text-align:center; padding:0.5rem 0 1rem; }
.login-box p   { color:var(--text-2); font-size:0.88rem; margin-bottom:1.25rem; }
.login-box input {
    width:100%; padding:0.75rem; border-radius:var(--r-md);
    border:1px solid var(--border-2); background:var(--surface-2);
    color:var(--text-1); font-size:0.95rem; text-align:center;
    letter-spacing:0.25em; margin-bottom:0.75rem; transition:border-color 0.2s;
    font-family:var(--font);
}
.login-box input:focus { outline:none; border-color:var(--accent); }
.login-err { color:#e05555; font-size:0.82rem; margin-bottom:0.75rem; display:none; }

.admin-tabs { display:flex; border-bottom:1px solid var(--border); margin-bottom:1.5rem; }
.admin-tab {
    padding:0.65rem 1rem; font-size:0.82rem; font-weight:600;
    color:var(--text-3); border-bottom:2px solid transparent;
    margin-bottom:-1px; transition:all 0.2s;
}
.admin-tab.active { color:var(--accent); border-bottom-color:var(--accent); }

.a-fg { margin-bottom:1rem; }
.a-fg label {
    display:block; font-size:0.78rem; font-weight:600;
    color:var(--text-2); margin-bottom:0.4rem;
}
.a-fg input,
.a-fg select,
.a-fg textarea {
    width:100%; padding:0.65rem 0.9rem;
    border:1px solid var(--border-2); border-radius:var(--r-md);
    background:var(--surface-2); color:var(--text-1);
    font-family:var(--font); font-size:0.88rem; transition:border-color 0.2s;
}
.a-fg input:focus,
.a-fg select:focus,
.a-fg textarea:focus  { outline:none; border-color:var(--accent); }
.a-fg textarea        { min-height:72px; resize:vertical; }
.a-fg .hint           { font-size:0.72rem; color:var(--text-3); margin-top:0.3rem; }

.btn-admin-add {
    width:100%; padding:0.75rem; border-radius:var(--r-full);
    background:var(--accent); color:#0e0d0b;
    font-weight:700; font-size:0.88rem;
    transition:all 0.2s; margin-top:0.5rem;
}
.btn-admin-add:hover { background:var(--accent-light); transform:translateY(-1px); }

.success-msg {
    display:none; margin-top:0.75rem; padding:0.75rem;
    background:var(--accent-glow); border:1px solid rgba(200,169,110,0.35);
    border-radius:var(--r-md); text-align:center;
    font-size:0.82rem; color:var(--accent); font-weight:600;
}
.admin-list { display:flex; flex-direction:column; gap:0.65rem; }
.admin-item {
    display:flex; align-items:center; gap:0.75rem;
    padding:0.75rem; border-radius:var(--r-md);
    border:1px solid var(--border); background:var(--surface-2);
}
.admin-thumb {
    width:70px; height:44px; border-radius:var(--r-sm);
    overflow:hidden; background:var(--surface-3); flex-shrink:0;
}
.admin-thumb img { width:100%; height:100%; object-fit:cover; display:block; }
.admin-item-title { font-size:0.85rem; font-weight:600; color:var(--text-1); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.admin-item-meta  { font-size:0.72rem; color:var(--text-3); margin-top:0.1rem; }
.btn-del {
    font-size:0.72rem; color:var(--text-3); flex-shrink:0;
    border:1px solid var(--border); border-radius:var(--r-sm);
    padding:0.25rem 0.6rem; transition:all 0.2s;
}
.btn-del:hover { border-color:#e05555; color:#e05555; }
.empty-state { text-align:center; color:var(--text-3); padding:2.5rem; font-size:0.88rem; }

/* ══════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════ */
@media (max-width:900px) {
    .slide { grid-template-columns:1fr; }
    .slide__media { order:-1; aspect-ratio:16/9; }
    .slide__info  { padding:1.75rem; }
    .contact-grid { grid-template-columns:1fr; gap:2.5rem; }
    .footer__grid { grid-template-columns:1fr; }
}

@media (max-width:768px) {
    .nav__links   { display:none; }
    .nav__social  { display:none; }
    .nav__toggle  { display:flex; }
    .hero         { padding:7rem 0 5rem; }
    .videos-grid  { grid-template-columns:repeat(2,1fr); gap:0.75rem; }
    .skills-grid  { grid-template-columns:1fr; }
    .clients-marquee-wrap { mask-image:linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image:linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); }
    .testimonials-grid { grid-template-columns:1fr; }
    .footer__bottom { flex-direction:column; align-items:flex-start; gap:0.75rem; }
}

@media (max-width:480px) {
    .videos-grid  { grid-template-columns:1fr; }
    .client-card  { width:80px; }
    .client-avatar { width:66px; height:66px; }
}
