/* 太阳东升西落 + 月亮西升东落 | 1.2 s 舒缓版 */
(function () {
  const html = `
    <div id="dn-transition" aria-hidden="true">
      <div class="dn-icon dn-sun"></div>
      <div class="dn-icon dn-moon"></div>
    </div>`;
  const css = `
    #dn-transition{
      position:fixed;inset:0;pointer-events:none;z-index:9999;
      overflow:hidden;
      background:linear-gradient(to bottom,#74b9ff,#dfe6e9);
      opacity:0;transition:opacity 1.2s ease-out;
    }
    #dn-transition.show{opacity:1}
    .dn-icon{
      position:absolute;top:50%;width:4rem;height:4rem;border-radius:50%;
      transform:translateY(-50%);
      transition:transform 1.2s ease-in-out,opacity 1.2s ease-in-out;
    }
    .dn-sun{background:#fdd835;box-shadow:0 0 20px #fdd835;}
    .dn-moon{background:#dcdde1;box-shadow:0 0 20px #dcdde1;}
    html[data-theme="dark"] #dn-transition{background:linear-gradient(to bottom,#2c3e50,#130f40);}
  `;

  // 插入样式
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // 创建遮罩节点
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  const mask = wrap.firstElementChild;
  document.body.appendChild(mask);

  const sun  = mask.querySelector('.dn-sun');
  const moon = mask.querySelector('.dn-moon');

  /* 太阳/月亮 东升西落 动画 */
  window.playDayNightTransition = function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // 初始位置：太阳在左-外，月亮在右-外
    sun.style.left = '-10%';
    moon.style.left = '110%';
    sun.style.opacity  = isDark ? '1' : '0';
    moon.style.opacity = isDark ? '0' : '1';

    mask.classList.add('show');

    // 第一段（0 → 1200 ms）（同进同出）
    setTimeout(() => {
      sun.style.left  = isDark ? '110%' : '50%';   //  dark:太阳落山  light:太阳升到中央
      moon.style.left = isDark ? '50%'  : '-10%';  //  dark:月亮到中央 light:月亮出山
      sun.style.opacity  = isDark ? '0' : '1';
      moon.style.opacity = isDark ? '1' : '0';
    }, 0);

    // 第二段（1200 ms 后）遮罩淡出 + 复位（为下次准备）
    setTimeout(() => {
      mask.classList.remove('show');
      // 复位到屏幕外
      sun.style.left  = '-10%';
      moon.style.left = '110%';
      sun.style.opacity  = '1';
      moon.style.opacity = '1';
    }, 1200);
  };
})();