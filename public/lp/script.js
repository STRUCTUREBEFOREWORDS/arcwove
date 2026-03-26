/* ═══════════════════════════════════════════
   arcwove LP — script.js
═══════════════════════════════════════════ */

// ══════════════════════════════════════════
// ★ 本番デプロイ時はこのURLを変更してください ★
// 開発: http://localhost:5173
// 本番: https://arcwove.com
// ══════════════════════════════════════════
var SITE_URL = 'http://localhost:5173';

// ── CTA リンク設定 ──
document.querySelectorAll('[data-cta]').forEach(function (el) {
  var plan = el.getAttribute('data-cta');
  el.href = plan
    ? SITE_URL + '/#/counseling?plan=' + plan
    : SITE_URL + '/#/counseling';
});

// ── スクロールアニメーション ──
(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// ── ナビ スクロール状態 ──
(function () {
  var nav = document.querySelector('nav');
  function update() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── アンカースムーススクロール ──
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
