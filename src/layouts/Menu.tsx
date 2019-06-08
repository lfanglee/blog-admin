import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { MenuProps } from 'antd/lib/menu';

interface MenuItem {
    path: string;
    title: string;
    icon: string;
    redirect?: string;
    subMenu?: MenuItem[];
}

export const menus = [
    {
        path: '/dashboard',
        title: '管理中心',
        icon: 'dashboard',
        component: React.lazy(() => import('@/pages/Home'))
    },
    {
        path: '/article',
        title: '文章管理',
        icon: 'project',
        subMenu: [
            {
                path: '/article/list',
                title: '文章列表',
                icon: 'bars',
                component: React.lazy(() => import('@/pages/Articles/ArticlesList'))
            },
            {
                path: '/article/release',
                title: '发布文章',
                icon: 'edit',
                component: React.lazy(() => import('@/pages/Articles/ArticleRelease'))
            }
        ]
    },
    {
        path: '/tags',
        title: '分类/标签',
        icon: 'tags',
        component: React.lazy(() => import('@/pages/Tags'))
    }
];

const renderMenuItem = (item: MenuItem) => (
    <Menu.Item key={item.path}>
        <Link to={item.redirect || item.path}>
            {item.icon && <Icon type={item.icon} />}
            <span className="nav-text">{ item.title }</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = (item: MenuItem) => (
    <Menu.SubMenu
        key={item.path}
        title={
            <span>
                {item.icon && <Icon type={item.icon} />}
                <span className="nav-text">{item.title}</span>
            </span>
        }
    >
        {item.subMenu.map(i => renderMenuItem(i))}
    </Menu.SubMenu>
);

export const BaseMenu = (props: MenuProps) => (
    <Menu {...props}>
        {menus.map((item: MenuItem) => (item.subMenu ? renderSubMenu(item) : renderMenuItem(item))) }
    </Menu>
);
