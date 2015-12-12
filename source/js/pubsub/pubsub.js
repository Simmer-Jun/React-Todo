
var Pubsub = {
    subscribe: function(e, call) {
        if(typeof call !== "function") {
            return false;
        }
        var calls = this._calls || (this._calls = {});
        this._calls[e]= call;
        return this;
    },
    publish: function() {
        var arr = Array.prototype.slice.call(arguments);
        var e = arr.shift();
        this._calls[e].apply(this, arr);
    }
}
export default Pubsub;