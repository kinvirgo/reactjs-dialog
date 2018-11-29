import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class DialogCompoent extends Component {
    constructor(props) {
        super(props);
        this.config = {
            msg: "",
            title: "",
            display: false,
            mask: true,
            vHtml: false, //是否html渲染 一般不建议使用
            button: [
                "确认", "取消"
            ], //按钮模块,从做只有对应顺序,id是对应的索引
            btnEffect: "center",
            btnReverse : false, //按钮反序排列即做有往右排列
            titlEffect: "left",
            isClose: true, //是否关闭按钮
            lineClamp: 6, //内容最多显示几行,溢出省略 ≤ 10
            onTitle: false, //用于鼠标显示内容（主要是在内容溢出[信息多]时候使用）
            dialogStyle: {}, //弹窗容器样式定义
            bgStyle: {}, //弹窗背景样式 主要用于替换背景
            titleStyle: {}, //标题样式
            messageStyle: {}, //消息、内容模块样式
            footerStyle: {}, //消息、内容模块样式
            callback : undefined, //事件回调
        }
        // 默认配置
        this.state = {
            ...this.config
        }
        this.mask = this.mask.bind(this);
        this.hide = this.hide.bind(this);
        this.dialog = this.dialog.bind(this);
        this.footer = this.footer.bind(this);
    }
    // 消息
    Message(msg = "", title = "", option = {}) {
        const {config} = this;
        this.setState({
            ...config,
            ...option,
            display: true,
            msg,
            title
        })
    }
    Alert(msg = "", title = "警告！", option = {}) {
        const {config} = this;
        this.setState({
            ...config,
            ...option,
            display: true,
            msg,
            title
        })
    }
    Confirm(msg = "", title = "确认？", option = {}) {
        const {config} = this;
        this.setState({
            ...config,
            ...option,
            display: true,
            msg,
            title
        })
    }
    mask() {
        return <div className="d-dialog-mask"></div>
    }
    hide(resolve, data){
        const {callback} = this.state;
        const {state} = this;
        let r = true; //r为false就不会关闭会话
        if( Object.prototype.toString.call(callback) === "[object Function]" ){
            r = callback(data);
        }
        if(Object.prototype.toString.call(r) != "[object Boolean]" || (Object.prototype.toString.call(r) === "[object Boolean]" && !!r) ){
            // 布尔型、并且true
            this.setState({
                ...state,
                display: false
            }, () => {
                resolve(data);
            });
        }
    }
    footer() {
        const {btnEffect, button, footerStyle, btnReverse} = this.state;
        const btnFloat = !!btnReverse ? 'right' : 'left' ;
        return (<ul className={`d-dialog-footer sn-f-cb btn-effect-${btnEffect} btn-group-${button.length} btn-item-${btnFloat}`} style={footerStyle}>
            {
                button.map((item, index) => {
                    return (<li className="btn-item" key={index}>
                        <button className={`btn-item-${index + 1}`} style={this.getBtnStyle(item)} onClick={() => {
                                this.resolve(index + 1)
                            }}>{this.getBtnVal(item)}</button>
                    </li>)
                })
            }
        </ul>);
    }
    getBtnStyle(item) {
        if (Object.prototype.toString.call(item) === "[object Object]") {
            const key = Object.keys(item)[0];
            return item[key];
        } else {
            return {};
        }
    }
    getBtnVal(item) {
        if (Object.prototype.toString.call(item) === "[object String]") {
            return item;
        } else if (Object.prototype.toString.call(item) === "[object Object]") {
            const itemArr = Object.keys(item);
            return itemArr[0];
        } else {
            return '-'
        }
    }
    dialog() {
        const {
            dialogStyle,
            bgStyle,
            titleStyle,
            messageStyle,
            footerStyle,
            isClose,
            title,
            msg,
            vHtml,
            titlEffect,
            lineClamp
        } = this.state;
        return (<div className="d-dialog-section" style={dialogStyle}>
            <div className="d-dialog-section-bg" style={bgStyle}></div>
            {
                isClose && <button className="d-dialog-btnClose" type="button" onClick={() => {
                            this.resolve(0)
                        }}>×</button>
            }
            <div className={`d-dialog-head title-effect-${titlEffect}`}>
                {
                    vHtml
                        ? <h4 style={titleStyle} dangerouslySetInnerHTML={{
                                    __html: title
                                }}></h4>
                        : <h4 style={titleStyle}>{title}</h4>
                }
            </div>
            <div className="d-dialog-body">
                {
                    vHtml
                        ? <div className={`d-dialog-message line-clamp-${lineClamp}`} style={messageStyle} dangerouslySetInnerHTML={{
                                    __html: msg
                                }}></div>
                        : <div className={`d-dialog-message line-clamp-${lineClamp}`} style={messageStyle}>{msg}</div>
                }
            </div>
            {this.footer()}
        </div>);
    }
    render() {
        const {mask: isMask, display} = this.state;
        return (<div data-dialog-root="" >
            {isMask && display && this.mask()}
            {display && this.dialog()}
        </div>)
    }
}

class Dialog {
    constructor() {
        const div = document.createDocumentFragment();
        const dialogInstall = ReactDOM.render(<DialogCompoent/>, div);
        document.body.appendChild(div);
        this.state = {
            dialogInstall
        };
        this.Message = this.Message.bind(this);
        this.Alert = this.Alert.bind(this);
        this.Confirm = this.Confirm.bind(this);
    }
    // 消息
    Message(msg, title, option) {
        return new Promise((resolve, reject) => {
            const {dialogInstall} = this.state;
            dialogInstall.Message(msg, title, option);
            dialogInstall.resolve = (_id) => {
                dialogInstall.hide(resolve, {_id});
                /*const {state} = dialogInstall;
                dialogInstall.setState({
                    ...state,
                    display: false
                }, () => {
                    resolve({_id});
                })*/
            }
        })
    }
    // 警告
    Alert(msg, title) {
        return new Promise((resolve, reject) => {
            const {dialogInstall} = this.state;
            dialogInstall.Alert(msg, title, {
                isClose: false,
                lineClamp: 3,
                button: ["确定"],
                btnEffect: 'right',
                titleStyle: {
                    color: '#d0a41e'
                }
            });
            dialogInstall.resolve = (_id) => {
                dialogInstall.hide(resolve, {_id});
                /*const {state} = dialogInstall;
                dialogInstall.setState({
                    ...state,
                    display: false
                }, () => {
                    resolve({_id});
                })*/
            }
        })
    }
    // 确认提示
    Confirm(msg, title) {
        return new Promise((resolve, reject) => {
            const {dialogInstall} = this.state;
            dialogInstall.Confirm(msg, title, {
                isClose: false,
                lineClamp: 3,
                button: ["我知道了"],
                titleStyle: {
                    color: '#0067ED'
                }
            });
            dialogInstall.resolve = (_id) => {
                dialogInstall.hide(resolve, {_id});
                /*const {state} = dialogInstall;
                dialogInstall.setState({
                    ...state,
                    display: false
                }, () => {
                    resolve({_id});
                })*/
            }
        })
    }
}

module.exports = new Dialog();
