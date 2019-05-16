import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    Login
} from './types';
import {
    login as loginRequest,
    loginSuccess,
    loginFail
} from './action';

function exampleAPI(): Promise<Ajax.AjaxResponse> {
    return Promise.resolve({
        ret: 0,
        ret_msg: 'aaa',
        data: {
            token: 'aaa'
        }
    });
}

const login = (
    username: string,
    password: string
): ThunkAction<void, Login, null, Action<string>> => async dispatch => {
    dispatch(loginRequest(username));
    try {
        const loginRes = await exampleAPI();

        if (+loginRes.ret === 0) {
            dispatch(loginSuccess(loginRes.data.token));
        } else {
            dispatch(loginFail());
        }
    } catch (error) {
        dispatch(loginFail());
    }
};

export default login;
