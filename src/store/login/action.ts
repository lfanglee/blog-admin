import {
    LoginActionTypes
} from './types';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '@/constants/index';

export function login(username: string): LoginActionTypes {
    return {
        type: LOGIN_REQUEST,
        username
    };
}

export function loginSuccess(token: string): LoginActionTypes {
    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function loginFail(): LoginActionTypes {
    return {
        type: LOGIN_FAIL
    };
}

export function logout(): LoginActionTypes {
    return {
        type: LOGOUT
    };
}
