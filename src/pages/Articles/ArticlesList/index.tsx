import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Card, Button, Table, Dropdown, Menu, Icon, Divider, Badge } from 'antd';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';

import BaseComponent from '@/pages/components/BaseComponent';
import { AppState } from '@/store';
import { getArticleList } from '@/store/articles/thunks';
import { GetArticleListParams } from '@/services/article';
import './index.scss';

interface Props {
    // props from redux state
    articleList: Article[];
    pagination: Pagination;
    isLoadingListData: boolean;
    // props from redux dispatch
    getArticleList: (params: GetArticleListParams) => Promise<Ajax.AjaxResponse<{
        list: Article[],
        pagination: Pagination
    }>>
}

interface ColumnRecord {
    key: string;
    title: string;
    createAt: string;
    views: number;
    type: number;
    state: number;
}

const stateMap = ['', '已发布', '草稿'];
const typeMap = ['', 'code'];
const statusMap = ['default', 'success', 'processing'];

@(withRouter as any)
@(connect((state: AppState) => {
    return {
        articleList: state.articles.articleList,
        pagination: state.articles.pagination,
        isLoadingListData: state.articles.isLoadingArticleListData
    };
}, {
    getArticleList
}) as any)
export default class ArticleList extends BaseComponent<Props & RouteComponentProps> {
    private columns: ColumnProps<ColumnRecord>[] = [{
        title: '文章标题',
        dataIndex: 'title',
        render: (text: string) => <a href="/" target="_blank">{text}</a>
    }, {
        title: '发布时间',
        dataIndex: 'createAt'
    }, {
        title: '浏览量',
        dataIndex: 'views'
    }, {
        title: '所属分类',
        dataIndex: 'type',
        render: (type: number) => <div>{typeMap[type]}</div>
    }, {
        title: '发布状态',
        dataIndex: 'state',
        render: (val: number) => <Badge status={statusMap[val] as any} text={stateMap[val]} />
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text: string, record: ColumnRecord) => <div>
            <a onClick={() => this.handleListItemEdit(record.key)}>
                编辑
            </a>
            <Divider type="vertical" />
            <Dropdown
                overlay={
                    <Menu onClick={({ key }) => this.handleListItemMoreAction(key, record.key)}>
                        <Menu.Item key="preview">预览</Menu.Item>
                        <Menu.Item key="delete">删除</Menu.Item>
                    </Menu>
                }
            >
                <a>
                更多 <Icon type="down" />
                </a>
            </Dropdown>
        </div>
    }];

    async componentDidMount() {
        const res = await this.props.getArticleList({
            pageNo: this.props.pagination.pageNo
        });
    }

    handleCreateNewClick = () => {
        this.props.history.push('/article/release');
    }

    handleListItemEdit = (recordId: string) => {
        console.log(recordId);
    }

    handleListItemMoreAction = (key: string, recordId: string) => {
        console.log(key, recordId);
    }

    handleTableChange = async (pagination: PaginationConfig) => {
        const { current } = pagination;
        await this.props.getArticleList({
            pageNo: current
        });
    }

    fetchTableData = async (params: GetArticleListParams) => {
        const res = await this.props.getArticleList({
            pageSize: 10,
            ...params
        });
        return res;
    }

    render() {
        const dataSource: ColumnRecord[] = this.props.articleList.map((item: Article) => ({
            key: item.id,
            title: item.title,
            createAt: item.createAt,
            views: item.meta.views,
            type: item.type,
            state: item.state
        }));
        const { total, pageNo: current, pageSize } = this.props.pagination;
        return (
            <div className="page c-page-articles-list">
                <PageHeader title="文章列表" />
                <div className="content">
                    <Card bordered={false}>
                        <div className="table-list-operator">
                            <Button icon="plus" type="primary" onClick={this.handleCreateNewClick}>
                                新建
                            </Button>
                            <Table
                                className="article-list"
                                dataSource={dataSource}
                                columns={this.columns}
                                loading={this.props.isLoadingListData}
                                pagination={{
                                    total,
                                    current,
                                    pageSize
                                }}
                                onChange={this.handleTableChange}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
