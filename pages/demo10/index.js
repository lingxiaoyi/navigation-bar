//index.js
//获取应用实例
//const app = getApp();

Page({
  data: { background: 'rgba(255,255,255,1)' },
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
  onPageScroll(e) {
    let opciaty = e.scrollTop / 130;
    if (opciaty >= 1) {
      opciaty = 1;
    } else if (opciaty <= 0) {
      opciaty = 0;
    }
    console.log('opciaty', opciaty);
    this.setData({ background: `rgba(255,0,0,${opciaty})` });
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
});
