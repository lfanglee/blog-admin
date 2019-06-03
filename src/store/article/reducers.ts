import { ThunkAction } from 'redux-thunk';
import { ArticleStore, GetArticleActionTypes } from './types';
import { GET_ARTICLE_DETAIL_REQUEST, GET_ARTICLE_DETAIL_SUCCESS, GET_ARTICLE_DETAIL_FAIL } from '@/constants';

const initialState: ArticleStore = {
    detail: {},
    isLoadingArticleData: false
};

export default function articleReducer(
    state: ArticleStore = initialState,
    action: GetArticleActionTypes
): ArticleStore {
    switch (action.type) {
        case GET_ARTICLE_DETAIL_REQUEST:
            return {
                ...state,
                isLoadingArticleData: true
            };
        case GET_ARTICLE_DETAIL_SUCCESS:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: action.payload.detail
            };
        case GET_ARTICLE_DETAIL_FAIL:
            return {
                ...state,
                isLoadingArticleData: false,
                detail: {}
            };
        default:
            return state;
    }
}
