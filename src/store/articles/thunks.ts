import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { getArticleList as getArticleListService, GetArticleListParams } from '@/services/article';
import { Articles } from './types';
import {
    getArticleList as getArticleListRequest,
    getArticleListFail,
    getArticleListSuccess
} from './action';

export const getArticleList = (
    params: GetArticleListParams
): ThunkAction<void, Articles, null, Action<string>> => async (
    dispatch: ThunkDispatch<Articles, null, Action<string>>
) => {
    dispatch(getArticleListRequest());
    const res: Ajax.AjaxResponse<{
        list: Article[],
        pagination: Pagination
    }> = await getArticleListService(params);

    if (+res.code === 0) {
        const { list, pagination } = res.data;
        dispatch(getArticleListSuccess(list, pagination));
    } else {
        dispatch(getArticleListFail());
    }
    return res;
};
