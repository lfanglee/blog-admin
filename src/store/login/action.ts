import {
    LoginActionTypes,
    UpdateAdminActionTypes
} from './types';
import { UpdateAdminParams } from '@/services/login';
import * as actionTypes from '@/constants/index';

export function login(username: string): LoginActionTypes {
    return {
        type: actionTypes.LOGIN_REQUEST,
        username
    };
}

export function loginSuccess(userInfo: UpdateAdminParams & { token: string; }): LoginActionTypes {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: userInfo
    };
}

export function loginFail(): LoginActionTypes {
    return {
        type: actionTypes.LOGIN_FAIL
    };
}

export function logout(): LoginActionTypes {
    return {
        type: actionTypes.LOGOUT
    };
}

export function updateAdmin(): UpdateAdminActionTypes {
    return {
        type: actionTypes.UPDATE_ADMIN_REQUEST
    };
}

export function updateAdminSuccess(params: UpdateAdminParams): UpdateAdminActionTypes {
    return {
        type: actionTypes.UPDATE_ADMIN_SUCCESS,
        payload: params
    };
}

export function updateAdminFail(): UpdateAdminActionTypes {
    return {
        type: actionTypes.UPDATE_ADMIN_FAIL
    };
}
