import * as actionTypes from '@/constants';

export interface Files {
    fileList: MFile[];
    pagination: Pagination;
    isLoadingListData: boolean;
}

export interface GetFileListAction {
    type: actionTypes.GET_FILE_LIST_REQUEST;
}

export interface GetFileListSuccessAction {
    type: actionTypes.GET_FILE_LIST_SUCCESS;
    payload: {
        list: MFile[];
        pagination: Pagination;
    }
}

export interface GetFileListFailAction {
    type: actionTypes.GET_FILE_LIST_FAIL;
}

export type FileListActionTypes = GetFileListAction | GetFileListSuccessAction | GetFileListFailAction;
