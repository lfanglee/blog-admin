import { GET_ARTICLE_DETAIL_REQUEST, GET_ARTICLE_DETAIL_SUCCESS, GET_ARTICLE_DETAIL_FAIL } from '@/constants';

export interface ArticleStore {
    detail: Partial<Article>;
    isLoadingArticleData: boolean;
}

export interface GetArticleDetailAction {
    type: GET_ARTICLE_DETAIL_REQUEST;
}

export interface GetArticleDetailSuccessAction {
    type: GET_ARTICLE_DETAIL_SUCCESS;
    payload: {
        detail: Article
    }
}

export interface GetArticleDetailFailAction {
    type: GET_ARTICLE_DETAIL_FAIL
}

export type GetArticleActionTypes = GetArticleDetailAction | GetArticleDetailSuccessAction | GetArticleDetailFailAction;
