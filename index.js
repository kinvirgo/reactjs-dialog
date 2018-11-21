require("dist/reactjs-dialog.css")
var Dialog = require("dist/reactjs-dialog")
var install = new Dialog();
/* use */
// import Dialog, {Message,Alert,Confirm} from 'reactjs-dialog'
exports.Message = install.Message;
exports.Alert = install.Alert;
exports.Confirm = install.Confirm;
exports.default = Dialog;
