import { GET_ARTICLE_DETAIL_REQUEST, GET_ARTICLE_DETAIL_SUCCESS, GET_ARTICLE_DETAIL_FAIL, SET_ARTICLE_CONTENT, SET_PUBLSH_STATE, SET_ARTICLE_DETAIL } from '@/constants';

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

export interface SetArticleContent {
    type: SET_ARTICLE_CONTENT,
    payload: {
        content: string;
    }
}

export interface SetPublishState {
    type: SET_PUBLSH_STATE,
    payload: {
        state: boolean
    }
}

export interface SetArticleDetail {
    type: SET_ARTICLE_DETAIL,
    payload: {
        detail: Article
    }
}

export type SetArticleActionTypes = SetArticleContent | SetPublishState | SetArticleDetail;
