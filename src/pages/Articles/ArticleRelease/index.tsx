import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PageHeader, Card, Input, Form, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import BaseComponent from '@/pages/components/BaseComponent';

interface Props {

}

@(withRouter as any)
@(connect() as any)
@(Form.create({}) as any)
export default class ArticleRelease extends BaseComponent<Props & FormComponentProps> {
    renderForm = () => {
        const { getFieldDecorator } = this.props.form;
        return <Form layout="inline">
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
        </Form>;
    }

    render() {
        return (
            <div className="page c-page-article-release">
                <PageHeader title="文章列表" />
                <Card bordered={false}>
                    {this.renderForm()}
                </Card>
            </div>
        );
    }
}
