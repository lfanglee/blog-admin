import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL, ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAIL } from '@/constants';

export interface Tags {
    tagsList: Tag[];
    isLoadingTagsListData: boolean;
    isAddingTag: boolean;
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

export interface AddTagAction {
    type: ADD_TAG_REQUEST;
}

export interface AddTagSuccessAction {
    type: ADD_TAG_SUCCESS;
    payload: {
        tag: Tag;
    };
}

export interface AddTagFailAction {
    type: ADD_TAG_FAIL;
}

export type AddTagActionTypes = AddTagAction | AddTagSuccessAction | AddTagFailAction;
