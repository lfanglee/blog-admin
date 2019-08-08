import * as actionTypes from '@/constants';

export interface Login {
    username: string;
    token: string;
    isLoginIng: boolean;
}

export interface Admin {
    name: string;
    slogan: string;
    gravatar: string;
    isLoading: boolean;
}

interface LoginAction {
    type: actionTypes.LOGIN_REQUEST;
    username: string;
}

interface LoginSuccssAction {
    type: actionTypes.LOGIN_SUCCESS;
    token: string;
}

interface LoginFailAction {
    type: actionTypes.LOGIN_FAIL;
}

interface LogoutAction {
    type: actionTypes.LOGOUT;
}

export type LoginActionTypes = LoginAction | LoginSuccssAction | LoginFailAction | LogoutAction;

interface UpdateAdminAction {
    type: actionTypes.UPDATE_ADMIN_REQUEST;
}

interface UpdateAdminSuccessAction {
    type: actionTypes.UPDATE_ADMIN_SUCCESS;
    payload: {
        name: string;
        slogan: string;
        gravatar: string;
    }
}

interface UpdateAdminFailAction {
    type: actionTypes.UPDATE_ADMIN_FAIL;
}

export type UpdateAdminActionTypes = UpdateAdminAction | UpdateAdminSuccessAction | UpdateAdminFailAction;
