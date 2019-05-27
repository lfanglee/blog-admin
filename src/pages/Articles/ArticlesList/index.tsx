import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Card, Button, Table } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';

interface Props {

}

const dataSource = [
    {
        key: '1',
        articleName: '胡彦斌',
        publishTime: 32,
        look: '西湖区湖底公园1号',
        type: '1',
        status: '2',
        operator: 'test'
    },
    {
        key: '2',
        articleName: '胡彦祖',
        publishTime: 42,
        look: '西湖区湖底公园1号',
        type: '1',
        status: '2',
        operator: 'test'
    }
];

const columns = [
    {
        title: '文章标题',
        dataIndex: 'articleName'
    },
    {
        title: '发布时间',
        dataIndex: 'publishTime'
    },
    {
        title: '浏览量',
        dataIndex: 'look'
    },
    {
        title: '所属分类',
        dataIndex: 'type'
    },
    {
        title: '发布状态',
        dataIndex: 'status'
    },
    {
        title: '操作',
        dataIndex: 'operator'
    }
];

@(withRouter as any)
@(connect() as any)
export default class ArticleList extends BaseComponent<Props & RouteComponentProps> {
    handleCreateNewClick = () => {
        this.props.history.push('/article/release');
    }

    render() {
        return (
            <div className="page c-page-articles-list">
                <PageHeader title="文章列表" />
                <div className="content">
                    <Card bordered={false}>
                        <div className="table-list-operator">
                            <Button icon="plus" type="primary" onClick={this.handleCreateNewClick}>
                                新建
                            </Button>
                            <Table dataSource={dataSource} columns={columns} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
