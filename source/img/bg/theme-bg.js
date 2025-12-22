/* 白天/夜间随机背景切换 + 太阳↔月亮过渡 | Butterfly 专用 */
(function () {
  // ✅ 改为直接配置图片 URL 列表（支持任意 URL）
  const LIGHT_URLS = [
    //'/img/bg/light-1.png',
    'https://cdn.magicalapk.com/square/7214a46d-d871-4751-b4dd-b2f1e901305c.jpg',
    'https://cdn.magicalapk.com/square/270f4c93-5ad3-4ae7-bdd9-59ee5bba0ee5.jpg',
    'https://cdn.magicalapk.com/square/274100ea-b645-465c-b8a0-b8044a3cb78d.jpg'
    // 可继续添加更多，本地或远程均可
  ];
  const DARK_URLS = [
    '/img/bg/dark-1.png',
    'https://cdn.magicalapk.com/square/22817ee1-0b30-46ed-ba31-4c59e5df4934.jpg'
    // 可继续添加
  ];

  /* 根据 html 的 data-theme 属性判断当前主题 */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  /* 随机选一张 */
  function randomImg(theme) {
    const urls = theme === 'dark' ? DARK_URLS : LIGHT_URLS;
    if (urls.length === 0) return null;
    const idx = Math.floor(Math.random() * urls.length);
    return urls[idx];
  }

  /* 设置背景 */
  function setBg() {
    const url = randomImg(getTheme());
    if (url) {
      document.body.style.background = `url(${url}) no-repeat center/cover fixed`;
    }
  }

  /* 初始执行 */
  setBg();

  /* 监听主题切换：先播放过渡，再换背景 */
  new MutationObserver(() => {
    if (typeof playDayNightTransition === 'function') playDayNightTransition();
    setTimeout(setBg, 1000);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();