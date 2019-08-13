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
    console.log(e.detail);
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
