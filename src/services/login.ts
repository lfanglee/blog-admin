import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import history from '@/utils/history';

export interface LoginParams {
    username?: string,
    password?: string
}

const redirectToErrorPage = (status: number) => {
    history.push('/test');
};

export async function login(params: LoginParams = {}, config: AxiosRequestConfig = {}): Promise<Ajax.AjaxResponse> {
    const res: AxiosResponse = await request.post<LoginParams>('/login', params, config);
    return res.data;
}
