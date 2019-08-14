//index.js
//获取应用实例
//const app = getApp();

Page({
  data: {
    loading: false,
    color: '#000',
    background: '#fff',
    show: true,
    animated: false
  },

  onLoad: function() {},
  back: function(e) {
    let pages = getCurrentPages();
    this.setData({
      show: false
    });
    if (pages.length === 1) {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  }
});
