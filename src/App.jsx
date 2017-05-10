import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import Index from './components/Index'
//--
const store = configureStore();

ReactDOM.render(<Provider store={store}><Index/></Provider>, document.getElementById("root"));