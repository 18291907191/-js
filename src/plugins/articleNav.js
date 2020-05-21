window.onload = function() {
  // 文章导航
  var oArticleNav = document.createElement('div');
  oArticleNav.className = 'article-nav';
  oArticleNav.innerHTML = '<h1>文章导航</h1>';
  var oMd = document.querySelector('.md');
  if (!oMd.childNodes.length) {
    return;
  }
  for (var i = 0; i < oMd.childNodes.length; i++) {
    if (oMd.childNodes[i].tagName === 'H2') {
      this.console.log('12', oMd.childNodes[i]);
      var oA = document.createElement('a');
      oA.innerHTML = oMd.childNodes[i].innerHTML;
      oA.href = '#' + oMd.childNodes[i].id;
      oArticleNav.appendChild(oA);
    }
  };
  this.document.querySelector('body').appendChild(oArticleNav);
  createArticleNavStyle();

  var obtn = document.getElementById('backtop'); // 获取回到顶部按钮的ID
  var clientHeight = document.documentElement.clientHeight; // 获取可视区域的高度
  var timer = null; // 定义一个定时器
  var isTop = true; // 定义一个布尔值，用于判断是否到达顶部

  // 回到顶部
  window.onscroll = function() { // 滚动条滚动事件
    // 获取滚动条的滚动高度
    var osTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (osTop >= clientHeight) { // 如果滚动高度大于可视区域高度，则显示回到顶部按钮
      obtn.style.display = 'block';
    } else { // 否则隐藏
      obtn.style.display = 'none';
    }

    // 主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
    if (!isTop) {
      clearInterval(timer);
    }
    isTop = false;
  };
  obtn.onclick = function() { // 回到顶部按钮点击事件
    // 设置一个定时器
    timer = setInterval(function() {
      // 获取滚动条的滚动高度
      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 用于设置速度差，产生缓动的效果
      var speed = Math.floor(-osTop / 6);
      document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
      isTop = true; // 用于阻止滚动事件清除定时器
      if (osTop == 0) {
        clearInterval(timer);
      }
    }, 30);
  };
};

// 创建文章导航的样式
function createArticleNavStyle() {
  var oHead = document.querySelector('head');
  var oMsgStyle = document.createElement('style');
  oMsgStyle.type = 'text/css';
  const navStyle = `
    .article-nav {
      height: auto;
      background-color: rgba(255,255,255,.7);
      position: fixed;
      right:0;
      top: 130px;
      display: flex;
      flex-direction: column;
      text-align: left;
      border: 1px solid #f1f1f1;
      font-size: 18px;
      padding: 10px 0 0 10px;
    }
    .article-nav h1 {
      padding: 5px 0;
      text-align: center;
      border-bottom: 1px solid #45BCF9;
      margin-bottom: 5px;
    }
    .article-nav a {
      color: #333333;
      font-size: 16px;
      line-height: 30px;
      display: block;
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      text-indent: 20px;
    }
    .article-nav a:before {
      content: "·";
      position: absolute;
      left: -10px;
      font-weight: bolder;
      font-size: 18px;
    }
    .article-nav a:hover {
      color: #45BCF9;
    }
  `;
  try {
    oMsgStyle.appendChild(document.createTextNode(navStyle));
  } catch (ex) {
    oMsgStyle.styleSheet.cssText = navStyle;// 针对IE
  }
  oHead.appendChild(oMsgStyle);
};
