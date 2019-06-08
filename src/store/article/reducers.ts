import { ArticleStore, GetArticleActionTypes, SetArticleActionTypes } from './types';
import {
    GET_ARTICLE_DETAIL_REQUEST,
    GET_ARTICLE_DETAIL_SUCCESS,
    GET_ARTICLE_DETAIL_FAIL, SET_ARTICLE_CONTENT,
    SET_PUBLISH_STATE, SET_ARTICLE_DETAIL
} from '@/constants';

const initialState: ArticleStore = {
    detail: {},
    isLoadingArticleData: false
};

export default function articleReducer(
    state: ArticleStore = initialState,
    action: GetArticleActionTypes | SetArticleActionTypes
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
        case SET_ARTICLE_CONTENT:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    content: action.payload.content
                }
            };
        case SET_PUBLISH_STATE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    publish: action.payload.state ? 1 : 2
                }
            };
        case SET_ARTICLE_DETAIL:
            return {
                ...state,
                detail: action.payload.detail
            };
        default:
            return state;
    }
}
