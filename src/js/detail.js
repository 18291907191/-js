const Detail = {
  articleId: null,
  getArticleDetail () {
    const id = this.articleId;
    DETAIL.getArticleDetail({ id }).then(res => {
      this.articleDetailRender(res);
    }, () => {
      window.globalMessage.error('查询文章详情失败');
    });
  },
  // 详情渲染
  articleDetailRender(article) {
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
  },
  init() {
    this.getRouterParams();
    this.markedInit();
    this.getArticleDetail();
    this.appendScript();
  },
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
  // 追加评论
  appendScript() {
    const wyyrp = document.createElement('script');
    wyyrp.type = 'text/javascript';
    wyyrp.src = 'https://api.4gml.com/NeteaseMusic?type=bq';
    wyyrp.async = true;
    wyyrp.defer = true;
    document.body.appendChild(wyyrp);
  }
};
Detail.init();
