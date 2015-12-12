require.config({
    baseUrl: 'js/lib',
    paths : { // 定义所有模块的加载路径
        'react' : 'react',
        'react-dom': 'react-dom',
        'redux' : 'redux',
        'react-redux' : 'react-redux',
        'main' : '../main',
        'action' : '../action/action',
        'reducer' : '../reducer/reducer',
        'store' : '../store/text',
        'todoApp': '../component/todoApp',
        'topbar':'../component/top-bar',
        'class':'../component/class',
        'task':'../component/task',
        'content':'../component/content',
        'alert':'../component/alert',
        'pubsub': '../pubsub/pubsub',
    }
});

require(['main'],function (m) {
    //
})