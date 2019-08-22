import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import AvatarView from './AvatarView';
import { updateAdmin } from '@/store/login/thunks';
import { AccountProps, AccountState } from './interface';
import { AppState } from '@/store';
import './index.scss';

class Account extends React.PureComponent<AccountProps, AccountState> {
    state = {
        confirmDirty: false
    }

    handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState((preState: AccountState) => ({
            confirmDirty: preState.confirmDirty || !!value
        }));
    };

    handleSubmit = (e: React.FormEvent<any>) => {
        // TODO
    }

    validateToNextPassword = (
        rule: object,
        value: string,
        callback: () => void
    ) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (
        rule: object,
        value: string,
        callback: (para?: string) => void
    ) => {
        const { form } = this.props;
        const oldPassword = form.getFieldValue('password');
        if (oldPassword && value !== oldPassword) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="c-comp-setting-account">
                <div className="left-panel">
                    <Form>
                        <Form.Item label="昵称">
                            {getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入昵称!'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="个性签名">
                            {getFieldDecorator('slogan', {
                                initialValue: ''
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="原密码">
                            {getFieldDecorator('oldPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入旧密码'
                                    }
                                ]
                            })(<Input type="password" placeholder="原密码" />)}
                        </Form.Item>

                        <Form.Item label="新密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input placeholder="新密码" type="password" />)}
                        </Form.Item>

                        <Form.Item label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="确认密码"
                                    type="password"
                                    onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={this.handleSubmit}
                            >确认修改</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="right-panel">
                    <AvatarView
                        username="lifang"
                        avatar="https://admin.lfanglee.cn/uploads/2019-8-9/15653646271356297.jpg"
                    />
                </div>
            </div>
        );
    }
}

export default connect((state: AppState) => ({
    isLoading: state.login.isLoading,
    name: state.login.name,
    slogan: state.login.slogan
}), {
    updateAdmin
})(Form.create()(Account));
