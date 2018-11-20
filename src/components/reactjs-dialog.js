import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// style
require("./reactjs-dialog.scss");

class DialogCompoent extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <React.Fragment>
                {/* mask */}
                <div className="d-dialog-mask" ></div>

            </React.Fragment>
        )
    }
}

class Dialog{
    constructor(){
        const div = document.createDocumentFragment();
        const dialogInstall = ReactDOM.render(<DialogCompoent />, div);
        document.body.appendChild(div);
        this.state = { dialogInstall };
        this.Message = this.Message.bind(this);
        this.Alert = this.Alert.bind(this);
        this.Confirm = this.Confirm.bind(this);
        this.Prompt = this.Prompt.bind(this);
    }
    // 消息
    Message(msg, title, option){
        const { dialogInstall } = this.state;
        console.log(msg);
    }
    // 警告
    Alert(msg, title){
        const { dialogInstall } = this.state;
        return new Promise((resolve, reject)=>{

        })
    }
    // 确认提示
    Confirm(title, val){
        const { dialogInstall } = this.state;
        return new Promise((resolve, reject)=>{

        })
    }
    // 录入信息
    Prompt(title, val, placeholder){
        const { dialogInstall } = this.state;
        return new Promise((resolve, reject)=>{

        })
    }
}

const install = new Dialog();
export const Message = install.Message;
export const Alert = install.Alert;
export const Confirm = install.Confirm;
export const Prompt = install.Prompt;
export default Dialog;
