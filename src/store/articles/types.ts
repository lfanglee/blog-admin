import { GET_ARTICLE_LIST_REQUEST, GET_ARTICLE_LIST_FAIL, GET_ARTICLE_LIST_SUCCESS } from '@/constants';

export interface Articles {
    articleList: Article[];
    pagination: Pagination
    isLoadingArticleListData: boolean;
}

export interface GetArticleListAction {
    type: GET_ARTICLE_LIST_REQUEST;
}

export interface GetArticleListSuccessAction {
    type: GET_ARTICLE_LIST_SUCCESS;
    payload: {
        list: Article[];
        pagination: Pagination
    }
}

export interface GetArticleListFailAction {
    type: GET_ARTICLE_LIST_FAIL
}

export type ArticlesActionTypes = GetArticleListAction | GetArticleListSuccessAction | GetArticleListFailAction;
