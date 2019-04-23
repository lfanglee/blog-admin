import {
    INCREMENT,
    DECREMENT
} from '@/constants/index';

export interface Counter {
    count: number
}

interface IncrementAction {
    type: INCREMENT
}

interface DecrementAction {
    type: DECREMENT
}

export type CountActionTypes = IncrementAction | DecrementAction;
