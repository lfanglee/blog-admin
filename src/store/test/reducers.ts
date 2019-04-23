import {
    Counter,
    CountActionTypes
} from './types';
import {
    INCREMENT,
    DECREMENT
} from '@/constants/index';

const initialState: Counter = {
    count: 0
};

export default function counterReducer(
    state: Counter = initialState,
    action: CountActionTypes
): Counter {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}
