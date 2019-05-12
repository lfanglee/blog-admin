import {
    LOGIN_REQUEST,
    LOGOUT_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '@/constants';

export interface User {
    username?: string
    logedIn: boolean
}

interface LoginAction {
    type: LOGIN_REQUEST,
    user: User
}

interface LoginSuccssAction {
    type: LOGIN_SUCCESS
}

interface LoginFailAction {
    type: LOGIN_FAIL
}

interface LogoutAction {
    type: LOGOUT_REQUEST
}

export type LoginActionTypes = LoginAction | LoginSuccssAction | LoginFailAction | LogoutAction;
