Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 1)'
    },
    color: {
      type: String,
      value: 'rgba(0, 0, 0, 1)'
    },
    title: {
      type: String,
      value: ''
    },
    searchText: {
      type: String,
      value: '点我搜索'
    },
    searchBar: {
      type: Boolean,
      value: false
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    },
    iconTheme: {
      type: String,
      value: 'black'
    },
    /* animated: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: true,
      observer: '_showChange'
    }, */
    delta: {
      type: Number,
      value: 1
    }
  },
  created: function() {
    this.getSystemInfo();
  },
  attached: function() {
    this.setStyle(); //设置样式
  },
  data: {},
  pageLifetimes: {
    show: function() {
      if (getApp().globalSystemInfo.ios) {
        this.getSystemInfo();
        this.setStyle(); //设置样式1
      }
    },
    hide: function() {}
  },
  methods: {
    setStyle: function(life) {
      const {
        statusBarHeight,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        ios,
        windowWidth
      } = getApp().globalSystemInfo;
      const { back, home, title } = this.data;
      let rightDistance = windowWidth - capsulePosition.right; //胶囊按钮右侧到屏幕右侧的边距
      let leftWidth = windowWidth - capsulePosition.left; //胶囊按钮左侧到屏幕右侧的边距

      let navigationbarinnerStyle = [
        `color: ${this.data.color}`,
        `background: ${this.data.background}`,
        `height:${navBarHeight + navBarExtendHeight}px`,
        `padding-top:${statusBarHeight}px`,
        `padding-right:${leftWidth}px`,
        `padding-bottom:${navBarExtendHeight}px`
      ].join(';');
      let navBarLeft = [];
      if ((back && !home) || (!back && home)) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`].join(';');
      } else if ((back && home) || title) {
        navBarLeft = [
          `width:${capsulePosition.width}px`,
          `height:${capsulePosition.height}px`,
          `margin-left:${rightDistance}px`
        ].join(';');
      } else {
        navBarLeft = [`width:auto`, `margin-left:0px`].join(';');
      }
      if (life === 'created') {
        this.data = {
          navigationbarinnerStyle,
          navBarLeft,
          navBarHeight,
          capsulePosition,
          navBarExtendHeight,
          ios
        };
      } else {
        this.setData({
          navigationbarinnerStyle,
          navBarLeft,
          navBarHeight,
          capsulePosition,
          navBarExtendHeight,
          ios
        });
      }
    },
    // 返回事件
    back: function() {
      this.triggerEvent('back', { delta: this.data.delta });
    },
    home: function() {
      this.triggerEvent('home', {});
    },
    search: function() {
      this.triggerEvent('search', {});
    },
    getSystemInfo() {
      var app = getApp();
      if (app.globalSystemInfo && !app.globalSystemInfo.ios) {
        return app.globalSystemInfo;
      } else {
        let systemInfo = wx.getSystemInfoSync();
        let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
        let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
        wx.getMenuButtonBoundingClientRect();

        let navBarHeight = '';
        if (!systemInfo.statusBarHeight) {
          systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
          navBarHeight = (function() {
            let gap = rect.top - systemInfo.statusBarHeight;
            return 2 * gap + rect.height;
          })();

          systemInfo.statusBarHeight = 0;
          systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小
        } else {
          navBarHeight = (function() {
            let gap = rect.top - systemInfo.statusBarHeight;
            return systemInfo.statusBarHeight + 2 * gap + rect.height;
          })();
          if (ios) {
            systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
          } else {
            systemInfo.navBarExtendHeight = 0;
          }
        }
        systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight
        systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
        systemInfo.ios = ios; //是否ios

        app.globalSystemInfo = systemInfo; //将信息保存到全局变量中,后边再用就不用重新异步获取了

        console.log('systemInfo', systemInfo);
        return systemInfo;
      }
    }
  }
});
