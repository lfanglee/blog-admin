import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL,
    ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAIL
} from '@/constants';
import { AddTagActionTypes, GetTagsActionTypes } from './types';

export function getTags(): GetTagsActionTypes {
    return {
        type: GET_TAGS_REQUEST
    };
}

export function getTagsSuccess(list: Tag[]): GetTagsActionTypes {
    return {
        type: GET_TAGS_SUCCESS,
        payload: {
            list
        }
    };
}

export function getTagsFail(): GetTagsActionTypes {
    return {
        type: GET_TAGS_FAIL
    };
}

export function addTag(): AddTagActionTypes {
    return {
        type: ADD_TAG_REQUEST
    };
}

export function addTagSuccess(tag: Tag): AddTagActionTypes {
    return {
        type: ADD_TAG_SUCCESS,
        payload: {
            tag
        }
    };
}

export function addTagFail(): AddTagActionTypes {
    return {
        type: ADD_TAG_FAIL
    };
}
