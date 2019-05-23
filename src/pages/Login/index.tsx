import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import BaseComponent from '@/pages/components/BaseComponent';
import { AppState } from '@/store';
import login from '@/store/login/thunks';
import './index.scss';

interface Props {
    isLoginIng: boolean,
    isLoginEd: boolean,
    username: string,
    login: any,
}

interface State {
    showErrorAlert: boolean,
    loginErrorMsg: string
}

interface FormValue {
    username: string,
    password: string
}

@(withRouter as any)
@(connect((state: AppState) => {
    return {
        username: state.login.username,
        isLoginIng: state.login.isLoginIng,
        isLoginEd: state.login.isLoginEd
    };
}, {
    login
}) as any)
@(Form.create({}) as any)
export default class Login extends BaseComponent<Props & RouteComponentProps & FormComponentProps, State> {
    state = {
        showErrorAlert: false,
        loginErrorMsg: 'Error'
    }

    componentWillMount() {
        if (this.props.isLoginEd) {
            this.props.history.push('/home');
        }
    }

    private login = async (value: FormValue) => {
        if (this.props.isLoginIng) {
            return;
        }
        const { username, password } = value;
        const res: Ajax.AjaxResponse = await this.props.login(username, password);
        if (this.props.isLoginEd) {
            window.localStorage.setItem('TOKEN', JSON.stringify(res.data));
            const path = this.props.history.location.state && this.props.history.location.state.from.pathname;
            this.props.history.push(path || '/home');
        } else {
            this.setState({
                showErrorAlert: true,
                loginErrorMsg: res.message
            });
        }
    }

    private handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.form.validateFields((err, value: FormValue) => {
            if (!err) {
                this.login(value);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <DocumentTitle title="登陆">
                <div className="c-page-login">
                    <div className="login-layout-top">
                        <img src={require('../../images/logo.png')} alt="logo" />
                        <span className="header">blog-admin login</span>
                    </div>
                    <Form onSubmit={this.handleFormSubmit} className="login-form">
                        { this.state.showErrorAlert ? <Alert className="login-alert" message={this.state.loginErrorMsg} type="error" showIcon /> : '' }
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                    placeholder="username"
                                    size="large"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                    type="password"
                                    placeholder="password"
                                    size="large"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </DocumentTitle>
        );
    }
}
