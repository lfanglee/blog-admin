import request from '@/utils/axios';
import { AxiosResponse } from 'axios';
import { browserHistory } from 'react-router-dom';

const redirectToErrorPage = (status: number) => {
    router.push(`error-${status}`);
};
const getErrorResponse = (status: number) => ({
    code: 0,
    message: `请求出现了${status}错误`,
    data: null
});

export async function login(params = {}): Promise<Ajax.AjaxResponse> {
    try {
        const res: AxiosResponse = await request.post('/login');
        return res.data;
    } catch (error) {
        error.response.status === 404 ? redirectToErrorPage(404) : redirectToErrorPage(500);
        return getErrorResponse(error.response.status);
    }
}
