import * as React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { withRouter, Switch, Redirect, Link, Route, RouteComponentProps } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { ClickParam } from 'antd/lib/menu';

import PageLoading from '@/components/PageLoading';
import Page404 from '@/pages/ErrorPage/404';
import { menus, BaseMenu } from './Menu';
import MyHeader from './Header';
import { mapPathToList, getPageTitle } from '@/utils/getPageTitle';
import { AppState } from '@/store';
import { logout } from '@/store/login/thunks';
import './index.scss';

export interface User {
    _id: string;
    name: string;
    username: string;
    gravatar: string;
}

interface BaseLayoutProps {
    // dispatchProps
    logout: () => void,
    // ownProps
    userInfo: {
        getInfo?: User
    }
}

interface BaseLayoutState {
    collapsed: boolean;
    currentUser: any
}

const { Sider, Content } = Layout;

class PageLayout extends React.PureComponent<BaseLayoutProps & RouteComponentProps, BaseLayoutState> {
    state: BaseLayoutState = {
        collapsed: false,
        currentUser: {} as any
    }

    onMenuClick = ({ key }: ClickParam) => {
        if (key === 'set') {
            this.props.history.push('/setting/options');
        } else if (key === 'logout') {
            this.props.logout();
            this.props.history.push('/login');
        }
    }

    toggle = () => {
        this.setState((preState: BaseLayoutState) => ({
            collapsed: !preState.collapsed
        }));
    }

    render() {
        const {
            location: { pathname }
        } = this.props;
        const layout = (
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
                    <BaseMenu
                        className="menu"
                        theme="dark"
                        mode="inline"
                        defaultOpenKeys={[mapPathToList(pathname)[0]]}
                        selectedKeys={[pathname]}
                        defaultSelectedKeys={['dashboard']}
                    />
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
        return (
            <DocumentTitle title={getPageTitle(pathname)}>
                <div>{layout}</div>
            </DocumentTitle>
        );
    }
}

export default connect((state: AppState) => ({}), {
    logout
})(withRouter(PageLayout));
