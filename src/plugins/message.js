/**
 * @description 全局消息提示框
 * @author 狗尾草
 * @since 20200512
 */
// eslint-disable-next-line vars-on-top
window.globalMessage = {
  success(text) {
    return new Promise(function(resolve) {
      var oMsgDom = document.querySelector('.message-success');
      oMsgDom.style = 'opacity: 1';
      oMsgDom.children[1].innerHTML = text;
      setTimeout(() => {
        oMsgDom.style = 'opacity: 0';
        resolve(200);
      }, 1500);
    });
  },
  error(text) {
    return new Promise(function(resolve) {
      var oMsgDom = document.querySelector('.message-fail');
      oMsgDom.style = 'opacity: 1';
      oMsgDom.children[1].innerHTML = text;
      setTimeout(() => {
        oMsgDom.style = 'opacity: 0';
        resolve(200);
      }, 1500);
    });
  },
  warning(text) {
    return new Promise(function(resolve) {
      var oMsgDom = document.querySelector('.message-warning');
      oMsgDom.style = 'opacity: 1';
      oMsgDom.children[1].innerHTML = text;
      setTimeout(() => {
        oMsgDom.style = 'opacity: 0';
        resolve(200);
      }, 1500);
    });
  }
};
(function() {
  var oBody = document.querySelector('body');
  var oHead = document.querySelector('head');
  var oMsgStyle = document.createElement('style');
  var oMsg = document.createElement('div');
  oMsg.id = 'msg-box';
  oMsg.innerHTML = "<div class='message-global message-success'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div><div class='message-global message-warning'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div><div class='message-global message-fail'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div>";
  oBody.appendChild(oMsg);
  oMsgStyle.type = 'text/css';
  const msgStyle = `
    .message-success,.message-warning,.message-fail {
      opacity: 0;
    }
    /* 提示框 */
    .message-success span,.message-success .iconfont {
      color: green;
    }
    .message-fail span,.message-fail .iconfont{
      color: red;
    }
    .message-warning span,.message-warning .iconfont {
      color: orange;
    }
    .message-global {
      background-color: rgba(255,255,255,.4);
      height: 30px;
      padding: 0px 20px;
      font-size: 12px;
      position: fixed;
      left: 50%;
      top: 100px;
      transform: translate(-50%,-50%);
      display: flex;
      align-items: center;
    }`;
  try {
    oMsgStyle.appendChild(document.createTextNode(msgStyle));
  } catch (ex) {
    oMsgStyle.styleSheet.cssText = msgStyle;// 针对IE
  }
  oHead.appendChild(oMsgStyle);
})();
