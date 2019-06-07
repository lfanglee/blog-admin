import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Card, Form, Row, Col, Button, Select, Input, Icon, Switch, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import qs from 'query-string';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { setArticleContent, setPublishState, setArticleDetail } from '@/store/article/action';
import { getArticleDetail } from '@/store/article/thunks';
import { GetArticleDetailParams, uploadArticle, updateArticle } from '@/services/article';
import './index.scss';

interface Props {
    // props from redux state
    articleDetail: Article;
    isLoadingArticleData: boolean;
    // props from redux dispatch
    getArticleDetail: (params: GetArticleDetailParams) => Promise<Ajax.AjaxResponse<Article>>;
    setArticleContent: (content: string) => void,
    setPublishState: (state: boolean) => void,
    setArticleDetail: (detail: Partial<Article>) => Partial<Article>
}

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
        isLoadingArticleData: state.article.isLoadingArticleData
    };
}, {
    getArticleDetail,
    setArticleContent,
    setPublishState,
    setArticleDetail
}) as any)
@(Form.create<Props & FormComponentProps & RouteComponentProps>({}) as any)
export default class ArticleRelease extends BaseComponent<Props & FormComponentProps & RouteComponentProps<{
    id: string
}>, State> {
    private query = qs.parse(this.props.location.search);

    state = {
        inited: false,
        loading: false,
        articleId: this.query.id
    };

    async componentWillMount() {
        if (this.state.articleId) {
            await this.fetchArticleData();
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

    handlePublicStateChange = (state: boolean) => {
        this.props.setPublishState(state);
    }

    handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.setArticleContent(event.target.value);
    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        const { title, tags = [], keyword } = this.props.articleDetail;
        return <Form className="article-base-info-input" layout="inline">
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章标题' }],
                            initialValue: title
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
                            rules: [{ required: false, message: '请输入文章关键词' }],
                            initialValue: keyword
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
                            rules: [{ message: '请输入文章分类' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章分类"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="文章标签">
                        {getFieldDecorator('tags', {
                            rules: [{ required: false, message: '请输入文章标签', type: 'array' }],
                            initialValue: tags.map(i => i.id)
                        })(
                            <Select mode="multiple" placeholder="请选择文章的标签">
                                {tags.map((item: Tag) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
            </Row>
        </Form>;
    }

    render() {
        const { content, publish } = this.props.articleDetail;
        return this.state.inited ? (
            <div className="page c-page-article-release">
                <PageHeader title="文章发布" />
                <Spin spinning={this.state.loading}>
                    <Card bordered={false}>
                        {this.renderForm()}
                    </Card>
                    <Card className="page-content" bordered={false}>
                        <Input.TextArea
                            autosize={{ minRows: 20 }}
                            value={content}
                            onChange={this.handleContentChange}
                        />
                        <Row className="article-release-options-panel">
                            <Col span={12}>
                                是否公开：
                                <Switch
                                    checkedChildren={<Icon type="check" />}
                                    unCheckedChildren={<Icon type="close" />}
                                    checked={+publish === 1}
                                    onChange={this.handlePublicStateChange}
                                />
                            </Col>
                            <Col className="artile-release-btn-group" span={12}>
                                <Button>存为草稿</Button>
                                <Button type="primary">发布</Button>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </div>
        ) : <PageLoading />;
    }
}
