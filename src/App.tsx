import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { Provider } from 'react-redux';

import configureStore from '@/store';
import history from '@/utils/history';

const store = configureStore();

const Loading = () => <div>loading...</div>;

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'@/pages/Home'),
    loading: Loading
});

const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */'@/pages/Login'),
    loading: Loading
});

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Home} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
