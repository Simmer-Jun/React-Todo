import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addClass, deleteClass, ADD_CLASS, addTask, modifyTask, deleteTask, activeClassId, activeTaskId, setView, activeView} from 'action';
import Topbar from 'topbar';
import Classlist from 'class';
import Tasklist from 'task';
import Content from 'content';
import Alert from 'alert';
import Pubsub from 'pubsub'; // 订阅发布模式


console.log(Pubsub);

var Todoapp = React.createClass({
    getInitialState: function() { // subscript once and you can begain with here~
        const dispatch = this.props.dispatch;
        /****************************************
        ********  class component ***************
        ******************************************/
        Pubsub.subscribe("addClass", function() { // addClass
            dispatch(addClass(arguments[0]));
        }); 
        Pubsub.subscribe("deleteClass", function() { // deleteClass
            dispatch(deleteClass(arguments[0])); // arguments means class id
        }); 
        Pubsub.subscribe("setActiveClassId", function() { // setActive class item
            dispatch(activeClassId(arguments[0])); // arguments means class id
        }); 
        Pubsub.subscribe("setView", function() { // 移动端视图切换 只需要弄一个就好了~
            dispatch(setView(arguments[0])); // means at witch view?
        });
        /****************************************
        ********  taskList component ***************
        ******************************************/
        Pubsub.subscribe("setActiveTaskId", function() { // 激活任务 ［当任务列表添加新任务点击时候设置activeTaskID 为new］
            dispatch(activeTaskId(arguments[0])); // 表示当前是一个新的任务
        });
        /****************************************
        ********  taskContent component ***************
        ******************************************/
        Pubsub.subscribe("addTask", function() { // addNewTask here
            dispatch(addTask(arguments[0]));
        });
        Pubsub.subscribe("modifyTask", function() { // modifyTask here
            dispatch(modifyTask(arguments[0]));
        });
        Pubsub.subscribe("setActiveTaskId", function() { // 设置当前激活任务id
            dispatch(activeTaskId(arguments[0]));
        });
        Pubsub.subscribe("deleteTask", function() { // addNewTask here
            dispatch(deleteTask(arguments[0])); // 删除任务
        });
       /* pubsub.subscribe("setView", function() { // 移动端视图切换
            dispatch(setView(arguments[0]));
        });
        */
        return {
            text: true 
        };
    },
    render: function() {
        const dispatch = this.props.dispatch; // 注册dispatch
        /*
        old method 
        addClass = { obj => dispatch(addClass(obj))} 
        deleteClass = { id => dispatch(deleteClass(id))} 
        setActive = {id => dispatch(activeClassId(id))}  
        setView = { id => dispatch(setView(id))

        addTask = { id => dispatch(activeTaskId(id)) } 
        setView = { id => dispatch(setView(id)) }

        modifyTask = {obj => dispatch(modifyTask(obj))} 
        addTask = {obj => dispatch(addTask(obj))} 
        setActive = {id => dispatch(activeTaskId(id))}  
        deleteTask =  {id => dispatch(deleteTask(id))} 
        setView = { id => dispatch(setView(id)) } 
        */
        return (
            <div className = "wraper">
                <Topbar view = { this.props.view } setView = { id => dispatch(setView(id)) } />
                <section className = "main clearfix">
                    <Classlist   view = { this.props.view }    active = { this.props.activeItem } classCont = { this.props.classList } />
                    <Tasklist    view = { this.props.view }    active = { this.props.activeItem } taskCont = { this.props.taskList }  />
                    <Content     view = { this.props.view }    active = { this.props.activeItem}  cont = { this.props.cont }   />
                </section>
                <Alert />
            </div>
        );
    },
    componentDidMount: function() {
        var that = this; 
        if(document.documentElement.offsetWidth < 460 ) {
            this.props.dispatch(activeView(true));
        }
        window.onresize = function() {
                if(document.documentElement.offsetWidth < 460) {
                that.props.dispatch(activeView(true));
            }
        }
        
    }
});
function taskListenHansler(state,id) { // 返回选中的分类id下的所有任务
    var classArry = state.classList;
    var i = 0;
    if(id === "index") {
        return [];
    }
    if( id === "all") {
        var arr = [];
        classArry.map(function(item, index){
            arr = arr.concat(item.taskList);
        });
        console.log(arr);
        return arr;
    }
    classArry.map(function(item,index) {
        if (item.id === id) {
            i = index;
        }
    });
    return classArry[i] ?  classArry[i].taskList : []; // 返回当前激活分类下的所有任务
}

function contentHandler(taskArr,id) {
    if (id === "index") {
        return {};
    }
    if(id === "new") { // 如果是新增任务
        return {}
    }
    var arr = taskArr, i;
    arr.map(function(item,index) {
        if (item.id === id ) {
            i = index;
        }
    });
    return arr[i] || { }; // 返回这个任务对象
}


function selects(state) {
    var states = JSON.stringify(state);
    window.localStorage.setItem("app",states);
    return {
        classList: state.classList, // 这里更新分类列表
        taskList: taskListenHansler(state, state.activeItem.activeClassId),// 这里更新任务列表，
        cont: contentHandler(taskListenHansler(state, state.activeItem.activeClassId), state.activeItem.activeTaskId), // 这里展示选中的任务内容
        activeItem: state.activeItem,
        view: state.view
    }
}


export default connect(selects)(Todoapp);
