import { GetArticleActionTypes, SetArticleDetail } from './types';
import { GET_ARTICLE_DETAIL_REQUEST, GET_ARTICLE_DETAIL_SUCCESS, GET_ARTICLE_DETAIL_FAIL, SET_ARTICLE_DETAIL } from '@/constants';

export function getArticleDetail(): GetArticleActionTypes {
    return {
        type: GET_ARTICLE_DETAIL_REQUEST
    };
}

export function getArticleDetailSuccess(detail: Article): GetArticleActionTypes {
    return {
        type: GET_ARTICLE_DETAIL_SUCCESS,
        payload: {
            detail
        }
    };
}

export function getArticleDetailFail(): GetArticleActionTypes {
    return {
        type: GET_ARTICLE_DETAIL_FAIL
    };
}

export function setArticleDetail(detail: Article): SetArticleDetail {
    return {
        type: SET_ARTICLE_DETAIL,
        payload: {
            detail
        }
    };
}
