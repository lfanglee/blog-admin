import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL, GET_TYPES_REQUEST, GET_TYPES_SUCCESS, GET_TYPES_FAIL } from '@/constants';

export interface Tags {
    tagsList: Tag[];
    typesList: Type[];
    isLoadingTagsListData: boolean;
    isLoadingTypesListData: boolean;
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

export interface GetTypesAction {
    type: GET_TYPES_REQUEST;
}

export interface GetTypesSuccessAction {
    type: GET_TYPES_SUCCESS;
    payload: {
        list: Type[];
    };
}

export interface GetTypesFailAction {
    type: GET_TYPES_FAIL;
}

export type GetTypesActionTypes = GetTypesAction | GetTypesSuccessAction | GetTypesFailAction;
