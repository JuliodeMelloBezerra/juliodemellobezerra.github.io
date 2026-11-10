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

    // 2. Check if a back button already exists
    var existingBackLink = document.querySelector('a[href="../../"]') || document.querySelector('a[href="./"]') || document.getElementById('nav-back-home');

    // If no back link exists and there is a top navbar, inject one
    if (nav && !existingBackLink) {
      var backBtn = document.createElement('a');
      backBtn.id = 'nav-back-home';
      backBtn.href = '../../';
      backBtn.className = 'btn-action';
      backBtn.style.textDecoration = 'none';
      backBtn.innerHTML = '← Home';
      nav.insertBefore(backBtn, nav.firstChild);
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