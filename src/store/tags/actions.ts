import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL, GET_TYPES_REQUEST, GET_TYPES_SUCCESS, GET_TYPES_FAIL } from '@/constants';
import { GetTagsAction, GetTagsSuccessAction, GetTagsFailAction, GetTypesAction, GetTypesSuccessAction, GetTypesFailAction } from './types';

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

export function getTypes(): GetTypesAction {
    return {
        type: GET_TYPES_REQUEST
    };
}

export function getTypesSuccess(list: Type[]): GetTypesSuccessAction {
    return {
        type: GET_TYPES_SUCCESS,
        payload: {
            list
        }
    };
}

export function getTypesFail(): GetTypesFailAction {
    return {
        type: GET_TYPES_FAIL
    };
}
