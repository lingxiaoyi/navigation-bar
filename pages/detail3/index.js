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
    if(pages.length ===1){
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  home: function(e) {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  search: function(e) {
    console.log(e.detail);
  }
});
