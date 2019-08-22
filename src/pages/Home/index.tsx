import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

class Home extends BaseComponent {
    state = {
        inited: false
    }

    componentDidMount() {
        this.setState({ inited: true });
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-home">
                <PageHeader title="管理中心" />
                <div className="page-content">
                    Home，后续开发
                </div>
            </div>
        ) : <PageLoading />;
    }
}

export default connect(state => {
    return {};
}, {})(Home);
