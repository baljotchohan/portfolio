// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const primaryNav = document.querySelector('.primary-nav');
if (navToggleButton && primaryNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Simple accordion behavior
document.querySelectorAll('.accordion-item').forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    item.classList.toggle('open');
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// 3D tilt effect across elements with class .tilt
function enableTilt() {
  const tiltElements = document.querySelectorAll('.tilt');
  tiltElements.forEach((el) => {
    const max = Number(el.getAttribute('data-tilt-max') || 8);
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let rafId = 0;

    function onMove(e) {
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      const rotX = Math.max(Math.min(-y * max, max), -max);
      const rotY = Math.max(Math.min(x * max, max), -max);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        el.style.transition = 'transform 60ms linear';
      });
    }

    function reset() {
      cancelAnimationFrame(rafId);
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      el.style.transition = 'transform 220ms ease';
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });
}

window.addEventListener('load', enableTilt);

// Subtle 3D text hover accent on headings and links
function enableTextLift() {
  const liftables = document.querySelectorAll('h1, h2, h3, .logo-text, a');
  liftables.forEach((el) => {
    el.addEventListener('mousemove', () => {
      el.style.textShadow = '0 2px 0 #ffffff, 0 14px 28px rgba(11,15,18,0.10)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.textShadow = '';
    });
  });
}

window.addEventListener('load', enableTextLift);


