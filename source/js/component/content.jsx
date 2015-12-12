import  React , { Component, PropTypes } from 'react';
import Pubsub from '../pubsub/pubsub';

var Intropage = React.createClass({
    render: function() {
        return(
            <div className = "task-content-inner" >
                <div className = "content-task-title" >
                     <span className = "icon">&#xe607;</span><p><span> Todo － 引导</span></p>
                </div>
                <div className = "content-task-date" >
                    <span className = "icon">&#xe60e;</span><p><span>2015-10-25</span></p>
                </div>
                <div className = "content-inner" >
                    <p>Todo是一项个人任务管理应用，使用FaceBook框架<a href = "https://facebook.github.io/react/index.html">React</a>渲染，使用<a href = "https://github.com/rackt/redux">Redux</a>作为应用的数据流管理。</p>
                    <h2>使用说明：</h2>
                    <ul>
                        <li className = "intro-item"><span className = "icon"> + </span>: 点击添加新的分类/新的任务</li>
                        <li className = "intro-item"><span className = "icon">&#xe601;</span>: 显示所有分类下的所有任务</li>
                        <li className = "intro-item"><span className = "icon">&#xe602;</span>: 任务分类列表</li>
                        <li className = "intro-item"><span className = "icon">&#xe607;</span>: 任务标题</li>
                        <li className = "intro-item"><span className = "icon">&#xe60e;</span>: 任务日期</li>
                        <li className = "intro-item"><span className = "icon">&#xe603;</span>: 标记完成任务</li>
                        <li className = "intro-item"><span className = "icon">&#xe608;</span>: 修改任务内容</li>
                        <li className = "intro-item"><span className = "icon">&#xe606;</span>: 删除分类/任务</li>
                    </ul>
                    <div className = "content-inner-footer">
                        <p>Designed By <a href="http://www.hisimmer.com" target="_blank" title="Simmer's blog">Simmer</a></p>
                        <p>© 2015 Simmer</p>
                    </div>
                </div>
            </div>
            );
    }
});

var Detail = React.createClass({
    getInitialState: function() {
        return {
            edit: false 
        };
    },
    render: function () {
        var a, b, content, editContent;
        if(this.props.cont.complete) {
            b = function () {
                return (
                    <div className = "edit-place" >
                        <span className = "icon" title="删除该项任务" onClick = {this.deleteTaskHandler}>&#xe606;</span>
                    </div>
                );
            }.bind(this);
            editContent = b();
        } else {
            b = function () {
                return (
                    <div className = "edit-place" >
                        <span className = "icon" title="完成该项任务" onClick = {this.completeTaskHandler}>&#xe603;</span>
                        <span className = "icon" title="修改该项任务" onClick = {this.modifyTaskHandler}>&#xe608;</span>
                        <span className = "icon" title="删除该项任务" onClick = {this.deleteTaskHandler}>&#xe606;</span>
                    </div>
                    );
            }.bind(this);
            editContent = b();
        };
        if(!this.state.edit) {
            a = function(){
                return (
                        <div>
                            {editContent}
                            <div className = "content-task-title" >
                                <span className = "icon">&#xe607;</span><p><span>{this.props.cont.title}</span></p>
                            </div>
                            <div className = "content-task-date" >
                                <span className = "icon">&#xe60e;</span><p><span>{this.props.cont.date}</span></p>
                            </div>
                            <div className = "content-inner" >
                                {this.props.cont.content.replace(/666/g,"U+000A")}
                            </div>
                        </div>
                    );
            }.bind(this);
        } else {
            a = function(){
                return (
                        <div className = "task-content-inner  task-edit">
                            <div className = "content-task-title" >
                                <p><span className = "pre-title"> 标题 :</span><input type = "text" className = "task-title-input" ref="taskTitleInput"  defaultValue = {this.props.cont.title}/><span className = "title-input-tips">20个字符内</span><span className = "task-cancel-btn" title = "取消任务" onClick = {function(e){this.cancelTaskHandler()}.bind(this)} >取消</span><span className = "task-save-btn" title = "点击保存任务" onClick = {function(e){this.saveTaskHandler()}.bind(this)} >保存</span></p>
                            </div>
                            <div className = "content-task-date" >
                                <p><span className = "pre-title">日 期 :</span><input type = "date" className = "task-date-input" ref = "taskDateInput"  defaultValue = {this.props.cont.date} /><span className = "date-input-tips">输入格式:"xxxx-xx-xx"</span></p>
                            </div>
                            <div className = "content-inner" >
                                <textarea className = "task-content-input" ref = "taskContent" placeholder = "Do what today?" defaultValue = {this.props.cont.content} />
                            </div>
                        </div>
                    );
            }.bind(this);
        }
        content = a();
        return (
            <div className = "task-content-inner"  >
                {content}
            </div>
           );
    },
    deleteTaskHandler: function() {
       var obj;
       obj = {
        id: this.props.cont.id,
        belong: this.props.active.activeClassId
       }
       // this.props.deleteTask(obj);
       // Pubsub.publish('deleteTask', obj);
       // this.props.setActive("index");
       var alertObj = {
                show: true,
                type: "confirm",
                tips: "确认删除任务么？删除后不可恢复！"
        };
       Pubsub.publish('alert', alertObj, function () {
        Pubsub.publish('deleteTask', obj);
        Pubsub.publish('setActiveTaskId', 'index'); // 删除完任务后返回引导页
       });
       
       
    },
    modifyTaskHandler: function() {
        this.setState({
            edit: true
        });
    },
    completeTaskHandler: function() {
        var obj;
        obj = {
            belong: this.props.active.activeClassId,
            id: this.props.cont.id,
            title: this.props.cont.title,
            date: this.props.cont.date,
            content: this.props.cont.content,
            complete: true
        }
        var alertObj = {
                show: true,
                type: "confirm",
                tips: "确认完成任务么？完成后不可修改！"
        };
       Pubsub.publish('alert', alertObj, function () {
        Pubsub.publish('modifyTask', obj);
       });
    },
    saveTaskHandler: function() {
        var obj;
        obj = {
            belong: this.props.active.activeClassId,
            id: this.props.active.activeTaskId,
            title: this.refs.taskTitleInput.value,
            date: this.refs.taskDateInput.value,
            content: this.refs.taskContent.value,
            complete: false
        }
        //this.props.modifyTask(obj);
        Pubsub.publish('modifyTask', obj);
        this.setState({ // 变回不可编辑状态
            edit: false
        });
    },
    cancelTaskHandler: function() {
       this.setState({ // 变回不可编辑状态
            edit: false
        });
    }
});

var Newtask = React.createClass({
    render: function(){
        return(
            <div className = "task-content-inner  task-edit" >
                <div className = "content-task-title" >
                    <p><span className = "pre-title"> 标题 :</span><input type = "text" className = "task-title-input" ref="taskTitleInput" placeholder = "在这里输入任务标题" /><span className = "title-input-tips">20个字符内</span><span className = "task-cancel-btn" title = "取消任务" onClick = {function(e){this.cancelNewTaskHandler()}.bind(this)} >取消</span><span className = "task-save-btn" title = "点击保存任务" onClick = {function(e){this.saveNewTaskHandler()}.bind(this)} >保存</span></p>
                </div>
                <div className = "content-task-date" >
                    <p><span className = "pre-title">日 期 :</span><input type = "date" className = "task-date-input" ref = "taskDateInput" placeholder = "在这里输入任务日期"/><span className = "date-input-tips">输入格式:"xxxx-xx-xx"</span></p>
                </div>
                <div className = "content-inner" >
                    <textarea className = "task-content-input" ref = "taskContent" placeholder = "Do what today?" />
                </div>
            </div>
            );
    },
    saveNewTaskHandler: function () {
        var id = "task-" + Date.parse(new Date);// 获取时间戳
        var title = this.refs.taskTitleInput.value.substr(0,20); //  取前20个字符
        var date = this.refs.taskDateInput.value;
        var content = this.refs.taskContent.value.replace(/\n/g,"666").substr(0,8000);
        var belong = this.props.active.activeClassId;
        var pattern = /\d[4]-\d[0~1]\d- /g;
        //if(/ / )
        var obj = {
            belong: belong,
            id: id,
            title: title,
            date: date,
            content: content,
            complete: false
        };
        Pubsub.publish('addTask', obj);
        Pubsub.publish('setActiveTaskId', obj.id);
    },
    cancelNewTaskHandler: function() {
        Pubsub.publish('setActiveTaskId', 'index');
    }
});
var Content = React.createClass({
    
    render: function() {
        var active = this.props.active.activeTaskId;
        var content, className;
        if(active === "index") {
            content = <Intropage />;
        } else if(active === "new") {
            content =  <Newtask  active = {this.props.active} addTask ={obj => this.props.addTask(obj)} setActive = {id => this.props.setActive(id) }/>;
        } else {
            content = <Detail cont = {this.props.cont} active = {this.props.active} deleteTask = { id=> this.props.deleteTask(id)}  modifyTask = { obj => this.props.modifyTask(obj)} setActive = {id => this.props.setActive(id) }/>;
        }
        className = "content-body";
        if(this.props.view.open && (this.props.view.viewAt === "content")) {
            className = "content-body current";
        }
        return (
            <div className = "content-body" ref = "show" id ="box3">
                {content}
            </div>
        );
    },
    cancelNewTaskHandler: function () {
        var state = this.state;
        state.edit = false;
        this.setState({state
        });
    },
    componentWillUpdate: function(nestProps) {
        //this.refs.Test.className = this.refs.Test.className + "  animated  fadeIn";
        //alert(this.refs.Test.className);
        var className = this.refs.show.className.split(" ")[0] ;
        this.refs.show.className = className  + "  show animated fadeIn";
        setTimeout(function(){this.refs.show.className = className + " show"}.bind(this), 500);
    }
});

export default Content;