import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, Switch, Redirect, Route } from 'react-router';

import PageLoading from '@/components/PageLoading';
import Page404 from '@/pages/ErrorPage/404';
import { menus, BaseMenu } from './Menu';
import './index.scss';

const { Sider, Header, Content } = Layout;

@(withRouter as any)
export default class PageLayout extends React.PureComponent {
    render() {
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    <div className="logo" />
                    <BaseMenu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <React.Suspense fallback={<PageLoading />}>
                            <Switch>
                                <Redirect from="/" to={menus[0].path} exact />
                                {menus.map(menu => {
                                    const route = ({ component: Component, path, title }: typeof menu) => (
                                        <Route key={title} path={path} component={Component} />
                                    );
                                    return menu.component ? route(menu) : menu.subMenu.map(item => route(item));
                                })}
                                <Route component={Page404} />
                            </Switch>
                        </React.Suspense>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
