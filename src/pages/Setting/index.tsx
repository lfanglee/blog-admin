import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Tabs } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

const { TabPane } = Tabs;

class Setting extends BaseComponent {
    state = {
        inited: false
    }

    componentDidMount() {
        this.setState({ inited: true });
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-home">
                <PageHeader title="全局管理" />
                <div className="page-content">
                    <Tabs tabPosition="left">
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        ) : <PageLoading />;
    }
}

export default connect(state => {
    return {};
}, {})(Setting);
