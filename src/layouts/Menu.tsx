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
        title: 'Home',
        icon: 'home',
        component: React.lazy(() => import('@/pages/Home'))
    },
    {
        path: '/article',
        title: 'Articles',
        icon: 'project',
        subMenu: [
            {
                path: '/article/list',
                title: 'List',
                icon: 'bars',
                component: React.lazy(() => import('@/pages/Home'))
            },
            {
                path: '/article/release',
                title: 'Edit',
                icon: 'edit',
                component: React.lazy(() => import('@/pages/Home'))
            }
        ]
    },
    {
        path: '/tag',
        title: 'Tags',
        icon: 'tags',
        component: React.lazy(() => import('@/pages/Home'))
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
