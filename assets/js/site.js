document.addEventListener('DOMContentLoaded', function() {

  // ── Nav toggle (hamburger menu) ──
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Fix talent.html links -> training.html ──
  document.querySelectorAll('a').forEach(function(link) {
    var href = (link.getAttribute('href') || '').trim();
    if (href === 'talent.html' || href === './talent.html' ||
        href === '#talent' || href.endsWith('/talent.html')) {
      link.href = 'training.html';
    }
  });

  // ── Load guild-api.js if not already present ──
  if (!window.GuildApi && !document.querySelector('script[src*="guild-api.js"]')) {
    var api = document.createElement('script');
    api.src = './assets/js/guild-api.js?v=20260601-static-cache';
    api.defer = true;
    document.body.appendChild(api);
  }

});
