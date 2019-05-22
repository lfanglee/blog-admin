import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter, Switch, Redirect, Link, Route, RouteComponentProps } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';

import PageLoading from '@/components/PageLoading';
import Page404 from '@/pages/ErrorPage/404';
import { menus, BaseMenu } from './Menu';
import MyHeader from './Header';
import './index.scss';

export interface User {
    _id: string;
    name: string;
    username: string;
    gravatar: string;
}

interface BaseLayoutProps extends RouteComponentProps {
    userInfo: {
        getInfo?: User
    }
}

interface BaseLayoutState {
    collapsed: boolean;
    currentUser: any
}

const { Sider, Content } = Layout;

@(withRouter as any)
export default class PageLayout extends React.PureComponent<BaseLayoutProps, BaseLayoutState> {
    state = {
        collapsed: false,
        currentUser: {} as any
    }

    onMenuClick = ({ key }: ClickParam) => {
        if (key === 'set') {
            this.props.history.push('/settings/options');
        } else if (key === 'logout') {
            // TODO logout
        }
    }

    toggle = () => {
        this.setState((preState: BaseLayoutState) => ({
            collapsed: !preState.collapsed
        }));
    }

    render() {
        return (
            <Layout className="c-layout">
                <Sider
                    className="sidebar"
                    collapsible
                    collapsed={this.state.collapsed}
                    trigger={null}
                    width="256"
                >
                    <div className="logo">
                        <Link to="/">
                            <img src={require('@/images/logo.png')} alt="logo" />
                            {this.state.collapsed || <h1>后台管理</h1>}
                        </Link>
                    </div>
                    <BaseMenu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} />
                </Sider>
                <Layout>
                    <MyHeader
                        collapsed={this.state.collapsed}
                        toggle={this.toggle}
                        currendUser={this.state.currentUser}
                        onMenuClick={this.onMenuClick}
                    />
                    <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
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
