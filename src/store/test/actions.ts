import {
    Counter, CountActionTypes
} from './types';
import { INCREMENT, DECREMENT } from '@/constants/index';

export function increment(): CountActionTypes {
    return {
        type: INCREMENT
    };
}

export function decrement(): CountActionTypes {
    return {
        type: DECREMENT
    };
}
