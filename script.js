function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navToggle').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').classList.remove('open');
}

function toggleTheme() {
  const root = document.getElementById('portfolio-root');
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (isDark) {
    root.removeAttribute('data-theme');
    icon.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    label.textContent = 'Dark';
  } else {
    root.setAttribute('data-theme', 'dark');
    icon.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    label.textContent = 'Light';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  revealEls.forEach(el => io.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 1400;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statEls = document.querySelectorAll('.stat-num[data-target]');
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObs.observe(el));

  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const scrollObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + e.target.id) a.classList.add('active');
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => scrollObs.observe(s));

  const backBtn = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });
});
