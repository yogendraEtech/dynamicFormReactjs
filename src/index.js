import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import formReducer from './reducers/formReducer'
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {watcher} from './sagas/saga'

const sagaMiddleware=createSagaMiddleware()
const store = createStore(formReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcher)
ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('root'));

serviceWorker.register();
