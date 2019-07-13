import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

@(connect(state => {
    return {};
}, {}) as any)
export default class Files extends BaseComponent {
    state = {
        inited: false
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-files">
                <PageHeader title="文件管理" />
                <div className="page-content">
                    files
                </div>
            </div>
        ) : <PageLoading />;
    }
}
