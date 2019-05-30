import { Articles, ArticlesActionTypes } from './types';
import { GET_ARTICLE_LIST_REQUEST, GET_ARTICLE_LIST_SUCCESS, GET_ARTICLE_LIST_FAIL } from '@/constants';

const initialState: Articles = {
    articleList: [],
    pagination: {
        total: 0,
        totalPage: 0,
        pageNo: 1,
        pageSize: 10
    },
    isLoadingArticleListData: false
};

export default function articlesReducer(
    state: Articles = initialState,
    action: ArticlesActionTypes
): Articles {
    switch (action.type) {
        case GET_ARTICLE_LIST_REQUEST:
            return {
                ...state,
                isLoadingArticleListData: true
            };
        case GET_ARTICLE_LIST_SUCCESS:
            return {
                ...state,
                isLoadingArticleListData: false
            };
        case GET_ARTICLE_LIST_FAIL:
            return {
                ...state,
                isLoadingArticleListData: false,
                articleList: [],
                pagination: {
                    total: 0,
                    totalPage: 0,
                    pageNo: 1,
                    pageSize: 10
                }
            };
        default:
            return state;
    }
}
