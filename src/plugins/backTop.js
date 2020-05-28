/**
 * @description 回到顶部
 * @since 2020-05-22
 * @author 狗尾草
 */
window.onload = function() {
  // 文章导航
  var oArticleNav = this.document.createElement('div');
  oArticleNav.className = 'article-nav';
  oArticleNav.innerHTML = '<h1>文章导航</h1>';
  var oMd = this.document.querySelector('.md');
  for (var i = 0; i < oMd.childNodes.length; i++) {
    if (oMd.childNodes[i].tagName === 'H2') {
      var oA = this.document.createElement('a');
      oA.innerHTML = oMd.childNodes[i].innerHTML;
      oA.href = '#' + oMd.childNodes[i].id;
      oArticleNav.appendChild(oA);
    }
  };
  this.document.body.appendChild(oArticleNav);
  // 创建dom
  var obtn = this.document.createElement('div');
  obtn.className = 'gotop';
  obtn.title = '回到顶部';
  obtn.innerHTML = '<i class="iconfont">&#xe606;</i>';
  this.document.body.appendChild(obtn);
  var clientHeight = this.document.documentElement.clientHeight; // 获取可视区域的高度
  console.log('97', clientHeight);
  var timer = null; // 定义一个定时器
  var isTop = true; // 定义一个布尔值，用于判断是否到达顶部
  window.onscroll = function() { // 滚动条滚动事件
    // 获取滚动条的滚动高度
    var osTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;

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
      var osTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
      // 用于设置速度差，产生缓动的效果
      var speed = Math.floor(-osTop / 6);
      this.document.documentElement.scrollTop = this.document.body.scrollTop = osTop + speed;
      isTop = true; // 用于阻止滚动事件清除定时器
      if (osTop == 0) {
        clearInterval(timer);
      }
    }, 30);
  };
  // 创建样式
  var oHead = this.document.querySelector('head');
  var oMsgStyle = this.document.createElement('style');
  oMsgStyle.type = 'text/css';
  const msgStyle = `
          .gotop {
            position: fixed;
            right: 73px;
            bottom: 100px;
            color: #45BCF9;
            cursor: pointer;
            padding: 0 10px;
            text-align: center;
            display: none;

          }
          .gotop i {
              font-size: 38px;
          }
        `;
  try {
    oMsgStyle.appendChild(this.document.createTextNode(msgStyle));
  } catch (ex) {
    oMsgStyle.styleSheet.cssText = msgStyle;// 针对IE
  }
  oHead.appendChild(oMsgStyle);
};
