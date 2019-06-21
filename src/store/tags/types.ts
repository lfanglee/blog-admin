import * as actionTypes from '@/constants';

export interface Tags {
    tagsList: Tag[];
    isLoadingTagData: boolean;
}

export interface GetTagsAction {
    type: actionTypes.GET_TAGS_REQUEST;
}

export interface GetTagsSuccessAction {
    type: actionTypes.GET_TAGS_SUCCESS;
    payload: {
        list: Tag[];
    };
}

export interface GetTagsFailAction {
    type: actionTypes.GET_TAGS_FAIL;
}

export type GetTagsActionTypes = GetTagsAction | GetTagsSuccessAction | GetTagsFailAction;

export interface AddTagAction {
    type: actionTypes.ADD_TAG_REQUEST;
}

export interface AddTagSuccessAction {
    type: actionTypes.ADD_TAG_SUCCESS;
    payload: {
        tag: Tag;
    };
}

export interface AddTagFailAction {
    type: actionTypes.ADD_TAG_FAIL;
}

export type AddTagActionTypes = AddTagAction | AddTagSuccessAction | AddTagFailAction;

export interface UpdateTagAction {
    type: actionTypes.UPDATE_TAG_REQUEST;
}

export interface UpdateTagSuccessAction {
    type: actionTypes.UPDATE_TAG_SUCCESS;
    payload: {
        tag: Tag;
    };
}

export interface UpdateTagFailAction {
    type: actionTypes.UPDATE_TAG_FAIL;
}

export type UpdateTagActionTypes = UpdateTagAction | UpdateTagSuccessAction | UpdateTagFailAction;

export interface DeleteTagAction {
    type: actionTypes.DELETE_TAG_REQUEST;
}

export interface DeleteTagSuccessAction {
    type: actionTypes.DELETE_TAG_SUCCESS;
    payload: {
        id: string;
    };
}

export interface DeleteTagFailAction {
    type: actionTypes.DELETE_TAG_FAIL;
}

export type DeleteTagActionTypes = DeleteTagAction | DeleteTagSuccessAction | DeleteTagFailAction;
