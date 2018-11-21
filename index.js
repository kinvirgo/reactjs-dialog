require("./dist/reactjs-dialog.css")
var Dialog = require("./dist/reactjs-dialog").default;
var install = new Dialog();
exports.Message = install.Message;
exports.Alert = install.Alert;
exports.Confirm = install.Confirm;
