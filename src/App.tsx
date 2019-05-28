import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { notification } from 'antd';

import configureStore from '@/store';
import history from '@/utils/history';
import PageLoading from '@/components/PageLoading';
import AuthRoute from '@/pages/components/Auth';

const store = configureStore();

const Login = React.lazy(() => import('@/pages/Login'));
const Layout = React.lazy(() => import('@/layouts/BasicLayout'));

export default class App extends React.Component {
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        notification.error({
            message: 'something was error',
            description: info.componentStack,
            duration: 5
        });
    }

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
