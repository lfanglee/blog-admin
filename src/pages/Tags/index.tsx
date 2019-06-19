import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, List, Button, Icon, Card, Form, Modal, Input } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getTags } from '@/store/tags/thunks';
import { GetTagsParams } from '@/services/tag';
import { NewTag, NewTagModalProps } from '@/pages/Articles/ArticleRelease/interface';
import './index.scss';

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

const CreateTagForm = Form.create<NewTagModalProps>()((props: NewTagModalProps) => {
    const { modalVisible, form, handleModalVisible, handleAddTag } = props;
    const handleOk = () => {
        form.validateFields((err, value: NewTag) => {
            if (err) { return; }
            form.resetFields();
            handleAddTag(value);
        });
    };
    return (
        <Modal
            destroyOnClose
            title="新建标签"
            visible={modalVisible}
            onCancel={handleModalVisible}
            onOk={handleOk}
        >
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签名">
                {form.getFieldDecorator('tagName', {
                    rules: [{ required: true, message: '请输入标签名' }]
                })(<Input placeholder="请输入标签名" />)}
            </Form.Item>
            <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标签描述">
                {form.getFieldDecorator('tagDescript', {
                    rules: [{ required: true, message: '请输入标签描述' }]
                })(<Input placeholder="请输入标签描述" />)}
            </Form.Item>
        </Modal>
    );
});

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
        const { isLoadingTagsListData, tagsList } = this.props;
        return this.state.inited ? (
            <div className="page c-page-tags">
                <PageHeader title="标签管理" />
                <div className="page-content tags-card-list">
                    <List
                        rowKey="id"
                        loading={isLoadingTagsListData}
                        grid={{ gutter: 16, lg: 6, md: 4, sm: 4, xs: 1 }}
                        dataSource={['', ...tagsList]}
                        renderItem={(item: Tag) => (
                            item ? (
                                <List.Item key={item.id}>
                                    <Card hoverable className="tag-card" actions={[<a key="edit">编辑</a>, <a key="delete">删除</a>]}>
                                        <Card.Meta
                                            title={<a>{item.name}</a>}
                                            description={<p className="ellipsis">{item.descript}</p>}
                                        />
                                    </Card>
                                </List.Item>
                            ) : (
                                <List.Item>
                                    <Button type="dashed" className="new-tag-btn">
                                        <Icon type="plus" /> 新建产品
                                    </Button>
                                </List.Item>
                            )
                        )}
                    />
                </div>
            </div>
        ) : <PageLoading />;
    }
}
