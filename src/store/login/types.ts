import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '@/constants';

export interface Login {
    username: string
    token: string
    isLoginIng: boolean
}

interface LoginAction {
    type: LOGIN_REQUEST
    username: string
}

interface LoginSuccssAction {
    type: LOGIN_SUCCESS,
    token: string
}

interface LoginFailAction {
    type: LOGIN_FAIL
}

interface LogoutAction {
    type: LOGOUT
}

export type LoginActionTypes = LoginAction | LoginSuccssAction | LoginFailAction | LogoutAction;
