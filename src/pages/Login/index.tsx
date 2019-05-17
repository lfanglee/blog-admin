import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import BaseComponent from '@/pages/components/BaseComponent';
import { AppState } from '@/store';
import login from '@/store/login/thunks';
import { History } from 'history';
import './index.scss';

interface Props extends FormComponentProps {
    isLoginIng: boolean,
    isLoginEd: boolean,
    username: string,
    login: typeof login,
    history: History
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
export default class Login extends BaseComponent<Props> {
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
        const res = await this.props.login(username, password);
        if (this.props.isLoginEd) {
            this.props.history.push('/home');
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
            <div className="c-page-login">
                Login
                <Form onSubmit={this.handleFormSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                                placeholder="username"
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
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
