import {
    LoginActionTypes
} from './types';
import { LOGIN, LOGOUT } from '@/constants/index';

export function login(user): LoginActionTypes {
    return {
        type: LOGIN,,
        user
    };
}

export function logout(): LoginActionTypes {
    return {
        type: LOGOUT
    };
}
