import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initalState = {};
const middleware = [thunk];

let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
window.__REDUX_DEVTOOLS_EXTENSION__();

//compose() with devTools only runs in development
if(
  process.env.NODE_ENV === 'prod' ||
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'test'
) {
    devTools = a => a;
}

const store = createStore(
  rootReducer,
  initalState,
  compose(
    applyMiddleware(...middleware),
    devTools,
  )
);

export default store;
