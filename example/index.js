import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Dialog, {Message,Alert,Confirm,Prompt} from "../src/components/reactjs-dialog"
require('../src/components/reactjs-dialog.scss')

class App extends Component{
    constructor(){
        super();
    }
    render(){
        var title = "简介:百度";
        var msg = "百度（<b>纳斯达克：BIDU</b>），全球最大的中文搜索引擎、最大的中文网站。1999年底,身在美国硅谷的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于 2000年1月1日在中关村创建了百度公司。";
        return(
            <div>
                <h1>reactjs-Dialog v1.0.0</h1>
                <button onClick={ ()=>{ Message("百度（纳斯达克：BIDU）","百度",{
                    mask : true
                }) } }>Message1</button>
                <button onClick={ ()=>{ Message(msg,title,{
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
                        background : `url(${require('../src/image/bg-1.jpg')})`,
                        backgroundSize: 'cover'
                    },
                    titleStyle : {
                        'color' : "#2985EA"
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
