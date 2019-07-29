import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Badge, Card, Dropdown, Divider, Icon, Menu, PageHeader, Table, message, Modal } from 'antd';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import * as moment from 'moment';
import qs from 'query-string';

import BaseComponent from '@/pages/components/BaseComponent';
import { AppState } from '@/store';
import { getArticleList } from '@/store/articles/thunks';
import { deleteArticle } from '@/store/article/thunks';
import { GetArticleListParams, DeleteArticleParams } from '@/services/article';
import './index.scss';

interface Props {
    // props from redux state
    articleList: Article[];
    pagination: Pagination;
    isLoadingListData: boolean;
    // props from redux dispatch
    getArticleList(params: GetArticleListParams): Promise<Ajax.AjaxResponse<{
        list: Article[],
        pagination: Pagination
    }>>
    deleteArticle(params: DeleteArticleParams): Promise<Ajax.AjaxResponse<null>>
}

interface ColumnRecord {
    key: string;
    title: string;
    create_at: string;
    views: number;
    type: number;
    state: 1 | 2;
}

enum ItemMoreActions {
    PREVIEW = 'PREVIEW',
    DELETE = 'DELETE'
}

const stateMap = ['', '已发布', '草稿'];
const publishMap = ['', '公开', '私有'];
const typeMap = ['', 'code', '随笔'];
const statusMap = ['default', 'success', 'processing'];

@(withRouter as any)
@(connect((state: AppState) => {
    return {
        articleList: state.articles.articleList,
        pagination: state.articles.pagination,
        isLoadingListData: state.articles.isLoadingArticleListData
    };
}, {
    getArticleList,
    deleteArticle
}) as any)
export default class ArticleList extends BaseComponent<Props & RouteComponentProps> {
    private columns: ColumnProps<ColumnRecord>[] = [{
        title: '文章标题',
        dataIndex: 'title',
        width: 240,
        render: (text: string, record: ColumnRecord) => <a href={`https://blog.lfanglee.cn/article/${record.key}`} target="_blank" rel="noopener noreferrer">{text}</a>
    }, {
        title: '发布时间',
        dataIndex: 'create_at',
        width: 160,
        render: (text: string) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
    }, {
        title: '浏览量',
        dataIndex: 'views',
        width: 80
    }, {
        title: '所属分类',
        dataIndex: 'type',
        width: 100,
        render: (type: number) => <div>{typeMap[type]}</div>
    }, {
        title: '发布状态',
        dataIndex: 'state',
        width: 100,
        render: (val: number) => <Badge status={statusMap[val] as any} text={stateMap[val]} />
    }, {
        title: '公开/私有',
        dataIndex: 'publish',
        width: 100,
        render: (val: number) => <Badge status={statusMap[val] as any} text={publishMap[val]} />
    }, {
        title: '操作',
        dataIndex: 'action',
        width: 150,
        render: (text: string, record: ColumnRecord) => <div>
            <a onClick={() => this.handleListItemEdit(record.key)}>
                编辑
            </a>
            <Divider type="vertical" />
            <Dropdown
                overlay={
                    <Menu onClick={({ key }) => this.handleListItemMoreAction(key, record.key)}>
                        <Menu.Item key={ItemMoreActions.PREVIEW}>预览</Menu.Item>
                        <Menu.Item key={ItemMoreActions.DELETE}>删除</Menu.Item>
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
        this.props.history.push({
            pathname: '/article/release',
            search: `?${qs.stringify({
                id: recordId
            })}`
        });
    }

    handleListItemMoreAction = async (key: string, recordId: string) => {
        if (key === ItemMoreActions.PREVIEW) {
            location.href = `https://blog.lfanglee.cn/article/${recordId}`;
        } else if (key === ItemMoreActions.DELETE) {
            Modal.confirm({
                title: '确认删除文章吗？',
                content: '删除文章后不可恢复，请谨慎操作',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                    const res = await this.props.deleteArticle({ id: recordId });
                    if (res.code === 0) {
                        message.success('删除文章成功');
                        await this.props.getArticleList({
                            pageNo: this.props.pagination.pageNo
                        });
                    }
                    return res;
                }
            });
        }
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
            create_at: item.create_at,
            views: item.meta.views,
            type: item.type,
            state: item.state,
            publish: item.publish
        }));
        const { total, pageNo: current, pageSize } = this.props.pagination;
        return (
            <div className="page c-page-articles-list">
                <PageHeader title="文章列表" />
                <div className="page-content">
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
