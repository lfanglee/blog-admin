import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';

import BaseComponent from '@/pages/components/BaseComponent';
import { updatePassword } from '@/store/login/thunks';
import { AccountProps, AccountState } from './interface';
import { AppState } from '@/store';
import './index.scss';

class Account extends BaseComponent<AccountProps, AccountState> {
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
        const { form, updatePassword: updatePasswordReq } = this.props;
        form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            const { oldPassword: oldPass, password: newPass } = values;
            const res = await updatePasswordReq({
                oldPass,
                newPass
            });
            if (res.code === 0) {
                window.localStorage.setItem('TOKEN', JSON.stringify(res.data));
                this.$message.success('更新密码成功！');
                form.resetFields();
            }
        });
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
        const { form, isLoading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="c-comp-setting-account">
                <div className="left-panel">
                    <Form>
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
                                        required: true,
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(<Input placeholder="新密码" type="password" />)}
                        </Form.Item>

                        <Form.Item label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
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
                                loading={isLoading}
                                onClick={this.handleSubmit}
                            >确认修改</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect((state: AppState) => ({
    isLoading: state.login.isLoading,
    username: state.login.username
}), {
    updatePassword
})(Form.create()(Account));
