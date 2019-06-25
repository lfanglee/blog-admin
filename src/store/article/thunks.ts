import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    getArticleDetail as getArticleDetailService, GetArticleDetailParams,
    uploadArticle, PostArticleParams,
    updateArticle as updateArticleService, PatchArticleParams, DeleteArticleParams,
    deleteArticle as deleteArticleService
} from '@/services/article';
import {
    getArticleDetail as getArticleDetailRequest, getArticleDetailSuccess, getArticleDetailFail,
    addArticle as addArticleRequest, addArticleSuccess, addArticleFail,
    updateArticle as updateArticleRequest, updateArticleSuccess, updateArticleFail,
    deleteArticle as deleteArticleRequest, deleteArticleSuccess, deleteArticleFail
} from './action';
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

export const addArticle = (
    params: PostArticleParams
): ThunkAction<void, ArticleStore, null, Action<string>> => async (
    dispatch: ThunkDispatch<ArticleStore, null, Action<string>>
) => {
    dispatch(addArticleRequest());
    const res: Ajax.AjaxResponse<Article> = await uploadArticle(params);

    if (res.code === 0) {
        dispatch(addArticleSuccess(res.data));
    } else {
        dispatch(addArticleFail());
    }
    return res;
};

export const updateArticle = (
    params: PatchArticleParams
): ThunkAction<void, ArticleStore, null, Action<string>> => async (
    dispatch: ThunkDispatch<ArticleStore, null, Action<string>>
) => {
    dispatch(updateArticleRequest());
    const res: Ajax.AjaxResponse<Article> = await updateArticleService(params);

    if (res.code === 0) {
        dispatch(updateArticleSuccess(res.data));
    } else {
        dispatch(updateArticleFail());
    }
    return res;
};

export const deleteArticle = (
    params: DeleteArticleParams
): ThunkAction<void, ArticleStore, null, Action<string>> => async (
    dispatch: ThunkDispatch<ArticleStore, null, Action<string>>
) => {
    dispatch(deleteArticleRequest());
    const res: Ajax.AjaxResponse<null> = await deleteArticleService(params);

    if (res.code === 0) {
        dispatch(deleteArticleSuccess());
    } else {
        dispatch(deleteArticleFail());
    }
    return res;
};
