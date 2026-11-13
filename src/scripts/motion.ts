// Movimento del sito: scroll fluido (Lenis), animazioni legate allo scroll (GSAP)
// e piccoli effetti (titoli che entrano parola per parola, pulsanti magnetici).
// Con "riduci movimento" attivo non parte niente: il sito resta statico e completo.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { lenis?: Lenis }
}

if (!reduce) {
  document.documentElement.classList.add('motion');

  // Scroll fluido, sincronizzato con ScrollTrigger. Le ancore (#verifica, #prezzi)
  // scorrono morbide tenendo conto dell'header fisso.
  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, anchors: { offset: -80 } });
  window.lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  heroIntro();
  pageheadIntro();
  splitHeadings();
  scrollReveals();
  progressBar();
  headerOnScroll();
  if (finePointer) { magneticButtons(); spotlightCards(); tiltCards(); }
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// Ingresso della hero: etichetta, titolo parola per parola, testo e pulsanti.
function heroIntro() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const words = splitWords(hero.querySelectorAll('.hero__sub'));
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(hero.querySelector('.hero__tag'), { y: 18, opacity: 0, duration: 0.6 })
    .from(words, { yPercent: 115, rotate: 4, duration: 0.9, stagger: 0.045 }, 0.05)
    // La riga a gradiente si "accende" da sinistra, come la luce nella fibra.
    .fromTo(hero.querySelector('.hero__big'),
      { clipPath: 'inset(-10% 100% -10% 0)', filter: 'blur(8px)' },
      { clipPath: 'inset(-10% 0% -10% 0)', filter: 'blur(0px)', duration: 1.1, ease: 'power4.inOut', clearProps: 'clipPath,filter' }, 0.3)
    .from(hero.querySelectorAll('.rot, .hero__lead, .hero__actions, .hero__note'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.35)
    .from(hero.querySelector('.hero__visual'), { x: 60, opacity: 0, scale: 0.94, duration: 1.2 }, 0.1);

  // Uscita della hero mentre si scorre: il supereroe sale, il testo sfuma.
  gsap.to(hero.querySelector('.hero__visual'), {
    yPercent: -18, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to(hero.querySelector('.hero__copy'), {
    yPercent: -10, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'center top+=30%', end: 'bottom top', scrub: true },
  });

  // Il supereroe segue leggermente il mouse.
  const visual = hero.querySelector<HTMLElement>('.hero__img');
  if (visual && finePointer) {
    const rx = gsap.quickTo(visual, 'rotationY', { duration: 0.8, ease: 'power3' });
    const ry = gsap.quickTo(visual, 'rotationX', { duration: 0.8, ease: 'power3' });
    gsap.set(visual, { transformPerspective: 900 });
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      rx(((e.clientX - r.left) / r.width - 0.5) * 14);
      ry(-((e.clientY - r.top) / r.height - 0.5) * 10);
    });
  }
}

// Testata delle pagine interne: briciole, titolo parola per parola, testo, box laterale.
function pageheadIntro() {
  const head = document.querySelector<HTMLElement>('.pagehead');
  if (!head) return;
  const h1 = head.querySelector('h1');
  const words = h1 ? splitWords([h1]) : [];
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(head.querySelectorAll('.crumbs'), { y: 12, opacity: 0, duration: 0.6 })
    .from(head.querySelectorAll('.sv__icon, .pagehead__icon'), { scale: 0.4, rotate: -30, opacity: 0, duration: 0.9, ease: 'back.out(2)' }, 0.05)
    .from(words, { yPercent: 115, rotate: 4, duration: 1, stagger: 0.04 }, 0.1)
    .from(head.querySelectorAll(':scope .wrap > div > :is(p, .btn, ul, form, a.btn), :scope .wrap > :is(p, .btn)'), { y: 22, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.35)
    .from(head.querySelectorAll('aside, .sv__box'), { x: 50, opacity: 0, rotationY: -12, transformPerspective: 900, duration: 1.1 }, 0.25);
  // la testata scivola via con leggera parallasse
  gsap.to(head.querySelector(':scope > .wrap'), {
    yPercent: 12, opacity: 0.4, ease: 'none',
    scrollTrigger: { trigger: head, start: 'top top', end: 'bottom top', scrub: true },
  });
}

// Comparsa automatica dei contenuti di tutte le pagine: elenchi, card, domande, tabelle.
function scrollReveals() {
  const sel = [
    'main .section .ticks > li', 'main .fg__list > li', 'main details', 'main .steps > li', 'main .towns > li',
    'main .sedi > li', 'main .ls__grid > li', 'main table tbody tr', 'main .group__brands > li', 'main .prose > :is(p, ul, ol, h2, h3, figure)',
    'main .section :is(.card, .as-card)', 'main .section img',
  ].join(',');
  const items = gsap.utils.toArray<HTMLElement>(sel).filter((el) =>
    !el.closest('[data-reveal], .hero, .bk, .rk, .pagehead, .ai') && el.getBoundingClientRect().top > window.innerHeight * 0.9);
  gsap.set(items, { y: 32, opacity: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 92%', once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  });
  // linea blu sotto i titoli che si allunga
  gsap.utils.toArray<HTMLElement>('main .rule').forEach((r) => {
    gsap.from(r, { scaleX: 0, transformOrigin: '0% 50%', duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%', once: true } });
  });
}

// Barra di avanzamento della lettura, sotto l'header.
function progressBar() {
  const bar = document.createElement('div');
  bar.className = 'readbar';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

// Header: diventa vetro sfocato con ombra appena si scorre.
function headerOnScroll() {
  const hdr = document.querySelector<HTMLElement>('.hdr');
  if (!hdr) return;
  ScrollTrigger.create({ start: 40, end: 'max', onToggle: (st) => hdr.classList.toggle('hdr--scrolled', st.isActive) });
}

// Card: un alone di luce segue il cursore.
function spotlightCards() {
  document.querySelectorAll<HTMLElement>('main :is(.glow, .as-card, .svc a, .ls__card, .group__brands li, details)').forEach((el) => {
    el.classList.add('spot');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

// Card dei prezzi e dei servizi: si inclinano leggermente verso il cursore.
function tiltCards() {
  document.querySelectorAll<HTMLElement>('main :is(.ls__card, .as-card, .sv__box)').forEach((el) => {
    gsap.set(el, { transformPerspective: 800 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

// Titoli h2 che salgono parola per parola quando arrivano a schermo.
function splitHeadings() {
  document.querySelectorAll<HTMLElement>('main h2:not([data-nosplit])').forEach((h) => {
    if (h.closest('.hero, .bk')) return;
    const words = splitWords([h]);
    gsap.from(words, {
      yPercent: 110, rotate: 3, duration: 1, ease: 'expo.out', stagger: 0.05,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });
}

// Pulsanti che si avvicinano al cursore.
function magneticButtons() {
  document.querySelectorAll<HTMLElement>('main .btn').forEach((b) => {
    const x = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.28);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    });
    b.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

// Avvolge ogni parola in due span (maschera + parola) senza toccare il resto del markup
// (es. <span class="accent">): il testo resta identico per Google e per i lettori di schermo.
function splitWords(roots: Iterable<Element>): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    for (const node of nodes) {
      const parts = (node.textContent ?? '').split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const p of parts) {
        if (!p) continue;
        if (/^\s+$/.test(p)) { frag.append(document.createTextNode(p)); continue; }
        const mask = document.createElement('span');
        mask.className = 'w-mask';
        const w = document.createElement('span');
        w.className = 'w';
        w.textContent = p;
        mask.append(w);
        frag.append(mask);
        out.push(w);
      }
      node.replaceWith(frag);
    }
  }
  return out;
}
