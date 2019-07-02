import { ArticleStore, GetArticleActionTypes, SetArticleDetail, AddArticleActionTypes, UpdateArticleActionTypes, DeleteArticleActionTypes, ResetArticleDetail } from './types';
import * as actionTypes from '@/constants';

const initialState: ArticleStore = {
    detail: {},
    isLoadingArticleData: false
};

export default function articleReducer(
    state: ArticleStore = initialState,
    action: GetArticleActionTypes | SetArticleDetail | ResetArticleDetail
        | AddArticleActionTypes | UpdateArticleActionTypes | DeleteArticleActionTypes
): ArticleStore {
    switch (action.type) {
        case actionTypes.GET_ARTICLE_DETAIL_REQUEST:
        case actionTypes.ADD_ARTICLE_REQUEST:
        case actionTypes.UPDATE_ARTICLE_REQUEST:
        case actionTypes.DELETE_ARTICLE_REQUEST:
            return {
                ...state,
                isLoadingArticleData: true
            };
        case actionTypes.GET_ARTICLE_DETAIL_SUCCESS:
        case actionTypes.ADD_ARTICLE_SUCCESS:
        case actionTypes.UPDATE_ARTICLE_SUCCESS:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: action.payload.detail
            };
        case actionTypes.GET_ARTICLE_DETAIL_FAIL:
        case actionTypes.DELETE_ARTICLE_SUCCESS:
        case actionTypes.RESET_ARTICLE_DETAIL:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: {}
            };
        case actionTypes.ADD_ARTICLE_FAIL:
        case actionTypes.UPDATE_ARTICLE_FAIL:
        case actionTypes.DELETE_ARTICLE_FAIL:
            return {
                ...state,
                isLoadingArticleData: false
            };
        case actionTypes.SET_ARTICLE_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...action.payload.detail
                }
            };
        default:
            return state;
    }
}
