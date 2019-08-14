import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    Login, Admin
} from './types';
import {
    login as loginRequest, loginSuccess, loginFail,
    logout as LogoutAction,
    updateAdmin as updateAdminRequest, updateAdminSuccess, updateAdminFail
} from './action';
import { login as loginService, updateAdmin as updateAdminService, UpdateAdminParams } from '@/services/login';

type AdminInfo = Login & Admin;

export const login = (
    username: string,
    password: string
): ThunkAction<void, AdminInfo, null, Action<string>> => async (
    dispatch: ThunkDispatch<AdminInfo, null, Action<string>>
) => {
    dispatch(loginRequest(username));
    const loginRes = await loginService({
        username,
        password
    });

    if (+loginRes.code === 0) {
        dispatch(loginSuccess(loginRes.data));
    } else {
        dispatch(loginFail());
    }
    return loginRes;
};

export const logout = (): ThunkAction<void, AdminInfo, null, Action<string>> => (
    dispatch: ThunkDispatch<AdminInfo, null, Action<string>>
) => {
    window.localStorage.removeItem('TOKEN');
    dispatch(LogoutAction());
};

export const updateAdmin = (params: UpdateAdminParams): ThunkAction<void, AdminInfo, null, Action<string>> => async (
    dispatch: ThunkDispatch<AdminInfo, null, Action<string>>
) => {
    dispatch(updateAdminRequest());
    const res = await updateAdminService(params);

    if (+res.code === 0) {
        dispatch(updateAdminSuccess(res.data));
    } else {
        dispatch(updateAdminFail());
    }
    return res;
};
