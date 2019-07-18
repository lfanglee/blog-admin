import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { getFileList as getFileListService, GetFileListParams } from '@/services/file';
import { Files } from './types';
import {
    getFileList as getFileListRequest,
    getFileListFail,
    getFileListSuccess
} from './action';

export const getFileList = (
    params: GetFileListParams
): ThunkAction<void, Files, null, Action<string>> => async (
    dispatch: ThunkDispatch<Files, null, Action<string>>
) => {
    dispatch(getFileListRequest());
    const res: Ajax.AjaxResponse<{
        list: MFile[],
        pagination: Pagination
    }> = await getFileListService(params);

    if (+res.code === 0) {
        const { list, pagination } = res.data;
        dispatch(getFileListSuccess(list, pagination));
    } else {
        dispatch(getFileListFail());
    }
    return res;
};
