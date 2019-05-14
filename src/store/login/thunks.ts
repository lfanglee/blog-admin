import { Action} from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    Login
} from './types';
import {
    login as loginRequest,
    loginSuccess,
    loginFail
} from './action';

function exampleAPI() {
    return Promise.resolve('Async Chat Bot');
}

const login = (
    username: string,
    password: string
): ThunkAction<void, Login, null, Action<string>> => async dispatch => {
    dispatch(loginRequest(username));
    
};

export default login;
