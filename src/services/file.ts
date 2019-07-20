import request from '@/utils/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface GetFileListParams {
    pageSize?: number;
    pageNo?: number;
}

export interface DeleteFileParams {
    id: string;
}

/**
 * 获取文件列表
 * @param pageSize 分页大小
 * @param pageNo 分页页数
 */
export async function getFileList(
    params: GetFileListParams = {}, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<{
    list: MFile[],
    pagination: Pagination
}>> {
    const res: AxiosResponse = await request.get<GetFileListParams>('/upload', {
        params,
        ...config
    });
    return res.data;
}

/**
 * 删除文件
 * @param id 文件ID
 */
export async function deleteFile(
    params: DeleteFileParams, config: AxiosRequestConfig = {}
): Promise<Ajax.AjaxResponse<null>> {
    const res: AxiosResponse = await request.delete(`/upload/${params.id}`, {
        ...config
    });
    return res.data;
}
