import  React , { Component, PropTypes } from 'react';
import Pubsub from 'pubsub';

var Alert = React.createClass({
    getInitialState: function() {
        return {
            show: false,
            type: "confirm",
            tips: "任务未成功保存，仍要退出么？"
        };
    },
    componentDidMount: function() {
        var That = this;
        Pubsub.subscribe('alert', function() {
            var obj = arguments[0]; // 弹窗内容
            var fn = arguments[1]; // 点击确定执行的函数
            That.makeSure = fn;
            That.setState(obj);
        });
    },
    render: function() {
        if(!this.state.show) {
            return (
                <div></div>
                );
        }
        var button, fn;
        fn = function() {
                return (
                <p className = "btn-inner"><span onClick = { this.makeSureHandler}>确 定</span></p>
                    );
            }.bind(this);
        button = fn();
        return (
            <div className = "alert">
                <div className = "mask"></div>
                <div className = "alert-content">
                    <p className = "tips">{this.state.tips}</p>
                    {button}
                    <div className = " icon close-btn" onClick = { this.cancelHandler } title= "关闭" >&#xe900;</div>
                </div>
            </div>
        );
    },
    makeSureHandler: function() {
        this.makeSure(); // 运行确认操作handler
        this.setState({
            show: false
        });
    },
    cancelHandler: function() {
       this.setState({
            show: false
        }); 
    }
});

export default Alert;