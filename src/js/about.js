
window.onload = function() {
  // 装饰插件
  function appendScript(url) {
    const scriptEle = document.createElement('script');
    scriptEle.type = 'text/javascript';
    scriptEle.src = url;
    scriptEle.charset = 'utf-8';
    scriptEle.async = true;
    document.body.appendChild(scriptEle);
  }
  appendScript('http://static.bgwhite.cn/react-website/handleLove.js'); // 背景点击特效
  appendScript('http://static.bshare.cn/b/buttonLite.js#uuid=<您的uuid>&style=-1');
  appendScript('http://static.bshare.cn/b/addons/bsharePop.js');
};

require('../styles/reset.css');
require('../styles/header.less');
require('../styles/about.less');
require('../styles/iconfont.css');
