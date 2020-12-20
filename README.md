# 小程序组件 navigation-bar

小程序自定义导航栏适配 完美解决内容上下不居中问题

## Navigation

Navigation 是小程序的顶部导航组件，当页面配置 navigationStyle 设置为 custom 的时候可以使用此组件替代原生导航栏

## 使用教程
> 代码细节可以参考各个 Demo
1. 在页面 json 或 app.json（在 app.json 添加则适用所有页面），添加代码："navigationStyle": "custom"，这样顶部原来的导航就消失了，就可以自己创建导航，示例代码：
```bash
{
  "navigationStyle": "custom"
}
```

2. 创建自定义导航组件，参考网址：https://github.com/lingxiaoyi/navigation-bar，克隆或下载下来
，将 components 文件夹下 navBar 复制到自己小程序里的 components 文件夹下，如果导航上的返回和主页图片也想用本教程的，也请注意复制过去，您可能需要参考的目录结构：
```
  -- miniprogram
     -- components
        -- navBar
     -- images
     -- pages
```

3. 页面 json 或 app.json（在 app.json 添加则适用所有页面） 引入组件代码，"usingComponents": {"navBar": "/components/navBar/navBar"}，引入后在 wxml 页面即可使用 nvaBar 组件，就类似使用官方的 button 组件一样。
```bash
{
  "navigationStyle": "custom",
  "usingComponents": {
    "navBar": "/components/navBar/navBar"
  }
}
```

4. wxml 页面使用 navBar，示例代码：
```bash
<!--WXML示例代码-->
 <navBar title='有返回和home' background='#fff' back="{{true}}" home="{{true}}" bindback="handlerGobackClick" bindhome="handlerGohomeClick"></navBar>
```

> title 是导航中间的文字，background 是导航的背景，back是是否显示返回图标，home是是否显示主页图标，bindback是点击返回时执行的函数，bindhome 是点击返回主页的函数，函数在页面 js 文件下写，可以参考 Demo，还可以再加组件属性：iconTheme='white'，但是注意响应的页面 json 也要同时添加代码："navigationBarTextStyle": "white"，实现自定义组件图标颜色为白色，如果改为black就为黑色

### Demo9 透明示例
1. 透明：wxml 页面将 navBar 这个自定义组件放在一个 view 里:<view class="nav"><navBar></navBar></view>，记得在样式文件 wxss 里将 nav 高要设置为 0，代码：.nav{height:0;}

2. 示例 wxml 代码 
  ```
  <!--WXML示例代码-->
  <view class='nav'>
    <navBar title='标题' background='rgba(0,0,0,0)' color='#fff' back="{{true}}" home="{{true}}" iconTheme='white'
      bindback="handlerGobackClick"></navBar>
  </view>
  ```
3. 示例 wxss 代码
```
/* wxss 示例代码 */
/* 实现导航透明 */
 .nav{
   height:0;
 }
```

## 属性列表

| 属性               | 类型         | 默认值     | 必填 | 说明                                                                                      |
| ------------------ | ------------ | ---------- | ---- | ----------------------------------------------------------------------------------------- |
| ext-class          | string       |            | 否   | 添加在组件内部结构的 class，可用于修改组件内部的样式                                      |
| title              | string       |            | 否   | 导航标题，如果不提供，则名为 center 的 slot 有效                                          |
| background         | string       | #ffffff    | 否   | 导航背景色                                                                                |
| backgroundColorTop | string       | background | 否   | 导航下拉下方背景色,详细参考下方                                                           |
| color              | string       | #000000    | 否   | 导航字体颜色                                                                              |
| iconTheme          | string       | black      | 否   | 主题图标和字体颜色,当背景色为深色时,可以设置'white'                                       |
| back               | boolean      | false      | 否   | 是否显示返回按钮，默认点击按钮会执行 navigateBack，如果为 false，则名为 left 的 slot 有效 |
| home               | boolean      | false      | 否   | 是否显示 home 按钮，执行方法自定义,或者看例子                                             |
| searchBar          | boolean      | false      | 否   | 是否显示搜索框，默认点击按钮会执行 bindsearch，如果为 false，则名为 center 的 slot 有效   |
| searchText         | string       | 点我搜索   | 否   | 搜索框文字                                                                                |
| bindhome           | eventhandler |            | 否   | 在 home 为 true 时，点击 home 按钮触发此事件                                              |
| bindback           | venthandler  |            | 否   | 在 back 为 true 时，点击 back 按钮触发此事件，detail 包含 delta                           |
| bindsearch         | eventhandler |            | 否   | 在 searchBar 为 true 时，点击 search 按钮触发此事件                                       |

注:backgroundColorTop[见 issue 问题](https://github.com/lingxiaoyi/Taro-navigation-bar/issues/15)

## Slot

| 名称   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| left   | 左侧 slot，在 back 按钮位置显示，当 back 为 false 的时候有效 |
| center | 标题 slot，在标题位置显示，当 title 为空的时候有效           |
| right  | 在导航的右侧显示                                             |

## 注意

- iconTheme 设置为 white 的时候,一定要记得自己去 json 文件设置"navigationBarTextStyle": "white"
- 跳转搜索页面,在 Android 机子会出现文字被键盘弹起顶出 input 框,解决方案页面设置一个死的高度不要高于 windowHeight - navheight 例子中是设置 500px
- input 框文字抖动问题我是借鉴别人写的,可以最大限度减小文字抖动的大小,提升用户体验
- title searchBar slot="right" 如果全部有内容,是这样的先后显示顺序.
- 默认配置满足不了功能的,请使用 slot 功能,见例子 1 6 7
- 由于本人精力有限,只测试了常规的 20 多款手机.如有哪种机型出现问题,请备注机型和小程序版本库.本人会以最快方式解决问题.
- 有什么 bug 和建议,还有功能上的问题请提 pr

## 后续

- 其他功能,规划中,或者留言联系方式微信 zhijunxh
- 还需要其他样子的例子请留言,如果功能比较重要和主流的话,我会考虑第一时间添加

## 备注

- 渐变和动态修改背景色请参考例子 10,ios 机子会出现滚动渐变颜色加载出来不能消失的问题,暂时没想到解决办法,这是微信浏览器渲染的问题,社区里面相关问题[地址](https://developers.weixin.qq.com/community/develop/doc/0000acae7649d80541b896ca957000)
- getMenuButtonBoundingClientRect 胶囊按钮信息获取不到或者此方法报错问题已修复 [获取菜单报错，需要捕捉异常和兼容版本](https://github.com/lingxiaoyi/navigation-bar/issues/14)[导航栏渲染不出来](https://github.com/lingxiaoyi/navigation-bar/issues/13)

## 测试信息

| 手机型号               | 胶囊位置信息        | statusBarHeight | 测试情况 |
| ---------------------- | ------------------- | :-------------: | -------- |
| iPhoneX                | 80 32 281 369 48 88 |       44        | 通过     |
| iPhone8 plus           | 56 32 320 408 24 88 |       20        | 通过     |
| iphone7                | 56 32 281 368 24 87 |       20        | 通过     |
| iPhone6 plus           | 56 32 320 408 24 88 |       20        | 通过     |
| iPhone6                | 56 32 281 368 24 87 |       20        | 通过     |
| HUAWEI SLA-AL00        | 64 32 254 350 32 96 |       24        | 通过     |
| HUAWEI VTR-AL00        | 64 32 254 350 32 96 |       24        | 通过     |
| HUAWEI EVA-AL00        | 64 32 254 350 32 96 |       24        | 通过     |
| HUAWEI EML-AL00        | 68 32 254 350 36 96 |       29        | 通过     |
| HUAWEI VOG-AL00        | 65 32 254 350 33 96 |       25        | 通过     |
| HUAWEI ATU-TL10        | 64 32 254 350 32 96 |       24        | 通过     |
| HUAWEI SMARTISAN OS105 | 64 32 326 422 32 96 |       24        | 通过     |
| XIAOMI MI6             | 59 28 265 352 31 87 |       23        | 通过     |
| XIAOMI MI4LTE          | 60 32 254 350 28 96 |       20        | 通过     |
| XIAOMI MIX3            | 74 32 287 383 42 96 |       35        | 通过     |
| REDMI NOTE3            | 64 32 254 350 32 96 |       24        | 通过     |
| REDMI NOTE4            | 64 32 254 350 32 96 |       24        | 通过     |
| REDMI NOTE3            | 55 28 255 351 27 96 |       20        | 通过     |
| REDMI 5plus            | 67 32 287 383 35 96 |       28        | 通过     |
| MEIZU M571C            | 65 32 254 350 33 96 |       25        | 通过     |
| MEIZU M6 NOTE          | 62 32 254 350 30 96 |       22        | 通过     |
| MEIZU MX4 PRO          | 62 32 278 374 30 96 |       22        | 通过     |
| OPPO A33               | 65 32 254 350 33 96 |       26        | 通过     |
| OPPO R11               | 58 32 254 350 26 96 |       18        | 通过     |
| VIVO Y55               | 64 32 254 350 32 96 |       24        | 通过     |
| HONOR BLN-AL20         | 64 32 254 350 32 96 |       24        | 通过     |
| HONOR NEM-AL10         | 59 28 265 352 31 87 |       24        | 通过     |
| HONOR BND-AL10         | 64 32 254 350 32 96 |       24        | 通过     |
| HONOR duk-al20         | 64 32 254 350 32 96 |       24        | 通过     |
| SAMSUNG SM-G9550       | 64 32 305 401 32 96 |       24        | 通过     |
| 360 1801-A01           | 64 32 254 350 32 96 |       24        | 通过     |

~
创作不易,如果对你有帮助，请给个星星 star✨✨ 谢谢
~
