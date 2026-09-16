// Mobile top-drop menu, reveal, FAQ, lightbox, forms -> WhatsApp, counters, toTop
const WA_NUMBER = '919414374179';
const WA_DEFAULT = 'Hello, I am interested in Honey Kava Herbal Tea. Please share product details, price and availability.';
function waLink(msg){ return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg || WA_DEFAULT); }
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
  // mobile menu
  const btn = document.getElementById('hamburger'), menu = document.getElementById('mmenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
    document.getElementById('mclose')?.addEventListener('click', () => menu.classList.remove('open'));
  }
  // reveal
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  // counters (factual only)
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, end = parseInt(el.dataset.count || '0', 10); let cur = 0;
    const t = setInterval(() => { cur += Math.max(1, Math.round(end / 40)); if (cur >= end) { cur = end; clearInterval(t); } el.textContent = cur + (el.dataset.suffix || ''); }, 40);
  }), { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
  // FAQ
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
  // lightbox
  const lb = document.getElementById('lightbox');
  if (lb) {
    document.querySelectorAll('.gal figure').forEach(f => f.addEventListener('click', () => {
      lb.querySelector('img').src = f.querySelector('img').src;
      lb.classList.add('open');
    }));
    lb.addEventListener('click', () => lb.classList.remove('open'));
  }
  // toTop
  const tt = document.getElementById('toTop');
  if (tt) { window.addEventListener('scroll', () => tt.style.display = window.scrollY > 600 ? 'block' : 'none'); tt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); }
  // WA buttons with data-wa
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa || WA_DEFAULT); a.target = '_blank'; a.rel = 'noopener'; });
  // enquiry forms
  document.querySelectorAll('form[data-enquiry]').forEach(f => f.addEventListener('submit', ev => {
    ev.preventDefault();
    const g = n => (f.querySelector(`[name="${n}"]`)?.value || '').trim();
    const msg = `New Honey Kava Enquiry\nName: ${g('name')}\nMobile: ${g('mobile')}\nCity: ${g('city')}\nProduct: ${g('product') || 'Honey Kava Herbal Tea 100 gm'}\nQuantity: ${g('qty')}\nMessage: ${g('message')}`;
    window.open(waLink(msg), '_blank');
  }));
});
