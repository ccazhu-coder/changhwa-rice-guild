/* ═══════════════════════════════════════════════════
   彰化縣米穀商業同業公會官網 v2 正式版
   main.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 漢堡選單 ── */
  const toggle = document.getElementById('nav-toggle');
  const navWrap = document.querySelector('.nav-wrap');

  if (toggle && navWrap) {
    toggle.addEventListener('click', function () {
      navWrap.classList.toggle('open');
      const isOpen = navWrap.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // 點選任一連結後關閉選單
    navWrap.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navWrap.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });

    // 點選選單外部關閉
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navWrap.contains(e.target)) {
        navWrap.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }

  /* ── 目前年份 ── */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── LINE QR Code 圖片錯誤處理 ── */
  const lineImg = document.querySelector('.line-qr-img');
  if (lineImg) {
    lineImg.addEventListener('error', function () {
      this.style.display = 'none';
      const placeholder = document.querySelector('.line-placeholder');
      if (placeholder) placeholder.style.display = 'flex';
    });
  }

});
