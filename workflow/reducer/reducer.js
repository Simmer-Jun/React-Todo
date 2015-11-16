import { combineReducers } from 'redux'; // 使用combineReducers 合并reducer～
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
    SET_ACTIVE_CLASS,
    SET_ACTIVE_TASK,
    SET_VIEW,
    ACTIVE_VIEW
} from 'action';



// 初始化localstorage
const app = window.localStorage.getItem("app");
if(!app) {
    var states = JSON.stringify({
        classList:[ {id: 1,name:'学习',taskList: [{id: "task-000006", title: 'React-Todo', date: '2015-10-09',content: "何不开始你今天的学习之旅？",complete: false}],taskNumber:1}],
        activeItem: { activeClassId: 1, activeTaskId: "index"},
        view: { open: false, viewAt: "class" }
    });
    window.localStorage.setItem("app",states);
}
var stateTree = JSON.parse(window.localStorage.getItem("app"));
/*
* reducer one
removed by simmer at 10/26/2015
const { SHOW_ALL } = Task_filter;
function taskFilter(state = SHOW_ALL, action) { // 初始化 接受state 和 action 返回新的state
    switch (action.type) {
    case SET_VISIBILITY:
        return action.filter;
    default: 
        return state;
    }
}

*/

/*
* reducer two
*/

function classList(state = stateTree.classList, action) { // 这个state代表的是分类的数组 － 即在reducer中所代表的那一部分state
    //console.log(state, action);
    switch (action.type) {
    case ADD_CLASS:
        return [...state,{
            id: action.id,
            name: action.name,
            taskList: [],
            taskNumber: action.taskNumber
        }];
    case DELETE_CLASS:
        var i, id ;
        id = action.id;
        state.forEach(function (item, index) {
            if (item.id == id) {
                i = index; // 获取该分类在数组中的索引
            }
        }); // 获得通过id选中的数组
        return [...state.slice(0,i), ...state.slice(i + 1)]; // 删除了这一项 绝不可以对原state有所修改
    case RENAME_CLASS:
        var i, id, item;
        id = action.id;
        state.forEach(function (item, index) {
            if (item.id === id) {
                i = index; // 获取该分类在数组中的索引
            }
        });
        item = state[i];
        item.name =  action.name;
        return [...state.slice(0,i), item, ...state.slice(i + 1)];
    case ADD_TASK:
        var id, i, item;
        id = action.belong; // 获取从属于class的id
        state.forEach(function (item, index) {
            if (item.id === id) {
                i = index; // 获取该分类在数组中的索引
            }
        });
        item = state[i];
        item.taskNumber = item.taskNumber + 1;
        item.taskList.push({
            id: action.id,
            title: action.title,
            date: action.date,
            content: action.content,
            complete: action.complete
        });
        return [...state.slice(0, i), item, ...state.slice(i + 1)]; // 返回新的state
    case DELETE_TASK:
        var id, i, j, arr;
        id = action.belong; // 获取从属于class的id
        if(id === "all") { //如果是在所有任务的列表里面删除任务
            var states = state, ids, i, j;
            ids = action.id;
            states.map(function(item, index) {
                item.taskList.map(function(items, indexs) {
                    if(items.id === ids) {// 如果找到了这个任务
                        i = index;
                        j = indexs;
                    }
                });
             });
            states[i].taskNumber--; // 该分类下的任务数量减1
            states[i].taskList.splice(j,1); //删除数组中的第j项
            return states;
        } else{
            state.forEach(function (item, index) {
            if (item.id === id) {
                i = index; // 获取该分类在数组中的索引
            }
            });
            arr = state[i].taskList;
            arr.forEach(function (item, index) {
                if (item.id === action.id) {// 如果任务id和某项任务的id吻合，则
                    j =  index; // 获取任务在数组中的索引
                }
            })
            arr = [...arr.slice(0, j), ...arr.slice(j + 1)]; // 删除任务数组中的第j项
            state[i].taskList = arr;
            state[i].taskNumber = state[i].taskNumber - 1 ;
            return [...state.slice(0, i), state[i], ...state.slice(i + 1)];
        }
        
    case MODIFY_TASK:
        var id, i, j, arr;
        id = action.belong; // 获取从属于class的id
        if(id === "all") { //如果是在所有任务的列表里面删除任务
            var states, ids, i, j;
            states = state
            ids = action.id;
            states.map(function(item, index) {  
                item.taskList.map(function(item, indexs) {
                    if(item.id === ids) {// 如果找到了这个任务
                        i = index;
                        j = indexs;
                    }
                });
             });
            id = states[i].id;
            states[i].taskList[j] = { // 更改任务
                belong: id,
                id: action.id,
                title: action.title,
                date: action.date,
                content: action.content,
                complete: action.complete
            };
            return states;
        } else {
             state.forEach(function (item, index) {
            if (item.id === id) {
                i = index; // 获取该分类在数组中的索引
            }
            });
            arr = state[i].taskList;
            arr.forEach(function (item, index) {
                if (item.id === action.id) {// 如果任务id和某项任务的id吻合，则
                    j =  index; // 获取任务在数组中的索引
                }
            })

            arr[j] = { // 更改任务
                belong: action.belong,
                id: action.id,
                title: action.title,
                date: action.date,
                content: action.content,
                complete: action.complete
            };
            arr = [...arr.slice(0, j), arr[j], ...arr.slice(j + 1)]; // 删除任务数组中的第j项
            if(!arr[0]) { // 如果任务数量为0 则重置arr
                arr = [j]
            }
            state[i].taskList = arr;
            return [...state.slice(0, i), state[i], ...state.slice(i + 1)]; // 最后一定要记得返回新的state
        }
       
    default:
        return state;
    }
}
var activeObj = {
    activeClassId: "all",
    activeTaskId: "index"
}
//activeObj.activeItem.activeTaskId = "index";
function activeItem(state = activeObj, action) { // update 当前激活的分类或任务
    switch(action.type) {
        case SET_ACTIVE_CLASS:
            var states = state;
            states.activeClassId = action.id; // 更新为当前激活分类的id
            states.activeTaskId = "index"; // 当切换分类的时候这样做是为了在content component上面展示引导页面
            return states;
        case SET_ACTIVE_TASK:
            var states = state;
            states.activeTaskId = action.id; // 更新为当前激活任务的id
            return states;
        default:
            return state;
    }
}

/*
* use combineReducers
*/
function view(state = stateTree.view, action) { // 移动端视图切换
    var states;
    switch(action.type) {
        case ACTIVE_VIEW:
            states = state;
            states.open = action.open
            return states;
        case SET_VIEW:
            states = state;
            states.open = true;
            states.viewAt = action.viewAt;
            return states;
        default:
        return state;
    }
}

const App = combineReducers({
    classList,
    activeItem,
    view
});

export default App;











