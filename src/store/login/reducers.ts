import {
    Login,
    Admin,
    LoginActionTypes,
    UpdateAdminActionTypes
} from './types';
import * as actionTypes from '@/constants/index';

const initialState: Login & Admin = {
    username: '',
    token: '',
    isLoginIng: false,
    name: '',
    slogan: '',
    gravatar: '',
    isLoading: false
};

export default function counterReducer(
    state: Login & Admin = initialState,
    action: LoginActionTypes | UpdateAdminActionTypes
): Login & Admin {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                username: action.username,
                isLoginIng: true
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                name: action.payload.name,
                slogan: action.payload.slogan,
                gravatar: action.payload.gravatar,
                isLoginIng: false
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                username: '',
                gravatar: '',
                isLoginIng: false
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                username: '',
                token: ''
            };
        case actionTypes.UPDATE_ADMIN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_ADMIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            };
        case actionTypes.UPDATE_ADMIN_FAIL:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
