import { Files, FileListActionTypes } from './types';
import * as actionTypes from '@/constants';

const initialState: Files = {
    fileList: [],
    pagination: {
        total: 0,
        totalPage: 0,
        pageNo: 1,
        pageSize: 10
    },
    isLoadingListData: false
};

export default function articlesReducer(
    state: Files = initialState,
    action: FileListActionTypes
): Files {
    switch (action.type) {
        case actionTypes.GET_FILE_LIST_REQUEST:
            return {
                ...state,
                isLoadingListData: true
            };
        case actionTypes.GET_FILE_LIST_SUCCESS:
            return {
                ...state,
                isLoadingListData: false,
                fileList: action.payload.list,
                pagination: action.payload.pagination
            };
        case actionTypes.GET_FILE_LIST_FAIL:
            return {
                ...state,
                isLoadingListData: false,
                fileList: [],
                pagination: {
                    total: 0,
                    totalPage: 0,
                    pageNo: 1,
                    pageSize: 10
                }
            };
        default:
            return state;
    }
}
