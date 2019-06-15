import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface GetArticleListParams {
    pageSize?: number;
    pageNo?: number;
    keyword?: string;
    state?: 1 | 2;
    publish?: 1 | 2;
    tag?: string;  // 标签ID列表
}

export interface GetArticleDetailParams {
    id: string;
}

export type DeleteArticleParams = GetArticleDetailParams;

export interface PostArticleParams {
    title: string;
    keyword?: string;
    content: string;
    descript?: string;
    thumb?: string;
    state?: 1 | 2;
    publish?: 1 | 2;
    type?: number;
    tags?: string;  // 标签ID列表
}

export type PatchArticleParams = Partial<PostArticleParams> & {
    id: string;
};

/**
 * 获取文章列表
 * @param pageSize 分页大小
 * @param pageNo 分页页数
 * @param keyword 关键词
 * @param state 文章状态
 * @param publish 发布状态
 * @param tag 标签
 */
export async function getArticleList(
    params: GetArticleListParams = {}, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<{
    list: Article[],
    pagination: Pagination
}>> {
    const res: AxiosResponse = await request.get<GetArticleListParams>('/article', {
        params,
        ...config
    });
    return res.data;
}

/**
 * 获取文章详情
 * @param id 文章id
 */
export async function getArticleDetail(
    params: GetArticleDetailParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<Article>> {
    const res: AxiosResponse = await request.get<GetArticleDetailParams>(`/article/${params.id}`, {
        ...config
    });
    return res.data;
}

/**
 * 上传文章
 * @param title 文章标题
 * @param keyword 关键词
 * @param content 文章内容
 * @param descript 文章简述
 * @param thumb 缩略图
 * @param state 文章状态 1：发布， 2：草稿
 * @param publish 是否发布 1：公开， 2：未公开
 * @param type 文章类别 1：code
 * @param tags 标签ID列表
 */
export async function uploadArticle(
    params: PostArticleParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<Article>> {
    const res: AxiosResponse = await request.post<PostArticleParams>('/article', {
        ...params
    }, {
        ...config
    });
    return res.data;
}

/**
 * 更新文章（只传需要更新的参数）
 * @param id 文章ID
 * @param title 文章标题
 * @param keyword 关键词
 * @param content 文章内容
 * @param descript 文章简述
 * @param thumb 缩略图
 * @param state 文章状态 1：发布， 2：草稿
 * @param publish 是否发布 1：公开， 2：未公开
 * @param type 文章类别 1：code
 * @param tags 标签ID列表
 */
export async function updateArticle(
    params: PatchArticleParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<Article>> {
    const res: AxiosResponse = await request.patch<PatchArticleParams>(`/article/${params.id}`, {
        ...params
    }, {
        ...config
    });
    return res.data;
}

/**
 * 删除文章
 * @param id 文章ID
 */
export async function deleteArticle(
    params: DeleteArticleParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<null>> {
    const res: AxiosResponse = await request.delete(`/article/${params.id}`, {
        ...config
    });
    return res.data;
}
