import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { GetTagsParams, getTags as getTagsService } from '@/services/tag';
import { getTags as getTagsAction, getTagsSuccess, getTagsFail } from './actions';
import { Tags } from './types';

export const getTags = (
    params?: GetTagsParams
): ThunkAction<void, Tags, null, Action<string>> => async (
    dispatch: ThunkDispatch<Tags, null, Action<string>>
) => {
    dispatch(getTagsAction());
    const res: Ajax.AjaxResponse<{
        tags: Tag[],
        pagination: Pagination
    }> = await getTagsService(params);

    if (+res.code === 0) {
        const { tags, pagination } = res.data;
        dispatch(getTagsSuccess(tags));
    } else {
        dispatch(getTagsFail());
    }
    return res;
};
