(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const form = document.getElementById('contact-form');

  /* Navbar scroll effect */
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  }, { passive: true });

  /* Active nav link */
  function updateActiveNav() {
    const pos = window.scrollY + 100;
    sections.forEach(function (sec) {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.id;
      if (pos >= top && pos < top + h) {
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  updateActiveNav();

  /* Mobile menu */
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Scroll animations */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  fadeEls.forEach(function (el) { observer.observe(el); });

  /* Hero visible on load */
  document.querySelectorAll('.hero .fade-up').forEach(function (el, i) {
    setTimeout(function () { el.classList.add('visible'); }, 200 + i * 150);
  });

  /* Skill bars */
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar');
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--level', level + '%');
        entry.target.classList.add('animated');
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(function (card) { skillObs.observe(card); });

  /* Contact form */
  function setError(id, msg) {
    document.getElementById(id + '-error').textContent = msg;
    const input = document.getElementById(id);
    if (input) input.style.borderColor = msg ? '#f85149' : '';
  }

  function clearErrors() {
    ['name', 'email', 'subject', 'message'].forEach(function (f) {
      setError(f, '');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    let ok = true;

    if (!name) { setError('name', 'Name is required'); ok = false; }
    if (!email) {
      setError('email', 'Email is required'); ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Invalid email address'); ok = false;
    }
    if (!subject) { setError('subject', 'Subject is required'); ok = false; }
    if (!message) {
      setError('message', 'Message is required'); ok = false;
    } else if (message.length < 10) {
      setError('message', 'Minimum 10 characters'); ok = false;
    }

    if (!ok) return;

    const btn = form.querySelector('button[type="submit"]');
    const label = form.querySelector('.btn-label');
    const loading = form.querySelector('.btn-loading');
    const success = document.getElementById('form-success');

    label.hidden = true;
    loading.hidden = false;
    btn.disabled = true;

    setTimeout(function () {
      label.hidden = false;
      loading.hidden = true;
      btn.disabled = false;
      success.hidden = false;
      form.reset();
      setTimeout(function () { success.hidden = true; }, 5000);
    }, 1200);
  });
})();
