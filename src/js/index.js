// 获取文章列表
const HomePage = {
  oArticleDom: null,
  oMsgDom: null,
  getArticleParams: { status: 1, page: 1, size: 5 },
  totalPage: 0,
  // 文章渲染
  articleRender(articleData) {
    for (let i = 0; i < articleData.length; i++) {
      this.oArticleDom.innerHTML += `
        <li class="bot">${articleData[i].isNew ? "<i class='iconfont recent'>&#xe673;</i>" : ''}
          <a href="detail.html?id=1"  class="img-hd">
            <img
              alt="狗尾草的前端博客"
              title="${articleData[i].title}"
              src="${articleData[i].title_image || 'http://static.bgwhite.cn/react-website/title-img-default.jpg'}"
            />
          </a> 
          <div class="cont">
            <header>
              <a href="detail.html?id=1" class="tag" >${articleData[i].tagName}</a>
              <a href="detail.html?id=1" class="tit" >${articleData[i].title}</a>
            </header>
            <p class="meta">
              <span>${articleData[i].update_time}</span>
              <span>阅读(${articleData[i].reader_number})</span>
              <span>评论(${articleData[i].comment_number || 0})</span> 
              <span>赞(${articleData[i].good_number})</span> 
            </p>
            <p class="desc">${articleData[i].describe}</p>
          </div>
        </li>`;
    }
  },
  // 文章模块结束加载
  closeLoading() {
    var oLoadingDom = document.querySelector('.loading-template');
    oLoadingDom.style = 'display:none';
  },
  // 文章模块加载
  showLoadingFail() {
    var oLoadingFailDom = document.querySelector('.loading-fail');
    oLoadingFailDom.style = 'display:block';
  },
  // 获取文章列表
  getArticleData() {
    window.API.getArticleList(this.getArticleParams).then(res => {
      this.oArticleDom.innerHTML = '';
      const totalPage = Number(res.total);
      const size = Number(res.size);
      this.totalPage = totalPage % size === 0 ? (totalPage / size) : (Math.floor(totalPage / size) + 1);
      this.articleRender(res.articleData);
      scrollTo(0, 0); // 回到顶部
    }, () => {
      window.globalMessage.error('查询文章失败');
      this.closeLoading();
      this.showLoadingFail();
    });
  },
  // 初始化
  init() {
    this.oArticleDom = document.querySelector('.article-wrap ul');
    this.getArticleData();
  },
  // 下一页
  handleNextPage() {
    console.log('71', this.getArticleParams.page);
    if (this.getArticleParams.page >= this.totalPage) {
      return;
    }
    this.getArticleParams.page += 1;
    this.getArticleData();
  },
  // 首页
  handleIndexPage() {
    this.getArticleParams.page = 1;
    this.getArticleData();
  },
  // 上一页
  handlePreviousPage() {
    if (this.getArticleParams.page <= 1) {
      return;
    }
    this.getArticleParams.page -= 1;
    this.getArticleData();
  }
};
window.HomePage = HomePage;
HomePage.init();

require('../styles/reset.css');
require('../styles/header.css');
require('../styles/index.css');
require('../styles/iconfont.css');
