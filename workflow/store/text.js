import { 
    ADD_CLASS,
    DELETE_CLASS,
    RENAME_CLASS,
    MOVE_CLASS,
    ADD_TASK,
    DELETE_TASK, 
    MODIFY_TASK,
    SET_VISIBILITY,
    Task_filter,
    addClass,
    deleteClass,
    renameClass,
    moveClass,
    addTask,
    deleteTask,
    modifyTask,
    searchTask,
    taskFilter
} from 'action';

import { createStore, combineReducers } from 'redux'; // 从redux中引入createStore function

import App from 'reducer' // 引入reducer


//let App = combineReducers(reducers); //将拆分好的reducer组合起来

let store = createStore(App); // 创建store

let unsubscribe = store.subscribe(()=> console.log(store.getState())); // 监听state的更新并打印

// test 模拟发起action
//console.log(store.getState()); // 打印store初始数据

store.dispatch(addClass({
    id: 1,
    name: 'Study React!',
    number: 0
}));

store.dispatch(addClass({
    id: 2,
    name: 'admin',
    number: 0
}));


store.dispatch(addTask({
   belong: 2,
   id: 1,
   name: 'Fun for you!',
   date: '2015-10-18',
   content: 'Yeah this is new life for simmer~'
}));

store.dispatch(modifyTask({
   belong: 2,
   id: 1,
   name: 'haha',
   date: '2015-10-19',
   content: 'adadadajdajkdhkajhdjkahdkjad',
   complete: true
}));






