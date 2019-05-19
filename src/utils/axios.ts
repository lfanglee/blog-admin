import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import * as queryString from 'query-string';
import { notification } from 'antd';

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
});

instance.interceptors.request.use((data: AxiosRequestConfig) => {
    if (['post', 'put', 'delete', 'patch'].includes(data.method)) {
        data.data = queryString.stringify(data.data);
    }
    return data;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((res: AxiosResponse) => {
    return res;
}, (error: AxiosError) => {
    if (!error.response) {
        if (error.message.includes('timeout')) {
            notification.error({
                message: '请求超时，请检查网络是否连接正常',
                duration: 5
            });
        } else {
            notification.error({
                message: '请求失败，请检查网络是否已连接',
                duration: 5
            });
        }
    }
    return Promise.reject(error);
});

export default instance;
