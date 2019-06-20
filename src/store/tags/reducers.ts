import { Tags, GetTagsActionTypes, AddTagActionTypes } from './types';
import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL,
    ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAIL
} from '@/constants';

const initialState: Tags = {
    tagsList: [],
    isLoadingTagData: false
};

export default function tagsReducer(
    state: Tags = initialState,
    action: GetTagsActionTypes | AddTagActionTypes
): Tags {
    switch (action.type) {
        case GET_TAGS_REQUEST:
            return {
                ...state,
                isLoadingTagData: true
            };
        case GET_TAGS_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: action.payload.list
            };
        case GET_TAGS_FAIL:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: []
            };
        case ADD_TAG_REQUEST:
            return {
                ...state,
                isLoadingTagData: true
            };
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: state.tagsList.concat(action.payload.tag)
            };
        case ADD_TAG_FAIL:
            return {
                ...state,
                isLoadingTagData: false
            };
        default:
            return state;
    }
}
