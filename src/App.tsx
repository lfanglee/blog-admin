import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
    count: 0
};

const reducer = (state = initialState, action) => {
    console.log('reducer', state, action);

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};
const store = createStore(reducer);

const Loading = () => <div>loading...</div>;

var Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'@/pages/Home'),
    loading: Loading
});

const Test = Loadable({
    loader: () => import(/* webpackChunkName: "test" */'@/pages/Test'),
    loading: Loading
});

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/test" component={Test} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
