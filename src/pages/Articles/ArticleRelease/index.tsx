import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { PageHeader, Button, Card, Form, Input, Icon, Row, Col, Switch } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import BaseComponent from '@/pages/components/BaseComponent';
import './index.scss';

interface Props {

}

interface State {
    articleId: string
}

@(withRouter as any)
@(connect() as any)
@(Form.create<Props & FormComponentProps & RouteComponentProps>({}) as any)
export default class ArticleRelease extends BaseComponent<Props & FormComponentProps & RouteComponentProps, State> {
    state = {
        articleId: ''
    }

    fetchArticleData = async (articleId: string) => {

    }

    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        return <Form className="article-base-info-input" layout="inline">
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item>
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
                <Col span={8}>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ message: '请输入文章标签' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="请输入文章标签"
                            />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
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
        return (
            <div className="page c-page-article-release">
                <PageHeader title="文章发布" />
                <Card bordered={false}>
                    {this.renderForm()}
                </Card>
                <Card className="page-content" bordered={false}>
                    <Input.TextArea defaultValue="# 请输入文章内容" autosize={{ minRows: 20 }} />
                    <Row className="article-release-options-panel">
                        <Col span={12}>
                            是否公开：
                            <Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                                defaultChecked
                            />
                        </Col>
                        <Col className="artile-release-btn-group" span={12}>
                            <Button>存为草稿</Button>
                            <Button type="primary">发布</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}
