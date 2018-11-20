import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Dialog, {Message,Alert,Confirm,Prompt} from "../src/components/reactjs-dialog"

class App extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <h1>reactjs-Dialog v1.0.0</h1>
                <button onClick={ ()=>{ Message("百度（纳斯达克：BIDU）") } }>Message</button>
                <button>Alert</button>
                <button>Confirm</button>
                <button>Prompt</button>
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
