import * as actionTypes from '@/constants';

export interface ArticleStore {
    detail: Partial<Article>;
    isLoadingArticleData: boolean;
}

export interface GetArticleDetailAction {
    type: actionTypes.GET_ARTICLE_DETAIL_REQUEST;
}

export interface GetArticleDetailSuccessAction {
    type: actionTypes.GET_ARTICLE_DETAIL_SUCCESS;
    payload: {
        detail: Article;
    };
}

export interface GetArticleDetailFailAction {
    type: actionTypes.GET_ARTICLE_DETAIL_FAIL;
}

export type GetArticleActionTypes = GetArticleDetailAction | GetArticleDetailSuccessAction | GetArticleDetailFailAction;

export interface SetArticleDetail {
    type: actionTypes.SET_ARTICLE_DETAIL;
    payload: {
        detail: Article;
    };
}

export interface AddArticleAction {
    type: actionTypes.ADD_ARTICLE_REQUEST;
}

export interface AddArticleSuccessAction {
    type: actionTypes.ADD_ARTICLE_SUCCESS;
    payload: {
        detail: Article;
    };
}

export interface AddArticleFailAction {
    type: actionTypes.ADD_ARTICLE_FAIL;
}

export type AddArticleActionTypes = AddArticleAction | AddArticleSuccessAction | AddArticleFailAction;

export interface UpdateArticleAction {
    type: actionTypes.UPDATE_ARTICLE_REQUEST;
}

export interface UpdateArticleSuccessAction {
    type: actionTypes.UPDATE_ARTICLE_SUCCESS;
    payload: {
        detail: Article;
    };
}

export interface UpdateArticleFailAction {
    type: actionTypes.UPDATE_ARTICLE_FAIL;
}

export type UpdateArticleActionTypes = UpdateArticleAction | UpdateArticleSuccessAction | UpdateArticleFailAction;
