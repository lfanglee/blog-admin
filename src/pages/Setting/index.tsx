import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Menu } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import './index.scss';

class Setting extends BaseComponent {
    state = {
        inited: false
    }

    componentDidMount() {
        this.setState({ inited: true });
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-setting">
                <PageHeader title="全局管理" />
                <div className="page-content">
                    <div className="menu-content">
                        <Menu
                            mode="inline"
                        >
                            <Menu.Item>基本信息</Menu.Item>
                            <Menu.Item>账户设置</Menu.Item>
                        </Menu>
                    </div>
                    <div className="main-content">
                        <div className="title">基本信息</div>
                    </div>
                </div>
            </div>
        ) : <PageLoading />;
    }
}

export default connect(state => {
    return {};
}, {})(Setting);
