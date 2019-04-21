import * as constants from '../constants';

export interface Increment {
    type: constants.INCREMENT;
}

export interface Decrement {
    type: constants.DECREMENT;
}

export type Action = Increment | Decrement;

export function increment(): Increment {
    return {
        type: constants.INCREMENT
    };
}

export function decrement(): Decrement {
    return {
        type: constants.DECREMENT
    };
}
