import {
    User,
    LoginActionTypes
} from './types';
import {
    LOGIN,
    LOGOUT
} from '@/constants/index';

const initialState: User = {
    username: ''
};

export default function counterReducer(
    state: User = initialState,
    action: LoginActionTypes
): User {
    switch (action.type) {
        case LOGIN:
            return {
                username: 'admin'
            };
        case LOGOUT:
            return {
                username: ''
            };
        default:
            return state;
    }
}
