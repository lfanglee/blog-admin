import { Tags, GetTagsActionTypes } from './types';
import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL } from '@/constants';

const initialState: Tags = {
    tagsList: [],
    isLoadingTagsListData: false
};

export default function tagsReducer(
    state: Tags = initialState,
    action: GetTagsActionTypes
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
        default:
            return state;
    }
}
