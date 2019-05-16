import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './test/reducers';
import loginReducer from './login/reducers';

const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer
    // more reducers
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, middleWareEnhancer);

    return store;
}
