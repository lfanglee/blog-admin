import { Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { increment } from './actions';
import { AppState } from '../index';

function exampleAPI() {
    return Promise.resolve('Async Chat Bot');
}

const thunkSendMessage = (
    message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const asyncResp = await exampleAPI();

    dispatch(
        increment()
    );
};

export default thunkSendMessage;
