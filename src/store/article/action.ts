import { GetArticleActionTypes } from './types';
import { GET_ARTICLE_DETAIL_REQUEST, GET_ARTICLE_DETAIL_SUCCESS, GET_ARTICLE_DETAIL_FAIL } from '@/constants';

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
