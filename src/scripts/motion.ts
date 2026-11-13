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
  splitHeadings();
  if (finePointer) magneticButtons();
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
