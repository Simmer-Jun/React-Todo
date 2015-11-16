import  React , { Component, PropTypes } from 'react';
import  ReactDom   from 'react-dom';
import Pubsub from 'pubsub';



var List = React.createClass({ // 分类列表
    render: function() {
        var That = this;
        var active = this.props.active.activeClassId;
        var list = this.props.classContent.map(function(item, index) {
            var className = "class-list-item  clearfix";
            if(item.id === active) {
                className = "class-list-item  active  clearfix";
            }
            return (
                <div key = {item.id} className = {className} onClick = {function(e) {this.activeHandler(item.id)}.bind(That)} >
                    <table>
                        <tbody>
                            <tr>
                                <td className = "left"><span className = "radious"></span></td>
                                <td className = "middle"><span className = "class-inner">{item.name} ({item.taskNumber})</span></td>
                                <td className = "right"><span  onClick = { function(e) { e.stopPropagation(); this.deleteClass(item.id)}.bind(That)} className = "icon" title = "删除该分类"> &#xe606;</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>)
        });
        return (
            <section className = "class-list">
                {list}
            </section>
        );
    },
    deleteClass: function (id) { // 删除分类处理函数
    var alertObj = {
                show: true,
                type: "confirm",
                tips: "确认删除任务么？删除后不可恢复！"
        };
        var That = this;
       Pubsub.publish('alert', alertObj, function () {
           if(id === That.props.active.activeClassId ) { // 当删除的是当前激活的分类
                    Pubsub.publish('setActiveClassId', 'index');
                }
                Pubsub.publish('deleteClass', id);
       });        
    },
    activeHandler: function (id) { // 激活当前选中分类处理函数
        var alertObj = {
                show: true,
                type: "confirm",
                tips: "任务还未保存确认退出编辑任务么？"
        };
        if(this.props.active.activeTaskId === "new") { // 如果选中的是同一个分类则不予以更新
            Pubsub.publish('alert', alertObj, function () {
                Pubsub.publish('setActiveClassId', id);
           });
        } else if(this.props.active.activeClassId === id){
            return false
        }else{
                Pubsub.publish('setActiveClassId', id);
        }
    }
});

var Addclass = React.createClass({ //添加任务组件
    getInitialState: function() {
        return {
            showForm: false 
        };
    },
    render: function() {
        var class1 = this.state.showForm ? "add-class-btn-hidden" : "add-class-btn";
        var class2 = this.state.showForm ? "add-class-form" : "add-class-form-hidden";
        return (
            <section className = "add-class-box">
            <div className = { class1 } ref = "add" onClick = {e => this.showForm()}><span className = "icon">&#xe800;</span> 点击添加分类</div>
            <div className = {class2 }>
                <input  type = "text" className = "class-input" ref = "classInput" placeholder = "在这里输入分类名称。。。" onKeyDown = {this.keyDown}/>
                <select className = "class-options">
                    <option>学习</option>
                    <option>工作</option>
                    <option>生活</option>
                    <option>娱乐</option>
                    <option>其他</option>
                </select>
                <p><span  id = "create-class-btn" onClick = {(e) => this.sureHandler(e)}>确定</span> <span id = "class-cancel-btn" onClick = {(e) => this.cancelandler(e)}>取消</span></p>
                <p className = "tips"><span className = "icon">&#xe605;</span>请输入20个字以内</p>
            </div>
         </section>
        );
    },
    cancelandler: function () {
        this.setState({
            showForm: false
        });
        this.refs.classInput.value = "";
    },
    showForm: function () {
        this.setState({
            showForm: true
        });
    },
    sureHandler: function(e) {
        var name = this.refs.classInput.value.substr(0,15); // 只取前20个字符串
        this.refs.classInput.value = "";
        if(!name) {
            var alertObj = {
                show: true,
                type: "confirm",
                tips: "请输入分类名称!"
        };
       Pubsub.publish('alert', alertObj, function () {
        //
       });
            return;
        } 
        this.setState({
            showForm: false
        });
        Pubsub.publish('addClass', {
            id: "class-" + Date.parse(new Date),
            name: name
        });
    },
    keyDown: function (e) {
        if(e.keyCode == 13) {
            this.sureHandler(e);
        }
    }
});


var Classlist = React.createClass({ // 分类组件
    getInitialState: function() {
        return {
            activeID: "index" 
        };
    },
    render: function() {
        var number, className, bodyName;
        className = "all-task";
        if(this.props.active.activeClassId === "all") {
            className = "all-task active"
        }
        number = 0;
        this.props.classCont.map(function(item, index) {
            number = number + item.taskNumber;
        });
        bodyName = "class-body  ";
        if(this.props.view.open && (this.props.view.viewAt === "class")) {
        bodyName = "class-body ";
        }
        return (
            <section className = "class-body"  id="box1">
                    <header>
                        <h2 className = { className } onClick = { this.allTaskHandler }><span className = "icon">&#xe601;</span> 所有任务(<span>{number}</span>)</h2>
                        <h2><span className = "icon">&#xe602;</span> 分类列表</h2>
                    </header>
                    <section className = "class-body-main">
                        <List  classContent = {this.props.classCont} active = {this.props.active}  />
                        <Addclass />
                    </section>
                </section>
        );
    },
    allTaskHandler: function() {
        if(this.props.active.activeClassId === "all") { 
            return false; 
        };
        var alertObj = {
                show: true,
                type: "confirm",
                tips: "任务还未保存确认退出编辑任务么？"
        };
        if(this.props.active.activeTaskId === "new") { // 如果选中的是同一个分类则不予以更新
            Pubsub.publish('alert', alertObj, function () {
                Pubsub.publish('setActiveClassId', 'all');
           });
        }
    }
});
export default Classlist;


