'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogCompoent = function (_Component) {
    (0, _inherits3.default)(DialogCompoent, _Component);

    function DialogCompoent(props) {
        (0, _classCallCheck3.default)(this, DialogCompoent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DialogCompoent.__proto__ || (0, _getPrototypeOf2.default)(DialogCompoent)).call(this, props));

        _this.config = {
            msg: "",
            title: "",
            display: false,
            mask: true,
            vHtml: false, //是否html渲染 一般不建议使用
            button: ["确认", "取消"], //按钮模块,从做只有对应顺序,id是对应的索引
            btnEffect: "center",
            btnReverse: false, //按钮反序排列即做有往右排列
            titlEffect: "left",
            isClose: true, //是否关闭按钮
            lineClamp: 6, //内容最多显示几行,溢出省略 ≤ 10
            onTitle: false, //用于鼠标显示内容（主要是在内容溢出[信息多]时候使用）
            dialogStyle: {}, //弹窗容器样式定义
            bgStyle: {}, //弹窗背景样式 主要用于替换背景
            titleStyle: {}, //标题样式
            messageStyle: {}, //消息、内容模块样式
            footerStyle: {}, //消息、内容模块样式
            callback: undefined //事件回调

            // 默认配置
        };_this.state = (0, _extends3.default)({}, _this.config);
        _this.mask = _this.mask.bind(_this);
        _this.hide = _this.hide.bind(_this);
        _this.dialog = _this.dialog.bind(_this);
        _this.footer = _this.footer.bind(_this);
        return _this;
    }
    // 消息


    (0, _createClass3.default)(DialogCompoent, [{
        key: 'Message',
        value: function Message() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var config = this.config;

            this.setState((0, _extends3.default)({}, config, option, {
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

            this.setState((0, _extends3.default)({}, config, option, {
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

            this.setState((0, _extends3.default)({}, config, option, {
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
        key: 'hide',
        value: function hide(resolve, data) {
            var callback = this.state.callback;
            var state = this.state;

            var r = true; //r为false就不会关闭会话
            if (Object.prototype.toString.call(callback) === "[object Function]") {
                r = callback(data);
            }
            if (Object.prototype.toString.call(r) != "[object Boolean]" || Object.prototype.toString.call(r) === "[object Boolean]" && !!r) {
                // 布尔型、并且true
                this.setState((0, _extends3.default)({}, state, {
                    display: false
                }), function () {
                    resolve(data);
                });
            }
        }
    }, {
        key: 'footer',
        value: function footer() {
            var _this2 = this;

            var _state = this.state,
                btnEffect = _state.btnEffect,
                button = _state.button,
                footerStyle = _state.footerStyle,
                btnReverse = _state.btnReverse;

            var btnFloat = !!btnReverse ? 'right' : 'left';
            return _react2.default.createElement(
                'ul',
                { className: 'd-dialog-footer sn-f-cb btn-effect-' + btnEffect + ' btn-group-' + button.length + ' btn-item-' + btnFloat, style: footerStyle },
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
                var key = (0, _keys2.default)(item)[0];
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
                var itemArr = (0, _keys2.default)(item);
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
                { 'data-dialog-root': '' },
                isMask && display && this.mask(),
                display && this.dialog()
            );
        }
    }]);
    return DialogCompoent;
}(_react.Component);

var Dialog = function () {
    function Dialog() {
        (0, _classCallCheck3.default)(this, Dialog);

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


    (0, _createClass3.default)(Dialog, [{
        key: 'Message',
        value: function Message(msg, title, option) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                var dialogInstall = _this4.state.dialogInstall;

                dialogInstall.Message(msg, title, option);
                dialogInstall.resolve = function (_id) {
                    dialogInstall.hide(resolve, { _id: _id });
                    /*const {state} = dialogInstall;
                    dialogInstall.setState({
                        ...state,
                        display: false
                    }, () => {
                        resolve({_id});
                    })*/
                };
            });
        }
        // 警告

    }, {
        key: 'Alert',
        value: function Alert(msg, title) {
            var _this5 = this;

            return new _promise2.default(function (resolve, reject) {
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
                dialogInstall.resolve = function (_id) {
                    dialogInstall.hide(resolve, { _id: _id });
                    /*const {state} = dialogInstall;
                    dialogInstall.setState({
                        ...state,
                        display: false
                    }, () => {
                        resolve({_id});
                    })*/
                };
            });
        }
        // 确认提示

    }, {
        key: 'Confirm',
        value: function Confirm(msg, title) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                var dialogInstall = _this6.state.dialogInstall;

                dialogInstall.Confirm(msg, title, {
                    isClose: false,
                    lineClamp: 3,
                    button: ["我知道了"],
                    titleStyle: {
                        color: '#0067ED'
                    }
                });
                dialogInstall.resolve = function (_id) {
                    dialogInstall.hide(resolve, { _id: _id });
                    /*const {state} = dialogInstall;
                    dialogInstall.setState({
                        ...state,
                        display: false
                    }, () => {
                        resolve({_id});
                    })*/
                };
            });
        }
    }]);
    return Dialog;
}();

module.exports = new Dialog();