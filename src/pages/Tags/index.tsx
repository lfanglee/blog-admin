import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getTags } from '@/store/tags/thunks';
import { GetTagsParams } from '@/services/tag';

interface Props {
    // props from redux state
    tagsList: Tag[];
    isLoadingTagsListData: boolean;
    // props from redux dispatch
    getTags: (params?: GetTagsParams) => Promise<Ajax.AjaxResponse<{
        list: Tag[];
        pagination: Pagination;
    }>>;
}

interface State {
    inited: boolean;
}

@(connect((state: AppState) => {
    return {
        tagsList: state.tags.tagsList,
        isLoadingTagsListData: state.tags.isLoadingTagsListData
    };
}, {
    getTags
}) as any)
export default class Tags extends BaseComponent<Props, State> {
    state = {
        inited: false
    }

    async componentWillMount() {
        await this.props.getTags();
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
