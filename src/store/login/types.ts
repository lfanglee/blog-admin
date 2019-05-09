import {
    LOGIN,
    LOGOUT
} from '@/constants';

export interface User {
    username: string
}

interface LoginAction {
    type: LOGIN
}

interface LogoutAction {
    type: LOGOUT
}

export type LoginActionTypes = LoginAction | LogoutAction;
