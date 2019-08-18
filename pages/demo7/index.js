//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {},
  search() {
    wx.navigateTo({
      url: '/pages/demo/demo1'
    });
  },
  handlerGobackClick() {
    wx.showModal({
      title: '你点击了返回',
      content: '是否确认放回',
      success: e => {
        if (e.confirm) {
          const pages = getCurrentPages();
          if (pages.length >= 2) {
            wx.navigateBack({
              delta: 1
            });
          } else {
            wx.navigateTo({
              url: '/pages/index/index'
            });
          }
        }
      }
    });
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
});
