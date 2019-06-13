import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Card, Col, Form, Input, Icon, PageHeader, Row, Select, Switch, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import qs from 'query-string';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { setArticleDetail } from '@/store/article/action';
import { getArticleDetail } from '@/store/article/thunks';
import { getTags } from '@/store/tags/thunks';
import { GetArticleDetailParams, uploadArticle, updateArticle } from '@/services/article';
import './index.scss';
import { GetTagsParams, updateTag } from '@/services/tag';

interface Props {
    // props from redux state
    articleDetail: Article;
    isLoadingArticleData: boolean;
    tagsList: Tag[];
    // props from redux dispatch
    getArticleDetail: (params: GetArticleDetailParams) => Promise<Ajax.AjaxResponse<Article>>;
    setArticleDetail: (detail: Partial<Article>) => Partial<Article>;
    getTags: (params?: GetTagsParams) => Promise<Ajax.AjaxResponse>
}

type ArticleReleaseComProps = Props & FormComponentProps & RouteComponentProps<{
    id: string
}>;

interface State {
    inited: boolean;
    loading: boolean;
    articleId: string;
}

const { Option } = Select;

@(withRouter as any)
@(connect((state: AppState) => {
    return {
        articleDetail: state.article.detail,
        isLoadingArticleData: state.article.isLoadingArticleData,
        tagsList: state.tags.tagsList
    };
}, {
    getArticleDetail,
    setArticleDetail,
    getTags
}) as any)
@(Form.create<ArticleReleaseComProps>({
    onFieldsChange(props: ArticleReleaseComProps, changedFields, allFileds) {
        // console.log(props, changedFields, allFileds);
    },
    mapPropsToFields(props: ArticleReleaseComProps) {
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
    onValuesChange(props: ArticleReleaseComProps, _values, allValues) {
        props.setArticleDetail(Object.assign({}, allValues, {
            publish: allValues.publish ? 1 : 2,
            tags: allValues.tags.map((tagId: string) => props.tagsList.filter((item: Tag) => item.id === tagId)[0])
        }));
    }
}) as any)
export default class ArticleRelease extends BaseComponent<ArticleReleaseComProps, State> {
    private query = qs.parse(this.props.location.search);

    state = {
        inited: false,
        loading: false,
        articleId: this.query.id
    };

    async componentWillMount() {
        if (this.state.articleId) {
            await Promise.all([
                this.fetchArticleData(),
                this.props.getTags()
            ]);
        } else {
            await this.props.getTags();
        }
        this.setState({ inited: true });
    }

    fetchArticleData = async () => {
        const res = await this.props.getArticleDetail({
            id: this.state.articleId
        });
        return res;
    }

    uploadArticle = async () => {
        const res: Ajax.AjaxResponse<Article> = await uploadArticle({
            ...this.props.articleDetail,
            tags: this.props.articleDetail.tags.map((i: Tag) => i.id)
        });
        this.props.setArticleDetail(res.data);
    }

    updateArticle = async () => {
        const res: Ajax.AjaxResponse<Article> = await updateArticle({
            ...this.props.articleDetail,
            tags: this.props.articleDetail.tags.map((i: Tag) => i.id)
        });
        this.props.setArticleDetail(res.data);
    }

    handleArticleSave = (state: 1 | 2) => {
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const req = this.props.articleDetail.id ? updateArticle : uploadArticle;
                req({
                    state,
                    ...value,
                    id: this.props.articleDetail.id,
                    publish: value.publish ? 1 : 2
                }).then(res => {
                    console.log(res);
                });
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
                                placeholder="请输入文章标题（必须）"
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
                            <Select mode="multiple" placeholder="请选择文章的标签">
                                {
                                    this.props.tagsList
                                        .map((item: Tag) => <Option key={item.id} value={item.id}>{item.name}</Option>)
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
                <PageHeader title="文章发布" />
                <Spin spinning={this.state.loading}>
                    <Form layout="inline" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Card bordered={false}>
                            {this.renderForm()}
                        </Card>
                        <Card className="page-content" bordered={false}>
                            <Row className="article-content-input">
                                <Col span={24}>
                                    <Form.Item>
                                        {getFieldDecorator('content', {
                                            rules: [{ required: true, message: '文章内容不可为空' }]
                                        })(
                                            <Input.TextArea
                                                autosize={{ minRows: 20 }}
                                            />
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
                                    <Button onClick={() => this.handleArticleSave(2)}>存为草稿</Button>
                                    <Button type="primary" onClick={() => this.handleArticleSave(1)}>发布</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Spin>
            </div>
        ) : <PageLoading />;
    }
}
