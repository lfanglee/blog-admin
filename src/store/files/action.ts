import { FileListActionTypes } from './types';
import * as actionTypes from '@/constants';

export function getFileList(): FileListActionTypes {
    return {
        type: actionTypes.GET_FILE_LIST_REQUEST
    };
}

export function getFileListSuccess(list: MFile[], pagination: Pagination): FileListActionTypes {
    return {
        type: actionTypes.GET_FILE_LIST_SUCCESS,
        payload: {
            list,
            pagination
        }
    };
}

export function getFileListFail(): FileListActionTypes {
    return {
        type: actionTypes.GET_FILE_LIST_FAIL
    };
}
