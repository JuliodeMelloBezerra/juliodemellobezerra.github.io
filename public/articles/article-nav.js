(function () {
  // 1. Apply theme immediately before rendering to eliminate white flashes
  function applyTheme() {
    var saved = localStorage.getItem('julio-theme');
    var theme = 'light';
    if (saved === 'dark' || saved === 'light') {
      theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTheme();

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.top-nav');

    // 2. Check if a back link already exists (e.g., in strong-pseudoprimes)
    var existingBackLink =
      document.querySelector('a[href="../../"]') ||
      document.querySelector('a[href="./"]') ||
      document.getElementById('nav-back-home');

    if (nav && !existingBackLink) {
      var backLink = document.createElement('a');
      backLink.id = 'nav-back-home';
      backLink.href = '../../';
      backLink.style.color = 'var(--ink-dim)';
      backLink.style.textDecoration = 'none';
      backLink.style.transition = 'color 0.15s ease';
      backLink.innerHTML = '&larr; Julio de Mello Bezerra';

      backLink.addEventListener('mouseenter', function () {
        backLink.style.color = 'var(--ink)';
      });
      backLink.addEventListener('mouseleave', function () {
        backLink.style.color = 'var(--ink-dim)';
      });

      // Replace the article series title if present; otherwise insert at the start
      var brand = nav.querySelector('.top-nav-brand');
      if (brand) {
        nav.replaceChild(backLink, brand);
      } else {
        nav.insertBefore(backLink, nav.firstChild);
      }
    }

    // 3. Support either button ID: #theme-toggle-btn or #theme-toggle
    var themeBtn = document.getElementById('theme-toggle-btn') || document.getElementById('theme-toggle');
    if (themeBtn) {
      var newBtn = themeBtn.cloneNode(true);
      themeBtn.parentNode.replaceChild(newBtn, themeBtn);

      newBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try {
          localStorage.setItem('julio-theme', next);
        } catch (e) {}
      });
    }
  });
})();