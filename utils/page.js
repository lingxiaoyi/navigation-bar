/**
 * 使用方法：
 * 1、app.js 引入此文件：const page = require('xx/xx/page);
 * 2、app.js onLaunch 的时候 Page = page
 */

const originalPage = Page;
import proxy from './promisify';

function page(conf) {
    let hooks = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'];
    conf.wx = proxy;
    Object.keys(conf).map(v => {
        if (typeof conf[v] === 'function' && hooks.indexOf(v) === -1) {
            let cusFunc = conf[v]
            conf[v] = function(e) {
                // 交互事件
                if (e && e.type) {
                    let dataset = e.currentTarget.dataset, //组件data-xx参数集合
                        pages = getCurrentPages(),
                        currPage = pages[pages.length - 1],
                        prevPage = pages[pages.length - 2];
                    switch (e.type) {
                        case 'tap':
                            // tap事件, 可提交点击事件日志,
                            console.log('tap事件');
                            break;
                        case 'touchstart' || "touchmove" || "touchend":
                            // touch事件, 可提交触摸事件日志
                            console.log('touch事件');
                            break;
                    }
                    console.log(dataset, currPage.route);
                    // 可以通过currentPages给跟不同页面通信
                    currPage.setData({
                        abc: 'bcd'
                    })
                }
                cusFunc.call(this, e);
            }
        }
        // 钩子事件, 可提交pv,uv日志
        else if (hooks.indexOf(v) > -1) {
            let cusHook = conf[v];
            conf[v] = function(e) {
                const pages = getCurrentPages(),
                    currPage = pages[pages.length - 1],
                    prevPage = pages[pages.length - 2];
                
                console.log('page：' + currPage.route + ' ' + v + ' at ' + Date.now());
                cusHook.call(this, e);
            }
        }
    })
    return originalPage(conf)
}
module.exports = page;