/* themes/butterfly/source/img/bg/bg.js */
(function () {
  const BG_URLS = [
    '/img/bg/bg1.png',
    // 添加任意数量的本地或远程图片
  ];

  if (BG_URLS.length === 0) return;

  const idx = Math.floor(Math.random() * BG_URLS.length);
  const url = BG_URLS[idx];

  document.body.style.cssText += `
    background: url(${url}) no-repeat center/cover fixed;
    background-attachment: fixed !important;
  `;
})();