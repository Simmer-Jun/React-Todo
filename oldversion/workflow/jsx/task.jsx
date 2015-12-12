import  React , { Component, PropTypes } from 'react';
import Pubsub from 'pubsub';

var Tasklist =  React.createClass({
    getInitialState: function() {
        return {
            show: "all"  // show all!!! 
        };
    },
    render: function() {
        var a ,that, className;
        that = this;
        this.props.taskCont.sort(function(item1,item2){ // 日期排序在这里~
            if(item1.date > item2.date) {
                return -1;
            } else if (item1.date < item2.date) {
                return 1
            } else {
                return 0;
            }
        });
        //console.log(this.props.taskCont);
        if(this.props.taskCont) {
            a = this.props.taskCont.map(function(item,index){
                var className = "task-item";
                if(this.state.show === "all") {
                    if(item.complete) {
                    className = "task-item task-done"
                    }
                    return (
                    <div key = {index}  className = {className}>
                        <p className = "handler-line"><span className = "icon">&#xe600; </span><span>{item.date}</span><span className = "task-handler-icon">....</span></p>
                        <p className = "task-title" onClick = { function(e) {
                            return this.activeTaskHandler(item.id);
                        }.bind(that)} >{item.title}</p>
                    </div>
                    );
                } else if(this.state.show === "active") { // 展示未完成的任务
                    if(item.complete) {
                    return null;
                    }
                    return (
                    <div key = {index}  className = {className}>
                        <p className = "handler-line"><span className = "icon">&#xe600; </span><span>{item.date}</span><span className = "task-handler-icon">....</span></p>
                        <p className = "task-title" onClick = { function(e) {
                            return this.activeTaskHandler(item.id);
                        }.bind(that)} >{item.title}</p>
                    </div>
                    );
                } else {
                    if(item.complete) {
                    className = "task-item task-done";
                    return (
                    <div key = {index}  className = {className}>
                        <p className = "handler-line"><span className = "icon">&#xe600; </span><span>{item.date}</span><span className = "task-handler-icon">....</span></p>
                        <p className = "task-title" onClick = { function(e) {
                            return this.activeTaskHandler(item.id);
                        }.bind(that)} >{item.title}</p>
                    </div>
                    );
                }
                
                };
            }.bind(this));
        }
        className = "task-body";
        if(this.props.view.open && (this.props.view.viewAt === "task")) {
            className = "task-body current";
        }
        return (
            <div className = "task-body" ref = "main" id="box2">
                <section className = "task-handler">
                    <p>
                        <span  className="active" onClick = { this.showAllHandler } ref = "allFilter">所  有</span>
                        <span  ref = "activeFilter" onClick = { this.showActiveHandler }>未完成</span>
                        <span  ref = "completeFilter" onClick = { this.showCompleteandler }>已完成</span>
                    </p>
            </section>
                <section className = "task-box" ref = "show">
                    {a} 
                </section>
                <section className = "add-task-box" >
                        <p onClick = { this.addTaskHandler }><span className = "icon">&#xe800;</span> 添加任务</p>
                </section>
            </div>
        );
    },
    activeTaskHandler: function(id) { // 激活任务handler 告知store更新content组件的内容为该激活id内容
        if(this.props.active.activeTaskId === id) { // 如果点击的是同一个任务
            return false; 
        }
        Pubsub.publish('setView', "content");
        Pubsub.publish('setActiveTaskId', id);
    },
    addTaskHandler: function() { // 添加任务handler 其实这里就只是把当前激活的任务id改为 new而已 告知store给content组件一个空的对象
        if(this.props.active.activeClassId === "index" || this.props.active.activeClassId === "all") { // 如果木有指定激活一个分类则无法新建任务!
            var alertObj = {
                show: true,
                type: "confirm",
                tips: "请先选择当前任务所在的分类!"
            };
            Pubsub.publish('alert', alertObj, function () {
            // null function
           });
           return false;
        }
        if(this.props.active.activeTaskId === "new") {
            var alertObj = {
                show: true,
                type: "confirm",
                tips: "当前新建任务未保存，还新建任务吗？"
            };
            Pubsub.publish('alert', alertObj, function () {
                //
           });
            return false;
        }
        Pubsub.publish('setView', "content");
        var id = "new";
        Pubsub.publish('setActiveTaskId', id); // 说是添加任务 其实这里是大有文章的哦~
    },
    showAllHandler: function() {
        if(this.refs.allFilter.className === "active") {
            return false;
        }
       this.refs.allFilter.className = "active";
       this.refs.activeFilter.className = " ";
       this.refs.completeFilter.className = " ";
       this.setState({
        show: "all"
       });
    },
    showActiveHandler: function() {
        if(this.refs.activeFilter.className === "active") {
            return false;
        }
       this.refs.allFilter.className = "";
       this.refs.activeFilter.className = "active";
       this.refs.completeFilter.className = " ";
       this.setState({
        show: "active"
       });
    },
    showCompleteandler: function () {
        if(this.refs.completeFilter.className === "active") {
            return false;
        }
       this.refs.allFilter.className = "";
       this.refs.activeFilter.className = "";
       this.refs.completeFilter.className = "active";
       this.setState({
        show: "complete"
       });
    },
    componentDidUpdate: function(nestProps) {
        var className = this.refs.show.className.split(" ")[0];
        this.refs.show.className = className + "  show animated fadeIn";
        setTimeout(function(){this.refs.show.className = className + " show"}.bind(this), 500);
        if(this.props.view.open && (this.props.view.viewAt === "task")) {
            this.refs.main.className = "task-body current";
        }
    }
});
export default Tasklist;