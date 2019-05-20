import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '@/store';
import history from '@/utils/history';
import PageLoading from '@/components/PageLoading';

const store = configureStore();

const Layout = React.lazy(() => import('@/layouts/BasicLayout'));

const Login = React.lazy(() => import('@/pages/Login'));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <React.Suspense fallback={<PageLoading />}>
                            <Route exact path="/login" component={Login} />
                            <Route path="/" component={Layout} />
                        </React.Suspense>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
