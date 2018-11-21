'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Confirm = exports.Alert = exports.Message = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DialogCompoent = function (_Component) {
    _inherits(DialogCompoent, _Component);

    function DialogCompoent(props) {
        _classCallCheck(this, DialogCompoent);

        var _this = _possibleConstructorReturn(this, (DialogCompoent.__proto__ || Object.getPrototypeOf(DialogCompoent)).call(this, props));

        _this.config = {
            msg: "",
            title: "",
            display: false,
            mask: true,
            vHtml: false, //是否html渲染 一般不建议使用
            button: ["确认", "取消"], //按钮模块,从做只有对应顺序,id是对应的索引
            btnEffect: "center",
            titlEffect: "left",
            isClose: true, //是否关闭按钮
            lineClamp: 6, //内容最多显示几行,溢出省略 ≤ 10
            onTitle: false, //用于鼠标显示内容（主要是在内容溢出[信息多]时候使用）
            dialogStyle: {}, //弹窗容器样式定义
            bgStyle: {}, //弹窗背景样式 主要用于替换背景
            titleStyle: {}, //标题样式
            messageStyle: {}, //消息、内容模块样式
            footerStyle: {} //消息、内容模块样式

            // 默认配置
        };_this.state = _extends({}, _this.config);
        _this.mask = _this.mask.bind(_this);
        _this.dialog = _this.dialog.bind(_this);
        _this.footer = _this.footer.bind(_this);
        return _this;
    }
    // 消息


    _createClass(DialogCompoent, [{
        key: 'Message',
        value: function Message() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var config = this.config;

            this.setState(_extends({}, config, option, {
                display: true,
                msg: msg,
                title: title
            }));
        }
    }, {
        key: 'Alert',
        value: function Alert() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "警告！";
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var config = this.config;

            this.setState(_extends({}, config, option, {
                display: true,
                msg: msg,
                title: title
            }));
        }
    }, {
        key: 'Confirm',
        value: function Confirm() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "确认？";
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var config = this.config;

            this.setState(_extends({}, config, option, {
                display: true,
                msg: msg,
                title: title
            }));
        }
    }, {
        key: 'mask',
        value: function mask() {
            return _react2.default.createElement('div', { className: 'd-dialog-mask' });
        }
    }, {
        key: 'footer',
        value: function footer() {
            var _this2 = this;

            var _state = this.state,
                btnEffect = _state.btnEffect,
                button = _state.button,
                footerStyle = _state.footerStyle;

            return _react2.default.createElement(
                'ul',
                { className: 'd-dialog-footer sn-f-cb btn-effect-' + btnEffect + ' btn-group-' + button.length, style: footerStyle },
                button.map(function (item, index) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'btn-item', key: index },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn-item-' + (index + 1), style: _this2.getBtnStyle(item), onClick: function onClick() {
                                    _this2.resolve(index + 1);
                                } },
                            _this2.getBtnVal(item)
                        )
                    );
                })
            );
        }
    }, {
        key: 'getBtnStyle',
        value: function getBtnStyle(item) {
            if (Object.prototype.toString.call(item) === "[object Object]") {
                var key = Object.keys(item)[0];
                return item[key];
            } else {
                return {};
            }
        }
    }, {
        key: 'getBtnVal',
        value: function getBtnVal(item) {
            if (Object.prototype.toString.call(item) === "[object String]") {
                return item;
            } else if (Object.prototype.toString.call(item) === "[object Object]") {
                var itemArr = Object.keys(item);
                return itemArr[0];
            } else {
                return '-';
            }
        }
    }, {
        key: 'dialog',
        value: function dialog() {
            var _this3 = this;

            var _state2 = this.state,
                dialogStyle = _state2.dialogStyle,
                bgStyle = _state2.bgStyle,
                titleStyle = _state2.titleStyle,
                messageStyle = _state2.messageStyle,
                footerStyle = _state2.footerStyle,
                isClose = _state2.isClose,
                title = _state2.title,
                msg = _state2.msg,
                vHtml = _state2.vHtml,
                titlEffect = _state2.titlEffect,
                lineClamp = _state2.lineClamp;

            return _react2.default.createElement(
                'div',
                { className: 'd-dialog-section', style: dialogStyle },
                _react2.default.createElement('div', { className: 'd-dialog-section-bg', style: bgStyle }),
                isClose && _react2.default.createElement(
                    'button',
                    { className: 'd-dialog-btnClose', type: 'button', onClick: function onClick() {
                            _this3.resolve(0);
                        } },
                    '\xD7'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'd-dialog-head title-effect-' + titlEffect },
                    vHtml ? _react2.default.createElement('h4', { style: titleStyle, dangerouslySetInnerHTML: {
                            __html: title
                        } }) : _react2.default.createElement(
                        'h4',
                        { style: titleStyle },
                        title
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'd-dialog-body' },
                    vHtml ? _react2.default.createElement('div', { className: 'd-dialog-message line-clamp-' + lineClamp, style: messageStyle, dangerouslySetInnerHTML: {
                            __html: msg
                        } }) : _react2.default.createElement(
                        'div',
                        { className: 'd-dialog-message line-clamp-' + lineClamp, style: messageStyle },
                        msg
                    )
                ),
                this.footer()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _state3 = this.state,
                isMask = _state3.mask,
                display = _state3.display;

            return _react2.default.createElement(
                'div',
                { 'd-dialog-root': '' },
                isMask && display && this.mask(),
                display && this.dialog()
            );
        }
    }]);

    return DialogCompoent;
}(_react.Component);

var Dialog = function () {
    function Dialog() {
        _classCallCheck(this, Dialog);

        var div = document.createDocumentFragment();
        var dialogInstall = _reactDom2.default.render(_react2.default.createElement(DialogCompoent, null), div);
        document.body.appendChild(div);
        this.state = {
            dialogInstall: dialogInstall
        };
        this.Message = this.Message.bind(this);
        this.Alert = this.Alert.bind(this);
        this.Confirm = this.Confirm.bind(this);
    }
    // 消息


    _createClass(Dialog, [{
        key: 'Message',
        value: function Message(msg, title, option) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var dialogInstall = _this4.state.dialogInstall;

                dialogInstall.Message(msg, title, option);
                dialogInstall.resolve = function (id) {
                    var state = dialogInstall.state;

                    dialogInstall.setState(_extends({}, state, {
                        display: false
                    }), function () {
                        resolve({ id: id });
                    });
                };
            });
        }
        // 警告

    }, {
        key: 'Alert',
        value: function Alert(msg, title) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var dialogInstall = _this5.state.dialogInstall;

                dialogInstall.Alert(msg, title, {
                    isClose: false,
                    lineClamp: 3,
                    button: ["确定"],
                    btnEffect: 'right',
                    titleStyle: {
                        color: '#d0a41e'
                    }
                });
                dialogInstall.resolve = function (id) {
                    var state = dialogInstall.state;

                    dialogInstall.setState(_extends({}, state, {
                        display: false
                    }), function () {
                        resolve({ id: id });
                    });
                };
            });
        }
        // 确认提示

    }, {
        key: 'Confirm',
        value: function Confirm(msg, title) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var dialogInstall = _this6.state.dialogInstall;

                dialogInstall.Confirm(msg, title, {
                    isClose: false,
                    lineClamp: 3,
                    button: ["我知道了"],
                    titleStyle: {
                        color: '#0067ED'
                    }
                });
                dialogInstall.resolve = function (id) {
                    var state = dialogInstall.state;

                    dialogInstall.setState(_extends({}, state, {
                        display: false
                    }), function () {
                        resolve({ id: id });
                    });
                };
            });
        }
    }]);

    return Dialog;
}();

var install = new Dialog();
var Message = exports.Message = install.Message;
var Alert = exports.Alert = install.Alert;
var Confirm = exports.Confirm = install.Confirm;
exports.default = Dialog;