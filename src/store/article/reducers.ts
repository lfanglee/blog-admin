import { ArticleStore, GetArticleActionTypes, SetArticleDetail, AddArticleActionTypes, UpdateArticleActionTypes } from './types';
import * as actionTypes from '@/constants';

const initialState: ArticleStore = {
    detail: {},
    isLoadingArticleData: false
};

export default function articleReducer(
    state: ArticleStore = initialState,
    action: GetArticleActionTypes | SetArticleDetail | AddArticleActionTypes | UpdateArticleActionTypes
): ArticleStore {
    switch (action.type) {
        case actionTypes.GET_ARTICLE_DETAIL_REQUEST:
            return {
                ...state,
                isLoadingArticleData: true
            };
        case actionTypes.GET_ARTICLE_DETAIL_SUCCESS:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: action.payload.detail
            };
        case actionTypes.GET_ARTICLE_DETAIL_FAIL:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: {}
            };
        case actionTypes.SET_ARTICLE_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...action.payload.detail
                }
            };
        case actionTypes.ADD_ARTICLE_REQUEST:
            return {
                ...state,
                isLoadingArticleData: true
            };
        case actionTypes.ADD_ARTICLE_SUCCESS:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: action.payload.detail
            };
        case actionTypes.ADD_ARTICLE_FAIL:
            return {
                ...state,
                isLoadingArticleData: false
            };
        default:
            return state;
    }
}
