import { Action } from '../actions';
import { StoreState } from '../types/index';
import { INCREMENT, DECREMENT } from '../constants/index';

export default function enthusiasm(state: StoreState, action: Action): StoreState {
    switch (action.type) {
        case INCREMENT:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        case DECREMENT:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
        default:
            break;
    }
    return state;
}
