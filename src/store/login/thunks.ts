import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    Login
} from './types';
import {
    login as loginRequest,
    loginSuccess,
    loginFail,
    logout as LogoutAction
} from './action';
import { login as loginService } from '@/services/login';

export const login = (
    username: string,
    password: string
): ThunkAction<void, Login, null, Action<string>> => async (
    dispatch: ThunkDispatch<Login, null, Action<string>>
) => {
    dispatch(loginRequest(username));
    const loginRes = await loginService({
        username,
        password
    });

    if (+loginRes.code === 0) {
        dispatch(loginSuccess(loginRes.data.token));
    } else {
        dispatch(loginFail());
    }
    return loginRes;
};

export const logout = (): ThunkAction<void, Login, null, Action<string>> => (
    dispatch: ThunkDispatch<Login, null, Action<string>>
) => {
    window.localStorage.removeItem('TOKEN');
    dispatch(LogoutAction());
};
