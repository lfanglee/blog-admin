import { ArticlesActionTypes } from './types';
import { GET_ARTICLE_LIST_REQUEST, GET_ARTICLE_LIST_SUCCESS, GET_ARTICLE_LIST_FAIL } from '@/constants';

export function getArticleList(): ArticlesActionTypes {
    return {
        type: GET_ARTICLE_LIST_REQUEST
    };
}

export function getArticleListSuccess(list: Article[], pagination: Pagination): ArticlesActionTypes {
    return {
        type: GET_ARTICLE_LIST_SUCCESS,
        payload: {
            list,
            pagination
        }
    };
}

export function getArticleListFail(): ArticlesActionTypes {
    return {
        type: GET_ARTICLE_LIST_FAIL
    };
}
