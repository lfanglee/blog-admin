import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import * as queryString from 'query-string';
import { notification } from 'antd';
import history from '@/utils/history';

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000
});

instance.interceptors.request.use((data: AxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem('TOKEN'));
    if (token && token.token && (1000 * token.activeTime) > Date.now()) {
        data.headers = {
            ...data.headers,
            Authorization: `TOKEN ${JSON.parse(localStorage.getItem('TOKEN')).token}`
        };
    } else {
        history.push({
            pathname: '/login',
            state: { from: history.location }
        });
    }
    if (['post', 'put', 'delete', 'patch'].includes(data.method)) {
        data.data = queryString.stringify(data.data);
    }
    return data;
}, (error: AxiosError) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((res: AxiosResponse) => {
    if (+res.data.code !== 0) {
        notification.error({
            message: res.data.message || '请求失败',
            duration: 5
        });
        if (+res.data.code === 401) {
            history.push({
                pathname: '/login',
                state: { from: history.location }
            });
        }
    }
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
    } else if (error.response && error.response.data) {
        notification.error({
            message: error.response.data,
            duration: 5
        });
        if (error.response.status === 401) {
            history.push({
                pathname: '/login',
                state: { from: history.location }
            });
        }
        return {
            data: error.response
        };
    } else {
        notification.error({
            message: error.message,
            duration: 5
        });
    }
    return {
        data: {
            code: 400,
            message: '请求失败, 发生了客户端错误'
        }
    };
});

export default instance;
