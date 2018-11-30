# reactjs-dialog

reactjs-dialog是基于react开发的弹窗(dialog)插件、目前支持:    

-   Message(自定义)  
-   Alert(警告)
-   Confirm(确认)  
    _注意：Alert、Confirm 都是通过Message自定义而来_  
    兼容：IE9+、Chrome、Firefox
## 安装

    npm i reactjs-dialog  
    yarn add reactjs-dialog (推荐)

## 使用

        import Dialog , { Message, Alert, Confirm } from "reactjs-dialog"
        Message(msg, title, option) 或者 Dialog.Message(msg, title, option)
        Alert(msg, title) 或者 Dialog.Alert(msg, title)
        Confirm(msg, title) 或者 Dialog.Confirm(msg, title)


_注意：Message、Alert、Confirm 都会返回一个Promise()对象所以你可以用.then(()=>{})去监听操作_

## 参数

-   msg [String] : 展示的内容
-   title [String] : 展示的标题
-   option [Object] 可选:  扩展配置
    -   mask [Boolean] : 显示是否渲染mask,默认true
    -   vHtml [Boolean] : 渲染方式以html渲染,默认false
    -   button [Array<String, Object>] : 按钮数量,可以是 String 或者 { "按钮名称" : {/\* 按钮样式 \*/} }
    - titlEffect [String] : 标题展示位置,有left、center、right可选,默认left
    - btnReverse [Boolean] : 按钮反序排列即从右往左排列,默认false
    - btnEffect [String] : 按钮展示位置,有left、center、right可选,默认center
    - isClose [Boolean] : 是否渲染右上角关闭按钮, 默认true
    - lineClamp [Number] : 内容最多显示几行,溢出省略 ≤ 10, 默认6
    - dialogStyle [Object] : 弹窗容器自定义(react)样式
    - bgStyle [Object] : 弹窗背景自定义(react)样式
    - titleStyle [Object] : 弹窗标题自定义(react)样式
    - messageStyle [Object] : 弹窗内容自定义(react)样式
    - footerStyle [Object] : 弹窗按钮容器自定义(react)样式
    - callback [Function] : 事件回调[注意：回调和then只会触发一个 优先级别：callback>Promise 如果回调return false;(仅限返回false触发)则Dialog将不会关闭]
    - classNames [String] : 动画类型内置[fade、move、zoom],默认fade;当然也可以自定义动画(只要符合[react-transition-group](https://www.npmjs.com/package/react-transition-group)动画css命名规则,都是有效的)。

## 事件
由于采用了Promise链式写法(去掉了讨厌的回调)所以可以直接.then((results)=>{})来监听所有操作事件。results 会返回一个对象包含_id的对象_id是包含触发事件的id,id顺序依次是0(关闭)、按钮索引+1

## 示例
```
    import { Message, Alert, Confirm } from "reactjs-dialog"

    Alert("你没有操作权限！请联系管理员。").then((results)=>{
        //处理关闭操作
        if(results._id === 1){
            window.close();
        }
    })

    Message("你没有操作权限！请联系管理员。","警告",{
        callback : (results)=>{
            button : ["返回","立即退出"],
            //处理关闭操作
            if(results._id === 1){
                // consoe.log("你没有操作权限！");
                return false;
            }
        }
    })
    /* callback() 和 (Promise).then() 请勿同时使用,注意:[如果同时存在]callback() 优先级别高于 then()*/

```

## 展示效果

![Message()默认效果](./resources/Message.jpg 'Message默认效果')

![Message()自定义效果](./resources/custom_message.jpg 'Message自定义效果')

![Alert()效果](./resources/Alert.jpg 'Alert效果')

![Confirm()效果](./resources/confirm.jpg 'Alert效果')
