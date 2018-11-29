import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// es6
import _Dialog, { Message, Alert, Confirm } from "./components/reactjs-dialog.js"
require('./components/reactjs-dialog.scss')
// console.log(Message, Alert, Confirm);

// es5
const Dialog = require("./components/reactjs-dialog.js");
console.log(Dialog, _Dialog);

class App extends Component{
    constructor(){
        super();
    }
    render(){
        var title = "简介:React";
        var msg = "React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。";
        return(
            <div>
                <h1>reactjs-Dialog v1.0.0</h1>
                <button onClick={ ()=>{ Dialog.Message("用户协议！","是否同意使用协议。",{
                    button : ["同意","不同意"],
                    mask : true,
                    callback : (data)=>{
                        if(data._id == 2){
                            alert("不同意无法使用。感谢你的支持！");
                            return false;
                        }
                    }
                }) } }>callback测试</button>
                <button onClick={ ()=>{ Dialog.Message(msg,title,{
                    mask : true
                }) } }>Message1</button>
            <button onClick={ ()=>{ _Dialog.Message(msg,title,{
                    vHtml : true,
                    mask : true,
                    button : ['确认','退出'],
                    btnEffect: "center",
                    titlEffect : 'center',
                    isClose : true,
                    lineClamp : 6,
                    dialogStyle : {
                        // width : '500px',
                        // marginLeft : "-250px"
                    },
                    bgStyle : {
                        background : `url(${require('./image/bg-1.jpg')})`,
                        backgroundSize: 'cover'
                    },
                    titleStyle : {
                        'color' : "#D91C52"
                    },
                    messageStyle : {
                        fontSize : "14px",
                        textIndent : "30px",
                        color : "#f1f1f1"
                    },
                    footerStyle : {
                        // background : '#CEFFE0'
                    }
                }).then((data)=>{
                    console.log( data );
                }) } }>Message2</button>
            <button onClick={()=>{
                    Alert("请求超时,请稍后重试。").then((data)=>{
                        console.log( data );
                    });
                }}>Alert</button>
            <button onClick={()=>{
                    Confirm("你已经提交过申请,请勿重复提交。");
                }}>Confirm</button>
            </div>
        )
    }
}

// use
ReactDOM.render(
    <App />
    ,
    document.getElementById('app')
)
