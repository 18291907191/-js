const Detail = {
  articleId: null,
  // 查询文章详情
  getArticleDetail() {
    return new Promise((resolve, reject) => {
      const id = this.articleId;
      window.API.getArticleDetail({ id }).then(res => {
        this.renderArticleDetail(res);
        resolve(res);
      }, err => {
        window.globalMessage.error('查询文章详情失败');
        reject(err);
      });
    });
  },
  // 增加文章阅读量
  setArticleReaderNum() {
    return new Promise((resolve, reject) => {
      const id = this.articleId;
      window.API.setArticleReaderNum({ id }).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  },
  // 详情渲染
  renderArticleDetail(article) {
    const oArticleTitle = document.querySelector('.article-title');
    const oArticleDom = document.querySelector('.md');
    const oArticleCreateTime = document.querySelector('.article-create-time');
    const oArticleReadNum = document.querySelector('.article-read-num');
    const oArticleGoodNum = document.querySelector('.article-good-num');
    oArticleDom.innerHTML = window.marked(article.content);
    oArticleTitle.innerHTML = article.title;
    oArticleCreateTime.innerHTML = article.create_time;
    oArticleReadNum.innerHTML = article.reader_number;
    oArticleGoodNum.innerHTML = article.good_number;
    this.createArticleNavDom();
  },
  // 初始化
  async init() {
    this.getRouterParams();
    this.markedInit();
    await Promise.race([this.setArticleReaderNum(), this.getArticleDetail()]);
    this.appendScript('https://api.4gml.com/NeteaseMusic?type=bq'); // 网易云热评
    this.appendScript('http://static.bgwhite.cn/react-website/handleLove.js'); // 背景点击特效
    this.appendScript('http://static.bshare.cn/b/buttonLite.js#uuid=<您的uuid>&style=-1');
    this.appendScript('http://static.bshare.cn/b/addons/bsharePop.js');
  },
  // 获取路由参数
  getRouterParams() {
    const routerParams = window.location.search.split('=');
    this.articleId = routerParams[1];
  },
  // marked初始化
  markedInit() {
    window.marked.setOptions({
      renderer: new window.marked.Renderer(),
      highlight: function(code) {
        return window.hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  },
  // 添加文章导航
  createArticleNavDom() {
    // 文章导航
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
    document.body.appendChild(oArticleNav);
  },
  // 装饰插件
  appendScript(url) {
    const scriptEle = document.createElement('script');
    scriptEle.type = 'text/javascript';
    scriptEle.src = url;
    scriptEle.charset = 'utf-8';
    scriptEle.async = true;
    document.body.appendChild(scriptEle);
  }
};
Detail.init();

// css样式
require('../styles/reset.css');
require('../styles/header.less');
require('../styles/detail.less');
require('../styles/iconfont.css');
