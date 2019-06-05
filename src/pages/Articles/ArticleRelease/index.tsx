import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Button, Card, Form, Input, Icon, Row, Col, Switch, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import qs from 'query-string';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getArticleDetail } from '@/store/article/thunks';
import { GetArticleDetailParams } from '@/services/article';
import './index.scss';
import { setArticleContent, setPublishState } from '@/store/article/action';

interface Props {
    // props from redux state
    articleDetail: Article;
    isLoadingArticleData: boolean;
    // props from redux dispatch
    getArticleDetail: (params: GetArticleDetailParams) => Promise<Ajax.AjaxResponse<Article>>;
    setArticleContent: (content: string) => void,
    setPublishState: (state: boolean) => void
}

interface State {
    inited: boolean;
    loading: boolean;
    articleId: string;
}

@(withRouter as any)
@(connect((state: AppState) => {
    return {
        articleDetail: state.article.detail,
        isLoadingArticleData: state.article.isLoadingArticleData
    };
}, {
    getArticleDetail,
    setArticleContent,
    setPublishState
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

    handlePublicStateChange = (state: boolean) => {
        this.props.setPublishState(state);
    }

    handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.setArticleContent(event.target.value);
    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        const { title, tags = [] } = this.props.articleDetail;
        return <Form className="article-base-info-input" layout="inline">
            <Row gutter={24}>
                <Col span={8}>
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
                <Col span={8}>
                    <Form.Item label="文章标签">
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入文章标签' }],
                            initialValue: tags.join(',')
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章标签"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="文章分类">
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入文章分类' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章分类"
                            />
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
