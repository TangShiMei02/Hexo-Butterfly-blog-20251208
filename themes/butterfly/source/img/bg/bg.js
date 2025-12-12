/* themes/butterfly/source/img/bg/bg.js */
(function(){
  const TOTAL = 3;                       // 几张图就写几
  const idx   = Math.floor(Math.random()*TOTAL)+1;
  const url   = '/img/bg/bg'+idx+'.png';
  document.body.style.cssText +=
    'background:url('+url+') no-repeat center/cover fixed;' +
    'background-attachment:fixed !important;';
})();