(function () {
  'use strict';

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.mobile-menu');
  var body = document.body;

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-locked');
  }

  function openMenu() {
    if (!toggle || !menu) return;
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('is-locked');
  }

  if (toggle && menu) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // --- FAQ accordion ---
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq__q');
    if (!button) return;

    var answer = item.querySelector('.faq__a');
    var answerId = answer ? answer.id || ('faq-a-' + Math.random().toString(36).slice(2, 8)) : null;
    if (answer && !answer.id) answer.id = answerId;

    button.setAttribute('aria-expanded', 'false');
    if (answerId) button.setAttribute('aria-controls', answerId);

    button.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // --- Reveal on scroll (IntersectionObserver) ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // --- Footer year ---
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
