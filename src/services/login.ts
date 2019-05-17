import request from '@/utils/axios';
import { AxiosResponse } from 'axios';
import history from '@/utils/history';

export interface LoginParams {
    username?: string,
    password?: string
}

const redirectToErrorPage = (status: number) => {
    history.push('/test');
};
const getErrorResponse = (status: number) => ({
    code: 0,
    message: `请求出现了${status}错误`,
    data: null
});

export async function login(params: LoginParams = {}): Promise<Ajax.AjaxResponse> {
    try {
        const res: AxiosResponse = await request.post('/login', params);
        return res.data;
    } catch (error) {
        error.response.status === 404 ? redirectToErrorPage(404) : redirectToErrorPage(500);
        return getErrorResponse(error.response.status);
    }
}
