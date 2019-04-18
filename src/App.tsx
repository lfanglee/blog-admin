import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

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
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/test" component={Test} />
                </Switch>
            </Router>
        );
    }
}
