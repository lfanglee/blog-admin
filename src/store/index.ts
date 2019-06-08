import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loginReducer from './login/reducers';
import articlesReducer from './articles/reducers';
import articleReducer from './article/reducers';
import tagsReducer from './tags/reducers';

const rootReducer = combineReducers({
    login: loginReducer,
    articles: articlesReducer,
    article: articleReducer,
    tags: tagsReducer
    // more reducers
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunk];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(rootReducer, composeWithDevTools(
        middleWareEnhancer
    ));

    return store;
}
