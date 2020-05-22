// 获取文章列表
const HomePage = {
  oArticleDom: null, // 文章列表
  oArticleGoodDom: null, // 推荐文章
  oMsgDom: null,
  getArticleParams: { status: 1, page: 1, size: 5, tagId: '', searchParams: '' },
  totalPage: 0,
  cachData: null,
  // 文章渲染
  renderArticleList(articleData) {
    if (!articleData.length) {
      this.oArticleDom.innerHTML += "<li class='bot'>WTF！没有文章？请将狗尾草痛打一顿，不要留情。您也可以与狗尾草进行QQ交谈，让他帮忙了解您所需要的文章~</li>";
      return;
    }
    for (var i = 0; i < articleData.length; i++) {
      console.log('16', articleData[i].id);
      this.oArticleDom.innerHTML += `
        <li class="bot">${articleData[i].isNew ? "<i class='iconfont recent'>&#xe673;</i>" : ''}
          <a href="detail.html?id=${articleData[i].id}"  class="img-hd">
            <img
              alt="狗尾草的前端博客"
              title="${articleData[i].title}"
              src="${articleData[i].title_image || 'http://static.bgwhite.cn/react-website/title-img-default.jpg'}"
            />
          </a> 
          <div class="cont">
            <header>
              <a href="detail.html?id=${articleData[i].id}" class="tag" >${articleData[i].tagName}</a>
              <a href="detail.html?id=${articleData[i].id}" class="tit" >${articleData[i].title}</a>
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
  // 推荐好文渲染
  renderArticleGood(articleData) {
    for (var i = 0; i < articleData.length; i++) {
      const oLi = document.createElement('li');
      oLi.innerHTML = `<a href='detail.html?id=${articleData[i].id}'>${articleData[i].title}（${articleData[i].reader_number}）</a>`;
      this.oArticleGoodDom.appendChild(oLi);
    }
  },
  // 查询文章标签
  renderArticleTag(tagData) {
    for (var i = 0; i < tagData.length; i++) {
      const oLi = document.createElement('li');
      oLi.innerHTML = `<a onclick='HomePage.handleTag(${tagData[i].id})'>${tagData[i].name}（${tagData[i].count}）</a>`;
      this.oArticleTagDom.appendChild(oLi);
    }
  },
  // 标签切换
  handleTag(id) {
    if (this.cachData === id) {
      return;
    }
    this.cachData = id;
    this.getArticleParams.tagId = id;
    this.getArticleParams.page = 1;
    this.getArticleData(false, 'tag');
  },
  // 文章搜索
  handleSearch() {
    const sSearchCont = document.getElementById('article_search').value;
    if (this.cachData === sSearchCont) {
      return;
    }
    this.getArticleParams.searchParams = sSearchCont;
    this.getArticleParams.page = 1;
    this.getArticleData();
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
  getArticleData(isBackTop = false, from) {
    return new Promise((resolve, reject) => {
      this.oArticleDom = document.querySelector('.article-wrap ul');
      window.API.getArticleList(this.getArticleParams).then(res => {
        this.oArticleDom.innerHTML = '';
        const totalPage = from === 'tag' ? res.articleData.length : Number(res.total);
        const size = Number(res.size);
        this.totalPage = totalPage % size === 0 ? (totalPage / size) : (Math.floor(totalPage / size) + 1);
        console.log('96', this.totalPage);
        this.renderArticleList(res.articleData);
        if (isBackTop) {
          scrollTo(0, 0); // 回到顶部
        }
        resolve(res);
      }, err => {
        window.globalMessage.error('查询文章失败');
        this.closeLoading();
        this.showLoadingFail();
        reject(err);
      });
    });
  },
  // 获取推荐文章
  getGoodArticleData() {
    return new Promise((resolve, reject) => {
      this.oArticleGoodDom = document.querySelector('#article_good');
      window.API.getArticleGood().then(res => {
        this.renderArticleGood(res);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  },
  // 获取文章分类
  getArticleTagData() {
    return new Promise((resolve, reject) => {
      this.oArticleTagDom = document.querySelector('#article_tag');
      window.API.getArticleTagList().then(res => {
        this.renderArticleTag(res);
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  },
  // 初始化
  async init() {
    await Promise.race([
      this.getArticleData(true),
      this.getArticleTagData(),
      this.getGoodArticleData()
    ]);
    this.appendScript('http://static.bgwhite.cn/react-website/handleLove.js'); // 背景点击特效
    this.appendScript('http://static.bshare.cn/b/buttonLite.js#uuid=<您的uuid>&style=-1');
    this.appendScript('http://static.bshare.cn/b/addons/bsharePop.js');
  },
  // 下一页
  handleNextPage() {
    console.log('71', this.getArticleParams.page);
    console.log('113', this.totalPage);
    if (this.getArticleParams.page >= this.totalPage) {
      window.globalMessage.warning('暂无更多文章');
      return;
    }
    this.getArticleParams.page += 1;
    this.getArticleData(true);
  },
  // 首页
  handleIndexPage() {
    this.getArticleParams.page = 1;
    this.getArticleData(true);
  },
  // 上一页
  handlePreviousPage() {
    if (this.getArticleParams.page <= 1) {
      return;
    }
    this.getArticleParams.page -= 1;
    this.getArticleData(true);
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
window.HomePage = HomePage;
HomePage.init();

// css样式
require('../styles/reset.css');
require('../styles/header.less');
require('../styles/index.less');
require('../styles/iconfont.css');
