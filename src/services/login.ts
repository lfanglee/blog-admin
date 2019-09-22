import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import history from '@/utils/history';

export interface LoginParams {
    username: string;
    password: string;
}

export interface UpdateAdminParams {
    username: string;
    name: string;
    slogan: string;
    gravatar: string;
}

export interface UpdatePassword {
    username: string;
    oldPass: string;
    newPass: string;
}

const redirectToErrorPage = (status: number) => {
    history.push('/test');
};

export async function login(params: LoginParams, config: AxiosRequestConfig = {}): Promise<Ajax.AjaxResponse> {
    const res: AxiosResponse = await request.post<LoginParams>('/login', params, config);
    return res.data;
}

export async function updateAdmin(
    params: UpdateAdminParams,
    config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<UpdateAdminParams>> {
    const res: AxiosResponse = await request.put<UpdateAdminParams>('/auth', params, config);
    return res.data;
}

export async function updatePassword(
    params: UpdatePassword,
    config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<UpdateAdminParams>> {
    const res: AxiosResponse = await request.patch<UpdatePassword>('/auth', params, config);
    return res.data;
}
