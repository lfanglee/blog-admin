import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {
    GetTagsParams, getTags as getTagsService,
    PostTagParams, addTag as addTagService
} from '@/services/tag';
import {
    getTags as getTagsAction, getTagsSuccess, getTagsFail,
    addTag as addTagAction, addTagSuccess, addTagFail
} from './actions';
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
        const { tags } = res.data;
        dispatch(getTagsSuccess(tags));
    } else {
        dispatch(getTagsFail());
    }
    return res;
};

export const addTag = (
    params: PostTagParams
): ThunkAction<void, Tags, null, Action<string>> => async (
    dispatch: ThunkDispatch<Tags, null, Action<string>>
) => {
    dispatch(addTagAction());
    const res: Ajax.AjaxResponse<Tag> = await addTagService(params);

    if (res.code === 0) {
        dispatch(addTagSuccess(res.data));
    } else {
        dispatch(addTagFail());
    }
    return res;
};
