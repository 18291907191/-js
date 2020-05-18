/**
 * @description 首页接口
 * @since 2020-05-15
 * @author 狗尾草
 */
const domain = 'http://www.bgwhite.cn/api';
// const domain = 'http://127.0.0.1:3002';

window.API = {

  // 获取文章列表
  getArticleList(params = {}) {
    return getRequest(`${domain}/article/api/v1/article_list`, params);
  },

  // 获取文章详情
  getArticleDetail(params = {}) {
    return getRequest(`${domain}/article/api/v1/article_detail`, params);
  },

  // 文章阅读量新增
  setArticleReaderNum(params = {}) {
    return postRequest(`${domain}/article/api/v1/article_reader_number`, params);
  },

  // 文章点赞
  setArticleGoodNum(params = {}) {
    return postRequest(`${domain}/article/api/v1/article_likes`, params);
  }
};
