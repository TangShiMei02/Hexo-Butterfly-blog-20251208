/* 白天/夜间随机背景切换 + 太阳↔月亮过渡 | Butterfly 专用 */
(function(){
  const LIGHT_TOTAL = 2;            // light-N 的张数
  const DARK_TOTAL  = 1;            // dark-N  的张数
  const folder  = '/img/bg/';
  const ext     = '.png';           // 如果用 png 就改成 '.png'

  /* 根据 html 的 data-theme 属性判断当前主题 */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  /* 随机选一张 */
  function randomImg(theme) {
    const total = theme === 'dark' ? DARK_TOTAL : 
  LIGHT_TOTAL;
    const idx   = Math.floor(Math.random() * total) + 1;
    return `${folder}${theme}-${idx}${ext}`;
  }

  /* 设置背景 */
  function setBg() {
    const img = randomImg(getTheme());
    document.body.style.background = `url(${img}) no-repeat center/cover fixed`;
  }

  /* 初始执行 */
  setBg();

  /* 监听主题切换：先播放过渡，再换背景 */
  new MutationObserver(() => {
    if (typeof playDayNightTransition === 'function') playDayNightTransition();
    setTimeout(() => setBg(), 1000);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();












