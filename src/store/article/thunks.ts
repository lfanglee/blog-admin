import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { getArticleDetail as getArticleDetailService, GetArticleDetailParams } from '@/services/article';
import { getArticleDetail as getArticleDetailRequest, getArticleDetailSuccess, getArticleDetailFail } from './action';
import { ArticleStore } from './types';

export const getArticleDetail = (
    params: GetArticleDetailParams
): ThunkAction<void, ArticleStore, null, Action<string>> => async (
    dispatch: ThunkDispatch<ArticleStore, null, Action<string>>
) => {
    dispatch(getArticleDetailRequest());
    const res: Ajax.AjaxResponse<Article> = await getArticleDetailService(params);

    if (+res.code === 0) {
        dispatch(getArticleDetailSuccess(res.data));
    } else {
        dispatch(getArticleDetailFail());
    }
    return res;
};
