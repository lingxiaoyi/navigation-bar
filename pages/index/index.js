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
  search: function() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  jumpDetail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/index'
    })
  },
  jumpDetail2: function(e) {
    wx.navigateTo({
      url: '/pages/detail2/index'
    })
  }
});
