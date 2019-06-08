import { Tags, GetTagsActionTypes, GetTypesActionTypes } from './types';
import { GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAIL, GET_TYPES_SUCCESS, GET_TYPES_REQUEST, GET_TYPES_FAIL } from '@/constants';

const initialState: Tags = {
    tagsList: [],
    typesList: [],
    isLoadingTagsListData: false,
    isLoadingTypesListData: false
};

export default function tagsReducer(
    state: Tags = initialState,
    action: GetTagsActionTypes | GetTypesActionTypes
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
        case GET_TYPES_REQUEST:
            return {
                ...state,
                isLoadingTypesListData: true
            };
        case GET_TYPES_SUCCESS:
            return {
                ...state,
                isLoadingTypesListData: false,
                typesList: action.payload.list
            };
        case GET_TYPES_FAIL:
            return {
                ...state,
                isLoadingTypesListData: false,
                typesList: []
            };
        default:
            return state;
    }
}
