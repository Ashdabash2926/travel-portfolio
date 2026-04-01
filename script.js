document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll state ──────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  }

  // ── Hero image zoom on load ───────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  // ── Mobile nav toggle ─────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ── Scroll fade-in ────────────────────────────────────
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    faders.forEach(el => io.observe(el));
  }

  // ── Lightbox ──────────────────────────────────────────
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const imgs    = document.querySelectorAll('.gallery-grid img');
    const lbImg   = lightbox.querySelector('img');
    const sources = Array.from(imgs).map(i => i.src);
    let idx = 0;

    const show = (i) => {
      idx = i; lbImg.src = sources[idx];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const hide = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    const prev = () => show((idx - 1 + sources.length) % sources.length);
    const next = () => show((idx + 1) % sources.length);

    imgs.forEach((img, i) => img.addEventListener('click', () => show(i)));
    lightbox.querySelector('.lightbox-close').addEventListener('click', hide);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prev);
    lightbox.querySelector('.lightbox-next').addEventListener('click', next);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) hide(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape')      hide();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    });
  }
});
