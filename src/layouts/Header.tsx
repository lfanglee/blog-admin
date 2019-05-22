import * as React from 'react';
import { Layout, Icon, Dropdown, Avatar } from 'antd';
import Menu, { ClickParam } from 'antd/lib/menu';
import { User } from './BasicLayout';
// import './index.scss';

interface HeaderProps {
    collapsed: boolean;
    currendUser?: User
    toggle: () => void;
    onMenuClick: (param: ClickParam) => void
}

interface HeaderContentProps {
    onMenuClick: (param: ClickParam) => void;
    currentUser?: User
}

const { Header: AntHeader } = Layout;

const HeaderContent = (props: HeaderContentProps) => {
    const {
        onMenuClick,
        currentUser = { username: 'lfanglee', gravatar: '' }
    } = props;
    const HeaderMenu = (
        <Menu className="header-menu" onClick={onMenuClick}>
            <Menu.Item key="set">
                <Icon type="setting" />
                <span>setting</span>
            </Menu.Item>
            <Menu.Item key="logout">
                <Icon type="logout" />
                <span>logout</span>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={HeaderMenu}>
            <span className="header-right">
                <Avatar size="small" src={currentUser.gravatar} alt="avatar" />
                <span className="name">{currentUser.username}</span>
            </span>
        </Dropdown>
    );
};

const Header = ({ collapsed, toggle, ...rest }: HeaderProps) => (
    <AntHeader className="header">
        <Icon
            className="header-triggle"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
        />
        <HeaderContent {...rest} />
    </AntHeader>
);
export default Header;
