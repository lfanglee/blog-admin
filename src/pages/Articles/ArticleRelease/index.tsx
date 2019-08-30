import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Prompt } from 'react-router';
import { Button, Card, Col, Form, Input, Icon, PageHeader, Row, Select, Switch, Spin, message, Divider, Modal } from 'antd';
import Editor from 'for-editor';
import qs from 'query-string';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { setArticleDetail, resetArticleDetail } from '@/store/article/action';
import { getArticleDetail, addArticle, updateArticle } from '@/store/article/thunks';
import { getTags, addTag } from '@/store/tags/thunks';
import { State, Props, NewTag, NewTagModalProps } from './interface';
import './index.scss';

const { Option } = Select;

const CreateTagForm = Form.create<NewTagModalProps>()((props: NewTagModalProps) => {
    const { modalVisible, form, handleModalVisible, handleOk: handleOkClick } = props;
    const handleOk = () => {
        form.validateFields((err, value: NewTag) => {
            if (err) { return; }
            form.resetFields();
            handleOkClick(value);
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

const windowUnloadListener = (e: Event) => {
    const tip = '文章未保存，确定离开吗？';
    e.preventDefault();
    ((e || window.event) as any).returnValue = tip;
    return tip;
};

class ArticleRelease extends BaseComponent<Props, State> {
    private query = qs.parse(this.props.location.search);

    state: State = {
        inited: false,
        articleId: this.query.id,
        createTagModalVisible: false,
        isArticleSubmited: false
    };

    async componentDidMount() {
        if (this.state.articleId) {
            await Promise.all([
                this.fetchArticleData(),
                this.props.getTags()
            ]);
        } else {
            await this.props.getTags();
        }
        this.setState({ inited: true });
        window.addEventListener('beforeunload', windowUnloadListener);
    }

    componentWillUnmount() {
        this.props.resetArticleDetail();
        window.removeEventListener('beforeunload', windowUnloadListener);
    }

    fetchArticleData = async () => {
        const res = await this.props.getArticleDetail({
            id: this.state.articleId
        });
        return res;
    }

    handleAddTagClick = () => {
        this.setState({ createTagModalVisible: true });
    }

    handleAddTag = async (tag: NewTag) => {
        this.handleCreateTagModalVisible();
        const res: Ajax.AjaxResponse<Tag> = await this.props.addTag({
            name: tag.tagName,
            descript: tag.tagName
        });
        if (res.code === 0) {
            message.success('新增标签成功！');
        }
    }

    handleCreateTagModalVisible = () => {
        this.setState({ createTagModalVisible: false });
    }

    handleArticleSave = (state: 1 | 2) => {
        const { isLoadingArticleData, updateArticle: updateArticleReq, addArticle: addArticleReq } = this.props;
        if (isLoadingArticleData) {
            return;
        }
        this.props.form.validateFields(async (err, value) => {
            if (!err) {
                const req = this.props.articleDetail.id ? updateArticleReq : addArticleReq;
                const res = await req({
                    state,
                    ...value,
                    id: this.props.articleDetail.id,
                    publish: value.publish ? 1 : 2,
                    tags: value.tags.join(',')
                });
                if (res.code === 0) {
                    message.success(`文章${this.props.articleDetail.id ? '更新' : '发布'}成功`);
                    this.setState({ isArticleSubmited: true }, () => {
                        this.props.history.replace({
                            search: `?${qs.stringify({
                                id: res.data.id
                            })}`
                        });
                    });
                }
            }
        });
    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        return <div className="article-base-info-input">
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章标题（必须）"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="关键词">
                        {getFieldDecorator('keyword', {
                            rules: [{ required: false, message: '请输入文章关键词' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章关键词（以逗号分隔）"
                            />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: 12 }}>
                <Col span={12}>
                    <Form.Item label="文章分类">
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请输入文章分类' }]
                        })(
                            <Select placeholder="请选择文章分类">
                                <Option value={1}>code</Option>
                                <Option value={2}>杂谈</Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="文章标签">
                        {getFieldDecorator('tags', {
                            rules: [{ required: false, message: '请输入文章标签', type: 'array' }]
                        })(
                            <Select
                                mode="multiple"
                                placeholder="请选择文章的标签"
                                notFoundContent={this.props.isLoadingTagData ? <Spin size="small" /> : null}
                                dropdownRender={(menu: React.ReactNode) => (
                                    <div>
                                        <div
                                            style={{ padding: '8px', cursor: 'pointer', textAlign: 'center' }}
                                            onMouseDown={e => e.preventDefault()}
                                            onClick={this.handleAddTagClick}
                                        >
                                            <Icon type="plus" /> 新增标签
                                        </div>
                                        <Divider style={{ margin: '4px 0' }} />
                                        {menu}
                                    </div>
                                )}
                            >
                                {this.props.tagsList.length
                                    ? this.props.tagsList
                                        .map((item: Tag) => <Option key={item.id} value={item.id}>{item.name}</Option>)
                                    : null
                                }
                            </Select>
                        )}
                    </Form.Item>
                </Col>
            </Row>
        </div>;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return this.state.inited ? (
            <div className="page c-page-article-release">
                <Prompt
                    when={!this.state.isArticleSubmited}
                    message={location => '文章未保存，确定离开吗？'}
                />
                <PageHeader title="文章发布" />
                <Spin spinning={this.props.isLoadingArticleData}>
                    <Form layout="inline" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Card bordered={false}>
                            {this.renderForm()}
                        </Card>
                        <div className="page-content">
                            <Row className="article-content-input">
                                <Col span={24}>
                                    <Form.Item>
                                        {getFieldDecorator('content', {
                                            rules: [{ required: true, message: '文章内容不可为空' }]
                                        })(
                                            <Editor height="100%" />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="article-release-options-panel">
                                <Col span={12}>
                                    <Form.Item label="是否公开：">
                                        {getFieldDecorator('publish', {
                                            valuePropName: 'checked'
                                        })(
                                            <Switch
                                                checkedChildren={<Icon type="check" />}
                                                unCheckedChildren={<Icon type="close" />}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col className="artile-release-btn-group" span={12}>
                                    <Button onClick={() => this.handleArticleSave(2)}>保存草稿</Button>
                                    <Button type="primary" onClick={() => this.handleArticleSave(1)}>发布</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Spin>
                <CreateTagForm
                    modalVisible={this.state.createTagModalVisible}
                    handleModalVisible={this.handleCreateTagModalVisible}
                    handleOk={this.handleAddTag}
                />
            </div>
        ) : <PageLoading />;
    }
}

export default connect((state: AppState) => {
    return {
        articleDetail: state.article.detail,
        isLoadingArticleData: state.article.isLoadingArticleData,
        tagsList: state.tags.tagsList,
        isLoadingTagData: state.tags.isLoadingTagData
    };
}, {
    getArticleDetail,
    addArticle,
    updateArticle,
    setArticleDetail,
    resetArticleDetail,
    getTags,
    addTag
})(Form.create<Props>({
    onFieldsChange(props: Props, changedFields, allFileds) {
        // console.log(props, changedFields, allFileds);
    },
    mapPropsToFields(props: Props) {
        const { title, keyword, type, tags = [], content, publish = 0 } = props.articleDetail;
        const createFormField = (prop: any) => Form.createFormField({
            value: prop
        });
        return {
            title: createFormField(title),
            keyword: createFormField(keyword),
            type: createFormField(type),
            tags: createFormField(tags.map((i: Tag) => i.id)),
            content: createFormField(content),
            publish: createFormField([0, 1].includes(+publish))
        };
    },
    onValuesChange(props: Props, _values, allValues) {
        console.log(allValues);
        props.setArticleDetail(Object.assign({}, allValues, {
            publish: allValues.publish ? 1 : 2,
            tags: allValues.tags.map((tagId: string) => props.tagsList.filter((item: Tag) => item.id === tagId)[0])
        }));
    }
})(withRouter(ArticleRelease)));
