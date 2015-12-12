
require('../css/layout.less');
require('../css/reset.less');
require('../css/base.less')

import  React  from 'react';
import { createStore } from './lib/redux';
import { Provider } from 'react-redux';
import App from './reducer/reducer.js';
import Todoapp from './component/todoApp.jsx';
import  ReactDom   from 'react-dom';

let store = createStore(App); // 创建store
    
ReactDom.render(
    <Provider store = {store} ><Todoapp /></Provider>, document.getElementById('app'),function() {
        console.log('render done! ');
});
