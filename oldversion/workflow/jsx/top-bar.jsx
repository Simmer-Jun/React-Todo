import  React , { Component, PropTypes } from 'react';


var Topbar = React.createClass({
    render: function() {
        return (
            <section className = "top-bar">
                <div className = "top-bar-left  clearfix">
                    <p className = "back  clearfix" ref = "show"><span id="button" title = "点击返回" onClick = {this.returnHandler}>返回</span></p>
                </div>
                <div className = "top-bar-right clearfix">
                    <p className = "detail" title="更多">…</p>
                </div>
                <div className = "top-bar-middle">
                     <p><span className = "icon">&#xe60b;</span><span>React - Todo</span></p>
                </div>
            </section>
        );
    },
    returnHandler: function() {
        var viewAt = this.props.view.viewAt;
        if(viewAt === "class") {
            this.refs.show.className = "back hidden";
        } else if (viewAt === "task") {
            this.refs.show.className = "back";
            this.props.setView("class");
        } else {
            this.refs.show.className = "back";
            this.props.setView("task");
        }
    },
    componentDidUpdate: function(nextProps, nextState) {
        var viewAt = this.props.view.viewAt;
        if(viewAt === "class") {
            this.refs.show.className = "back hidden"
            return false;
        }else if (viewAt === "task") {
            this.refs.show.className = "back";
            return false;
        } else {
            this.refs.show.className = "back";
            return false;
        }
    }
});
export default Topbar;