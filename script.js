// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

// Click ripple
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.left = e.clientX + 'px';
  r.style.top = e.clientY + 'px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

// Hover cursor scale
document.querySelectorAll('a, button, .service-card, .product-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hero counter
function countUp(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.round(start) + suffix;
  }, 16);
}
setTimeout(() => countUp(document.getElementById('counter'), 500, '+', 1800), 1200);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Why point reveal
const whyPoints = document.querySelectorAll('.why-point');
const io2 = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay) || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      io2.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
whyPoints.forEach(el => io2.observe(el));

// Stats counters
const statsData = [
  { id: 'c1', val: 10, suffix: '+' },
  { id: 'c2', val: 12, suffix: '+' },
  { id: 'c3', val: 300, suffix: '+' },
  { id: 'c4', val: 98, suffix: '%' },
];
const io3 = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      statsData.forEach(s => countUp(document.getElementById(s.id), s.val, s.suffix, 1500));
      io3.disconnect();
    }
  });
}, { threshold: 0.3 });
io3.observe(document.getElementById('c1'));

// Testimonials
const track = document.getElementById('testimonialsInner');
const dots = document.querySelectorAll('.testimonial-dot');
let current = 0;
function goTo(idx) {
  current = idx;
  track.style.transform = `translateX(calc(-${idx * 51}%))`;
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.index))));
let autoSlide = setInterval(() => goTo((current + 1) % 4), 5000);
track.addEventListener('mouseenter', () => clearInterval(autoSlide));
track.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goTo((current + 1) % 4), 5000); });

// Contact form
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const service = document.getElementById('serviceSelect').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  if (!name || !phone || !service) {
    document.getElementById('nameInput').focus();
    return;
  }

  const recipient = 'vinayaksharma135017@gmail.com';
  const subject = encodeURIComponent('Service request from website');
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Service needed: ${service}\n` +
    `Message: ${message || 'None'}`
  );

  submitBtn.textContent = 'Opening email…';
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  formMsg.textContent = 'Your email draft is ready. Please send it to complete the request.';
  formMsg.style.display = 'block';
});
