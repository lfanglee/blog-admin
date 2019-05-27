import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Card, Button, Table, Dropdown, Menu, Icon, Divider, Badge } from 'antd';

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
        status: '2'
    },
    {
        key: '2',
        articleName: '胡彦祖',
        publishTime: 42,
        look: '西湖区湖底公园1号',
        type: '1',
        status: '2'
    }
];
const status = ['0', '草稿', '已发布', 'error'];
const statusMap = ['default', 'processing', 'success', 'error'];

@(withRouter as any)
@(connect() as any)
export default class ArticleList extends BaseComponent<Props & RouteComponentProps> {
    private columns = [{
        title: '文章标题',
        dataIndex: 'articleName',
        render: (text: string) => <a href="/" target="_blank">{text}</a>
    }, {
        title: '发布时间',
        dataIndex: 'publishTime'
    }, {
        title: '浏览量',
        dataIndex: 'look'
    }, {
        title: '所属分类',
        dataIndex: 'type'
    }, {
        title: '发布状态',
        dataIndex: 'status',
        render: (val: number) => <Badge status={statusMap[val] as any} text={status[val]} />
    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text: string, record) => <div>
            <a onClick={this.handleListItemEdit}>
                编辑
            </a>
            <Divider type="vertical" />
            <Dropdown
                overlay={
                    <Menu onClick={this.handleListItemMoreAction}>
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

    handleCreateNewClick = () => {
        this.props.history.push('/article/release');
    }

    handleListItemEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('item edit');
    }

    handleListItemMoreAction = ({ key }) => {
        console.log(key);
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
                            <Table dataSource={dataSource} columns={this.columns} />
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
