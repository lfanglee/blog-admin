import * as React from 'react';
import { PageHeader } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

export default class Tags extends BaseComponent {
    state = {
        inited: false
    }

    componentWillMount() {
        this.setState({ inited: true });
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-tags">
                <PageHeader title="标签管理" />
            </div>
        ) : <PageLoading />;
    }
}
