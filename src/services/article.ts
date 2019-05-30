import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface GetArticleListParams {
    pageSize?: number,
    pageNo?: number,
    keyword?: string,
    state?: number,
    publish?: number,
    tag?: string
}

/**
 * 获取文章列表
 * @query pageSize 分页大小
 * @query pageNo 分页页数
 * @query keyword 关键词
 * @query state 文章状态
 * @query publish 发布状态
 * @query tag 标签
 */
export async function getArticleList(
    params: GetArticleListParams = {}, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse> {
    const res: AxiosResponse = await request.get<GetArticleListParams>('/article', {
        params,
        ...config
    });
    return res.data;
}
