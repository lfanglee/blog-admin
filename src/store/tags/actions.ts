import * as actionTypes from '@/constants';
import { AddTagActionTypes, GetTagsActionTypes, UpdateTagActionTypes, DeleteTagActionTypes } from './types';

export function getTags(): GetTagsActionTypes {
    return {
        type: actionTypes.GET_TAGS_REQUEST
    };
}

export function getTagsSuccess(list: Tag[]): GetTagsActionTypes {
    return {
        type: actionTypes.GET_TAGS_SUCCESS,
        payload: {
            list
        }
    };
}

export function getTagsFail(): GetTagsActionTypes {
    return {
        type: actionTypes.GET_TAGS_FAIL
    };
}

export function addTag(): AddTagActionTypes {
    return {
        type: actionTypes.ADD_TAG_REQUEST
    };
}

export function addTagSuccess(tag: Tag): AddTagActionTypes {
    return {
        type: actionTypes.ADD_TAG_SUCCESS,
        payload: {
            tag
        }
    };
}

export function addTagFail(): AddTagActionTypes {
    return {
        type: actionTypes.ADD_TAG_FAIL
    };
}

export function updateTag(): UpdateTagActionTypes {
    return {
        type: actionTypes.UPDATE_TAG_REQUEST
    };
}

export function updateTagSuccess(tag: Tag): UpdateTagActionTypes {
    return {
        type: actionTypes.UPDATE_TAG_SUCCESS,
        payload: {
            tag
        }
    };
}

export function updateTagFail(): UpdateTagActionTypes {
    return {
        type: actionTypes.UPDATE_TAG_FAIL
    };
}

export function deleteTag(): DeleteTagActionTypes {
    return {
        type: actionTypes.DELETE_TAG_REQUEST
    };
}

export function deleteTagSuccess(tag: Tag): DeleteTagActionTypes {
    return {
        type: actionTypes.DELETE_TAG_SUCCESS,
        payload: {
            tag
        }
    };
}

export function deleteTagFail(): DeleteTagActionTypes {
    return {
        type: actionTypes.DELETE_TAG_FAIL
    };
}
