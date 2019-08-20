import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, List, Button, Icon, Card, Form, Modal, Input, message, Spin } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getTags, addTag, updateTag, deleteTag } from '@/store/tags/thunks';
import { Props, State, ModalTypes, TagFields, TagModalWrapperProps, TagModalProps } from './interface';
import './index.scss';

const CreateTagForm = Form.create<TagModalProps>({
    mapPropsToFields(props: TagModalProps) {
        const { name, descript } = props.initialValue;
        const createFormField = (prop: any) => Form.createFormField({
            value: prop
        });
        return {
            tagName: createFormField(name),
            tagDescript: createFormField(descript)
        };
    }
})((props: TagModalProps) => {
    const { modalVisible, title, form, handleModalVisible, handleOkClick, loading } = props;
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
            <Spin spinning={loading}>
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
            </Spin>
        </Modal>
    );
});

const TagConfigModal = ({ modalType, handleOk, ...props }: TagModalWrapperProps & {
    modalType: ModalTypes;
}) => {
    const { initialValue = {} } = props;
    let newProps = {
        title: '新建标签',
        initialValue: {},
        modalVisible: true
    };
    if (modalType === ModalTypes.ADD) {
        newProps = {
            ...newProps
        };
    } else if (modalType === ModalTypes.UPDATE) {
        newProps = {
            ...newProps,
            initialValue,
            title: '更新标签'
        };
    } else if (modalType === ModalTypes.NONE) {
        newProps = {
            ...newProps,
            modalVisible: false,
            initialValue: {}
        };
    }
    const handleSave = (value: TagFields) => {
        handleOk(modalType, value);
    };
    return (
        <CreateTagForm
            {...props}
            {...newProps}
            handleOkClick={handleSave}
        />
    );
};

class Tags extends BaseComponent<Props, State> {
    state: State = {
        inited: false,
        modalType: ModalTypes.NONE,
        modalLoading: false,
        modalInitialValue: {}
    }

    async componentDidMount() {
        await this.props.getTags();
        this.setState({ inited: true });
    }

    handleAddTagClick = () => {
        this.setState({
            modalType: ModalTypes.ADD
        });
    }

    handleModalVisible = () => {
        this.setState({ modalType: ModalTypes.NONE });
    }

    handleTagSave = async (type: ModalTypes, value: TagFields) => {
        const { id } = this.state.modalInitialValue;
        const { tagName: name, tagDescript: descript } = value;
        this.setState({ modalLoading: true });
        if (type === ModalTypes.ADD) {
            const res = await this.props.addTag({
                name,
                descript
            });
            if (res.code === 0) {
                message.success('新增标签成功');
            }
        } else if (type === ModalTypes.UPDATE) {
            const res = await this.props.updateTag({
                id,
                name,
                descript
            });
            if (res.code === 0) {
                message.success('更新标签成功');
            }
        }
        this.setState({
            modalLoading: false,
            modalType: ModalTypes.NONE
        });
    }

    handleTagEditClick = (value: Tag) => {
        this.setState({
            modalType: ModalTypes.UPDATE,
            modalInitialValue: value
        });
    }

    handleTagDelClick = (value: Tag) => {
        const { id } = value;

        Modal.confirm({
            title: '确定删除标签吗？',
            content: '标签删除后不可恢复',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const res = await this.props.deleteTag({ id });
                if (res.code === 0) {
                    message.success('删除标签成功');
                }
                return res;
            },
            onCancel() {}
        });
    }

    render() {
        const { modalType, modalInitialValue, modalLoading } = this.state;
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
                                    <Card
                                        hoverable
                                        className="tag-card"
                                        actions={[
                                            <a key="edit" onClick={() => this.handleTagEditClick(item)}>编辑</a>,
                                            <a key="delete" onClick={() => this.handleTagDelClick(item)}>删除</a>
                                        ]}
                                    >
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
                    modalType={modalType}
                    loading={modalLoading}
                    initialValue={modalInitialValue}
                    handleModalVisible={this.handleModalVisible}
                    handleOk={this.handleTagSave}
                />
            </div>
        ) : <PageLoading />;
    }
}

export default connect((state: AppState) => {
    return {
        tagsList: state.tags.tagsList,
        isLoadingTagData: state.tags.isLoadingTagData
    };
}, {
    getTags,
    addTag,
    updateTag,
    deleteTag
})(Tags);
