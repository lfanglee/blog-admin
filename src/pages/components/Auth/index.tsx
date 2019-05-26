import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { checkLogin } from '@/utils/checkLogin';

const AuthRoute: React.SFC<RouteProps> = ({ component: Component, ...rest }: RouteProps) => (
    <Route
        {...rest}
        render={props => (checkLogin() ? (
            <Component {...props} />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        ))}
    />
);

export default AuthRoute;
