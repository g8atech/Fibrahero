// Kit animazioni FibraHero: GSAP + Lenis, con effetti ispirati a React Bits
// (BlurText, Magnet, SpotlightCard) riscritti senza React.
//
// Regole del template:
// - i testi restano sempre nell'HTML: le animazioni li fanno solo comparire;
// - con "riduci movimento" attivo non parte niente;
// - lo scroll morbido (Lenis) solo con mouse/trackpad, mai su touch;
// - niente animazioni che nascondono il blocco iniziale (hero), per non toccare l'LCP.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduce) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const header = document.querySelector<HTMLElement>('.hdr');
  const headerOffset = () => -((header?.offsetHeight ?? 0) + 12);

  // 1. Scroll morbido (solo desktop) sincronizzato con ScrollTrigger
  let lenis: Lenis | null = null;
  if (finePointer) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis-on');
  }

  // 2. Link interni (#verifica ecc.): scorrimento morbido tenendo conto dell'header fisso
  document.addEventListener('click', (ev) => {
    const a = (ev.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.classList.contains('skip')) return;
    const target = document.querySelector<HTMLElement>(a.getAttribute('href')!);
    if (!target) return;
    ev.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: headerOffset(), duration: 1.2 });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + headerOffset(), behavior: 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
  });

  // 3. Barra di avanzamento della lettura sotto l'header
  const bar = document.createElement('div');
  bar.className = 'scroll-bar';
  bar.setAttribute('aria-hidden', 'true');
  (header ?? document.body).append(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  // 4. Titoli che entrano parola per parola, sfocati → nitidi (BlurText di React Bits).
  // SplitText mette aria-label sul titolo: lettori di schermo e motori leggono la frase intera.
  document.querySelectorAll<HTMLElement>('main h2:not([data-no-split]), .cta h2').forEach((h) => {
    if (h.closest('.hero')) return;
    SplitText.create(h, {
      type: 'words',
      wordsClass: 'sw',
      aria: 'auto',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          opacity: 0, yPercent: 40, filter: 'blur(10px)',
          duration: 0.8, ease: 'power3.out', stagger: 0.06,
          clearProps: 'filter',
          scrollTrigger: { trigger: h, start: 'top 88%', once: true },
        }),
    });
  });

  // 5. Parallasse leggera sulle immagini del supereroe
  gsap.utils.toArray<HTMLElement>('.hero__visual, .cta__visual').forEach((el) => {
    gsap.to(el, {
      yPercent: el.classList.contains('hero__visual') ? 14 : -10, ease: 'none',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // 6. Righe del confronto "loro / noi" che scorrono dentro in sequenza
  gsap.utils.toArray<HTMLElement>('.cmp li, .steps li').forEach((li) => {
    gsap.from(li, {
      opacity: 0, x: li.closest('.cmp') ? 40 : -30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: li, start: 'top 90%', once: true },
    });
  });

  if (finePointer) {
    // 7. Bottoni "calamita": seguono leggermente il mouse (Magnet di React Bits)
    document.querySelectorAll<HTMLElement>('.btn--wa, .btn--blue').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
      const y = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.25);
        y((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('pointerleave', () => { x(0); y(0); });
    });

    // 8. Card con luce che segue il mouse (SpotlightCard di React Bits)
    document.querySelectorAll<HTMLElement>('.svc a, .group__brands li, [data-spotlight]').forEach((card) => {
      card.classList.add('spot');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  // Ricalcola le posizioni quando immagini e font hanno finito di caricare
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
