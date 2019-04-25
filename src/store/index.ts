import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './test/reducers';

const rootReducer = combineReducers({
    counter: counterReducer
    // more reducers
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, middleWareEnhancer);

    return store;
}
