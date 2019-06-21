import { Tags, GetTagsActionTypes, AddTagActionTypes, UpdateTagActionTypes, DeleteTagActionTypes } from './types';
import * as actionTypes from '@/constants';

const initialState: Tags = {
    tagsList: [],
    isLoadingTagData: false
};

export default function tagsReducer(
    state: Tags = initialState,
    action: GetTagsActionTypes | AddTagActionTypes | UpdateTagActionTypes | DeleteTagActionTypes
): Tags {
    switch (action.type) {
        case actionTypes.GET_TAGS_REQUEST:
        case actionTypes.ADD_TAG_REQUEST:
        case actionTypes.UPDATE_TAG_REQUEST:
        case actionTypes.DELETE_TAG_REQUEST:
            return {
                ...state,
                isLoadingTagData: true
            };
        case actionTypes.GET_TAGS_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: action.payload.list
            };
        case actionTypes.ADD_TAG_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: state.tagsList.concat(action.payload.tag)
            };
        case actionTypes.UPDATE_TAG_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: state.tagsList.map((item: Tag) => {
                    if (item.id === action.payload.tag.id) {
                        return action.payload.tag;
                    }
                    return item;
                })
            };
        case actionTypes.DELETE_TAG_SUCCESS:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: state.tagsList.filter((item: Tag) => item.id !== action.payload.id)
            };
        case actionTypes.GET_TAGS_FAIL:
            return {
                ...state,
                isLoadingTagData: false,
                tagsList: []
            };
        case actionTypes.ADD_TAG_FAIL:
        case actionTypes.UPDATE_TAG_FAIL:
        case actionTypes.DELETE_TAG_FAIL:
            return {
                ...state,
                isLoadingTagData: false
            };
        default:
            return state;
    }
}
