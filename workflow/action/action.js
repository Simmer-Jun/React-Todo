/*
* action type define
*/

export const ADD_CLASS = "ADD_CLASS";
export const DELETE_CLASS = "DELETE_CLASS";
export const RENAME_CLASS = "RENAME_CLASS";
export const MOVE_CLASS = "MOVE_CLASS";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const MODIFY_TASK = "MODIFY_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";

export const SET_VISIBILITY = "SET_VISIBILITY";
export const SEARCH_TASK = "SEARCH_TASK"

export const SET_ACTIVE_CLASS = "SET_ACTIVE_CLASS"; // 设置当前激活分类
export const SET_ACTIVE_TASK = "SET_ACTIVE_TASK"; // 设置当前激活任务

export const SET_VIEW = "SET_VIEW";
export const ACTIVE_VIEW = "ACTIVE_VIEW";

/*
* Task filter const
*/


/*
*  action function  返回一个包含action type 的 acton对象
*/

export function addClass(options) { //添加分类 传进来的可都是对象啊～
    return {
        type: ADD_CLASS, 
        id: options.id,
        name: options.name,
        taskList: [],
        taskNumber: 0
    };
}

export function deleteClass(id) { //  删除分类 参数代表对象
    return {
        type: DELETE_CLASS,
        id: id // 这里吧id.id改为id就正确来，可是为毛线啊～～～～～！！！！！！
    }
}

export function renameClass (options) { // 分类重命名
    return {
        type: RENAME_CLASS,
        id: options.id,
        name: options.name
    }
}

export function moveClass(options) { // 移动分类
    return {
        type: MOVE_CLASS,
        id: options.id,
        index: option.index
    }
}

export function addTask(options) { // 添加任务
    return {
        type: ADD_TASK,
        belong: options.belong,
        id: options.id,
        title: options.title,
        date: options.date,
        content: options.content,
        complete: false
    }
}

export function deleteTask(options) { // 删除任务
    return {
        type: DELETE_TASK,
        belong: options.belong,
        id: options.id
    }
}

export function modifyTask(options) { // 修改任务
    return {
        type: MODIFY_TASK,
        belong: options.belong,
        id: options.id,
        title: options.title,
        date: options.date,
        content: options.content,
        complete: options.complete
    }
}

/*export function completeTask(options) { // 完成任务 在修改任务里面就可以完成这项功能 可舍弃
    return {
        type: COMPLETE_TASK,
        belong: options.belong,
        id: options.id
    }
}*/

export function searchTask(text) { // 查找任务
    return {
        type: SEARCH_TASK
    }
}

export function taskFilter(options) { // 过滤任务
    return {
        type: SET_VISIBILITY,
        filter: options.filter
    }
}


export function activeClassId(id) { // 设置激活分类
    return {
        type: SET_ACTIVE_CLASS,
        id: id
    }
}

export function activeTaskId(id) { // 设置激活任务
    return {
        type: SET_ACTIVE_TASK,
        id: id
    }
}

export function activeView(boolean) { // 激活移动端视图切换功能
    console.log(boolean);
    return {
        type: ACTIVE_VIEW,
        open: boolean
    }
}

export function setView(at) { // 设置移动端的当前视图
    return {
        type: SET_VIEW,
        viewAt: at
    }
}





