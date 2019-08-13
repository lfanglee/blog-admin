import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router';
import { PageHeader, Menu, Divider } from 'antd';
import { ClickParam } from 'antd/lib/menu';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import Account from './Account';
import Options from './Options';
import { AppState } from '@/store';
import { State, Props } from './interface';
import './index.scss';

const menu = {
    options: 'Options Setting',
    account: 'Account Setting'
};

class Setting extends BaseComponent<Props, State> {
    state: State = {
        selectedKey: this.props.location.pathname.replace(`${this.props.match.path}/`, '') || 'options'
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            selectedKey: nextProps.location.pathname.replace(`${this.props.match.path}/`, '')
        });
    }

    selectKey = ({ key }: ClickParam) => {
        const { history } = this.props;
        history.push(`/setting/${key}`);
        this.setState({
            selectedKey: key
        });
    }

    render() {
        const { selectedKey } = this.state;
        return (
            <div className="page c-page-setting">
                <PageHeader title="全局管理" />
                <div className="page-content">
                    <div className="menu-content">
                        <Menu
                            selectedKeys={[selectedKey]}
                            mode="inline"
                            onClick={this.selectKey}
                        >
                            {Object.keys(menu).map(item => <Menu.Item key={item}>{menu[item]}</Menu.Item>)}
                        </Menu>
                    </div>
                    <div className="main-content">
                        <div className="title">{menu[selectedKey]}</div>
                        <div className="view">
                            <Route path="/setting/options" exact component={Options} />
                            <Route path="/setting/account" exact component={Account} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect((state: AppState) => {
    return {};
}, {})(Setting));
