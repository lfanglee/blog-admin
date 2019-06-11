import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL } from '@/constants';
import { GetTagsAction, GetTagsSuccessAction, GetTagsFailAction } from './types';

export function getTags(): GetTagsAction {
    return {
        type: GET_TAGS_REQUEST
    };
}

export function getTagsSuccess(list: Tag[]): GetTagsSuccessAction {
    return {
        type: GET_TAGS_SUCCESS,
        payload: {
            list
        }
    };
}

export function getTagsFail(): GetTagsFailAction {
    return {
        type: GET_TAGS_FAIL
    };
}
