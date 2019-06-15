import { Tags, GetTagsActionTypes, AddTagActionTypes } from './types';
import {
    GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL,
    ADD_TAG_REQUEST, ADD_TAG_SUCCESS, ADD_TAG_FAIL
} from '@/constants';

const initialState: Tags = {
    tagsList: [],
    isLoadingTagsListData: false,
    isAddingTag: false
};

export default function tagsReducer(
    state: Tags = initialState,
    action: GetTagsActionTypes | AddTagActionTypes
): Tags {
    switch (action.type) {
        case GET_TAGS_REQUEST:
            return {
                ...state,
                isLoadingTagsListData: true
            };
        case GET_TAGS_SUCCESS:
            return {
                ...state,
                isLoadingTagsListData: false,
                tagsList: action.payload.list
            };
        case GET_TAGS_FAIL:
            return {
                ...state,
                isLoadingTagsListData: false,
                tagsList: []
            };
        case ADD_TAG_REQUEST:
            return {
                ...state,
                isAddingTag: true
            };
        case ADD_TAG_SUCCESS:
            return {
                ...state,
                isAddingTag: false,
                tagsList: state.tagsList.concat(action.payload.tag)
            };
        case ADD_TAG_FAIL:
            return {
                ...state,
                isAddingTag: false
            };
        default:
            return state;
    }
}
