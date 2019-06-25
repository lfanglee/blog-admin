import { GetArticleActionTypes, SetArticleDetail, AddArticleActionTypes, UpdateArticleActionTypes, DeleteArticleActionTypes } from './types';
import * as actionTypes from '@/constants';

export function getArticleDetail(): GetArticleActionTypes {
    return {
        type: actionTypes.GET_ARTICLE_DETAIL_REQUEST
    };
}

export function getArticleDetailSuccess(detail: Article): GetArticleActionTypes {
    return {
        type: actionTypes.GET_ARTICLE_DETAIL_SUCCESS,
        payload: {
            detail
        }
    };
}

export function getArticleDetailFail(): GetArticleActionTypes {
    return {
        type: actionTypes.GET_ARTICLE_DETAIL_FAIL
    };
}

export function setArticleDetail(detail: Article): SetArticleDetail {
    return {
        type: actionTypes.SET_ARTICLE_DETAIL,
        payload: {
            detail
        }
    };
}

export function addArticle(): AddArticleActionTypes {
    return {
        type: actionTypes.ADD_ARTICLE_REQUEST
    };
}

export function addArticleSuccess(detail: Article): AddArticleActionTypes {
    return {
        type: actionTypes.ADD_ARTICLE_SUCCESS,
        payload: {
            detail
        }
    };
}

export function addArticleFail(): AddArticleActionTypes {
    return {
        type: actionTypes.ADD_ARTICLE_FAIL
    };
}

export function updateArticle(): UpdateArticleActionTypes {
    return {
        type: actionTypes.UPDATE_ARTICLE_REQUEST
    };
}

export function updateArticleSuccess(detail: Article): UpdateArticleActionTypes {
    return {
        type: actionTypes.UPDATE_ARTICLE_SUCCESS,
        payload: {
            detail
        }
    };
}

export function updateArticleFail(): UpdateArticleActionTypes {
    return {
        type: actionTypes.UPDATE_ARTICLE_FAIL
    };
}

export function deleteArticle(): DeleteArticleActionTypes {
    return {
        type: actionTypes.DELETE_ARTICLE_REQUEST
    };
}

export function deleteArticleSuccess(): DeleteArticleActionTypes {
    return {
        type: actionTypes.DELETE_ARTICLE_SUCCESS
    };
}

export function deleteArticleFail(): DeleteArticleActionTypes {
    return {
        type: actionTypes.DELETE_ARTICLE_FAIL
    };
}
