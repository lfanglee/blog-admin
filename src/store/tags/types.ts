import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL } from '@/constants';

export interface Tags {
    tagsList: Tag[];
    isLoadingTagsListData: boolean;
}

export interface GetTagsAction {
    type: GET_TAGS_REQUEST;
}

export interface GetTagsSuccessAction {
    type: GET_TAGS_SUCCESS;
    payload: {
        list: Tag[];
    };
}

export interface GetTagsFailAction {
    type: GET_TAGS_FAIL;
}

export type GetTagsActionTypes = GetTagsAction | GetTagsSuccessAction | GetTagsFailAction;
