import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface GetTagsParams {
    pageSize?: number;
    pageNo?: number;
}

export interface PostTagParams {
    name: string;
    descript: string;
}

export type PatchTagParams = PostTagParams & {
    id: string;
};

export interface DeleteTagParams {
    id: string;
}

/**
 * 获取标签列表
 * @param pageSize 页大小
 * @param pageNo 页码
 */
export async function getTags(
    params: GetTagsParams = {}, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<{
    tags: Tag[],
    pagination: Pagination
}>> {
    const res: AxiosResponse = await request.get<GetTagsParams>('/tag', {
        params,
        ...config
    });
    return res.data;
}

/**
 * 新建标签
 * @param name 标签名称
 * @param descript 标签描述
 */
export async function addTag(
    params: PostTagParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<Tag>> {
    const res: AxiosResponse = await request.post<PostTagParams>('/tag', {
        ...params
    }, {
        ...config
    });
    return res.data;
}

/**
 * 更新标签
 * @param id 标签ID
 * @param name 标签名称
 * @param descript 标签描述
 */
export async function updateTag(
    params: PatchTagParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<Tag>> {
    const res: AxiosResponse = await request.patch<PatchTagParams>(`/tag${params.id}`, {
        ...params
    }, {
        ...config
    });
    return res.data;
}

/**
 * 删除标签
 * @param id 标签ID
 */
export async function deleteTag(
    params: DeleteTagParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<null>> {
    const res: AxiosResponse = await request.delete(`/tag${params.id}`, {
        ...config
    });
    return res.data;
}
