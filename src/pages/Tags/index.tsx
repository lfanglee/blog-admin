import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, List, Button, Icon, Card, Form, Modal, Input } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getTags } from '@/store/tags/thunks';
import { Props, State, ModalTypes, TagFields, TagModalWrapperProps, TagModalProps } from './interface';
import './index.scss';

const CreateTagForm = Form.create<TagModalProps>({
    mapPropsToFields(props: TagModalProps) {
        const { tagName, tagDescript } = props.initialValue;
        const createFormField = (prop: any) => Form.createFormField({
            value: prop
        });
        return {
            tagName: createFormField(tagName),
            tagDescript: createFormField(tagDescript)
        };
    }
})((props: TagModalProps) => {
    const { modalVisible, title, form, handleModalVisible, handleOkClick } = props;
    const handleOk = () => {
        form.validateFields((err, value: TagFields) => {
            if (err) { return; }
            form.resetFields();
            handleOkClick(value);
        });
    };
    return (
        <Modal
            destroyOnClose
            title={title}
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

const TagConfigModal = ({ modalType, handleOk, ...props }: TagModalWrapperProps & {
    modalType: ModalTypes
}) => {
    let newProps = props;
    if (modalType === ModalTypes.ADD) {
        newProps = {
            ...newProps,
            title: '新建标签',
            initialValue: {}
        };
    } else if (modalType === ModalTypes.UPDATE) {
        newProps = {
            ...newProps,
            title: '更新标签'
        };
    }
    const handleSave = (value: TagFields) => {
        handleOk(modalType, value);
    };
    return (
        <CreateTagForm
            {...newProps}
            handleOkClick={handleSave}
        />
    );
};

@(connect((state: AppState) => {
    return {
        tagsList: state.tags.tagsList,
        isLoadingTagData: state.tags.isLoadingTagData
    };
}, {
    getTags
}) as any)
export default class Tags extends BaseComponent<Props, State> {
    state = {
        inited: false,
        modalVisible: false,
        modalType: ModalTypes.ADD
    }

    async componentWillMount() {
        await this.props.getTags();
        this.setState({ inited: true });
    }

    handleAddTagClick = () => {
        this.setState({
            modalType: ModalTypes.ADD,
            modalVisible: true
        });
    }

    handleModalVisible = () => {
        this.setState({ modalVisible: false });
    }

    handleTagSave = (type: ModalTypes, value: TagFields) => {
        console.log(type, value);
    }

    render() {
        const { modalVisible, modalType } = this.state;
        const { isLoadingTagData, tagsList } = this.props;
        return this.state.inited ? (
            <div className="page c-page-tags">
                <PageHeader title="标签管理" />
                <div className="page-content tags-card-list">
                    <List
                        rowKey="id"
                        loading={isLoadingTagData}
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
                                    <Button type="dashed" className="new-tag-btn" onClick={this.handleAddTagClick}>
                                        <Icon type="plus" /> 新建标签
                                    </Button>
                                </List.Item>
                            )
                        )}
                    />
                </div>
                <TagConfigModal
                    modalVisible={modalVisible}
                    modalType={modalType}
                    handleModalVisible={this.handleModalVisible}
                    handleOk={this.handleTagSave}
                />
            </div>
        ) : <PageLoading />;
    }
}
