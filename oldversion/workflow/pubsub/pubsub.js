/* var Pubsub = {
    subscribe: function(e, call) {
        var call = this._call || (this._call = { }); // 如果木有_call，新建一个call对象
        (this._call[e] || (this._call[e] = [])).push(call); // 如果木有e事件则初始化其为数组
        return this; // 返回新的对象
    },
    publish: function() {
        var arr = Array.prototype.slice.call(arguments); // 类数组到数组
        var e, call, list, len, i;
        e= arr.shift();// 第一项是事件名称
        if(!(call = this._call)) return false;
        if(!(list = this._call[e])) return false;
        for( i = 0, len = list.length; i < len ; i++ ) {
            list[i].apply(this, arr);
        }
        return this;
    },
    text: function() {
        alert(123);
    }
} */
var Pubsub = {
    subscribe: function(e, call) {
        if(typeof call !== "function") {
            return false;
        }
        var calls = this._calls || (this._calls = {});
        this._calls[e]= call;
        console.log(this);
        return this;
    },
    publish: function() {
        var arr = Array.prototype.slice.call(arguments);
        var e = arr.shift();
        this._calls[e].apply(this, arr);
    }
}
export default Pubsub;