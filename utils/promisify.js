/**
 * author: xiaohui
 * desc: wx异步API Promise化
 */
// wx异步方法Promise化
const promisify = name => options =>
    new Promise((resolve, reject) => {
        wx[name]({
            ...options,
            success: resolve,
            fail: reject
        })
    });
// wx同步方法不改变
const syncFun = name => (...args) => wx[name](...args);
/**
 * 代理WX对象，将所有的WX.API Promise化;
**/
const proxy = new Proxy(wx, {
    get(target, k, v) {
        if (typeof k === 'string' && k.indexOf('Sync') > -1) {
            return syncFun(k);
        } else {
            return promisify(k);
        }

    },
    set(target, k, v) {
        return v;
    }
})
export default proxy;