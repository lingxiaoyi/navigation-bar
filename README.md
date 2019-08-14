# mini-components

小程序组件navigation-bar

## Navigation

Navigation是小程序的顶部导航组件，当页面配置navigationStyle设置为custom的时候可以使用此组件替代原生导航栏

## 引入组件

在 page.json 中引入组件

```bash
{
  "usingComponents": {
    "mp-navigation-bar": "../../components/navBar/navBar"
  }
}
```

## 示例代码

```bash
<!--WXML示例代码-->
<navBar title="有返回和home" background="#fff" back="{{true}}" home="{{true}}" searchBar="{{false}}" iconTheme="" bindback="back" bindhome="home"></navBar>
```

## 属性列表

| 属性       | 类型         | 默认值   | 必填 | 说明                                                                                |
| ---------- | ------------ | -------- | ---- | ----------------------------------------------------------------------------------- |
| ext-class  | string       |          | 否   | 添加在组件内部结构的class，可用于修改组件内部的样式                                 |
| title      | string       |          | 否   | 导航标题，如果不提供，则名为center的slot有效                                        |
| background | string       | #ffffff  | 否   | 导航背景色                                                                          |
| color      | string       | #000000  | 否   | 导航字体颜色                                                                        |
| iconTheme  | string       | black    | 否   | 主题图标和字体颜色,当背景色为深色时,可以设置'white'                                 |
| back       | boolean      | true     | 否   | 是否显示返回按钮，默认点击按钮会执行navigateBack，如果为false，则名为left的slot有效 |
| home       | boolean      | false    | 否   | 是否显示home按钮，执行方法自定义,或者看例子                                         |
| searchBar  | boolean      | false    | 否   | 是否显示搜索框，默认点击按钮会执行bindsearch，如果为false，则名为center的slot有效   |
| searchText | string       | 点我搜索 | 否   | 搜索框文字                                                                          |
| bindhome   | eventhandler |          | 否   | 在home为true时，点击home按钮触发此事件                                              |
| bindback   | venthandler  |          | 否   | 在back为true时，点击back按钮触发此事件，detail包含delta                             |
| bindsearch | eventhandler |          | 否   | 在searchBar为true时，点击search按钮触发此事件                                       |

## Slot

| 名称   | 描述                                                  |
| ------ | ----------------------------------------------------- |
| left   | 左侧slot，在back按钮位置显示，当back为false的时候有效 |
| center | 标题slot，在标题位置显示，当title为空的时候有效       |
| right  | 在导航的右侧显示                                      |

## 注意

- iconTheme设置为white的时候,一定要记得自己去json文件设置"navigationBarTextStyle": "white"
- title searchBar slot="right" 如果全部有内容,是这样的先后显示顺序.
- 默认配置满足不了功能的,请使用slot功能,见例子6
- 有什么bug和建议,还有功能上的问题请提pr

## 后续
~
下版本开发Taro的
~

~
写作不易,如果对你有帮助，请给个星星star✨✨谢谢
~
