import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '@/store';
import history from '@/utils/history';
import PageLoading from '@/components/PageLoading';
import AuthRoute from '@/pages/components/Auth';

const store = configureStore();

const Login = React.lazy(() => import('@/pages/Login'));
const Layout = React.lazy(() => import('@/layouts/BasicLayout'));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <React.Suspense fallback={<PageLoading />}>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <AuthRoute path="/" component={Layout} />
                        </Switch>
                    </React.Suspense>
                </Router>
            </Provider>
        );
    }
}
