window.onload = function() {
  var oArticleNav = document.createElement('div');
  oArticleNav.className = 'article-nav';
  oArticleNav.innerHTML = '<h1>文章导航</h1>';
  var oMd = document.querySelector('.md');
  for (var i = 0; i < oMd.childNodes.length; i++) {
    if (oMd.childNodes[i].tagName === 'H2') {
      var oA = document.createElement('a');
      oA.innerHTML = oMd.childNodes[i].innerHTML;
      oA.href = '#' + oMd.childNodes[i].id;
      oArticleNav.appendChild(oA);
    }
  };
  this.document.querySelector('body').appendChild(oArticleNav);
  createArticleNavStyle();
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
