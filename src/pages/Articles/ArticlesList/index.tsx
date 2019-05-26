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
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
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
