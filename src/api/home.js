/**
 * @description 首页接口
 * @since 2020-05-15
 * @author 狗尾草
 */
const domain = process.env.API_ROOT;

window.API = {
  // 获取文章列表
  getArticleList(params = {}) {
    return getRequest(`${domain}/article/api/v1/article_list`, params);
  },
  // // 获取文章详情
  // getArticleDetail(params = {}) {
  //   return getRequest(`${domain}/article/api/v1/article_detail`, params);
  // },
  // // 文章阅读量新增
  // setArticleReaderNum(params = {}) {
  //   return postRequest(`${domain}/article/api/v1/article_reader_number`, params);
  // },
  // // 文章点赞
  // setArticleGoodNum(params = {}) {
  //   return postRequest(`${domain}/article/api/v1/article_likes`, params);
  // },
  // 获取推荐好文
  getArticleGood(params = {}) {
    return getRequest(`${domain}/article/api/v1/article_good`, params);
  },
  // 查询文章标签列表
  getArticleTagList(params = {}) {
    return getRequest(`${domain}/tag/api/v1/tag_list`, params);
  }
};
