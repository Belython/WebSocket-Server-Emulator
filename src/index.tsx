import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./store/reducer";
import reduxThunk from 'redux-thunk';
import wsMiddleware from './middleware/middleware';
import sendMiddleware from "./middleware/sendMiddleware";
import * as serviceWorker from './serviceWorker';


const middleware = [reduxThunk, wsMiddleware, sendMiddleware];

const store = createStore(combineReducers({messages: reducer}), applyMiddleware(...middleware));

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.unregister();
