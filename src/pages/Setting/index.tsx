import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

@(connect(state => {
    return {};
}, {}) as any)
export default class Setting extends BaseComponent {
    state = {
        inited: false
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-home">
                <PageHeader title="全局管理" />
                <div className="page-content">
                    Setting
                </div>
            </div>
        ) : <PageLoading />;
    }
}
