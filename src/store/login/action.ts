import {
    LoginActionTypes
} from './types';
import { LOGIN, LOGOUT } from '@/constants/index';

export function login(): LoginActionTypes {
    return {
        type: LOGIN
    };
}

export function logout(): LoginActionTypes {
    return {
        type: LOGOUT
    };
}
