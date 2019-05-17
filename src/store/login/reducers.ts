import {
    Login,
    LoginActionTypes
} from './types';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '@/constants/index';

const initialState: Login = {
    username: '',
    token: '',
    isLoginIng: false,
    isLoginEd: false
};

export default function counterReducer(
    state: Login = initialState,
    action: LoginActionTypes
): Login {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                username: action.username,
                isLoginIng: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                isLoginIng: false,
                isLoginEd: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                username: '',
                isLoginIng: false
            };
        case LOGOUT:
            return {
                ...state,
                username: '',
                token: ''
            };
        default:
            return state;
    }
}
