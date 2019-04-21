import * as React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '@/pages/components/BaseComponent';
import { Button } from 'antd';

interface Props {
    count: number;
    increment?: () => void;
    decrement?: () => void;
}

@(connect((state: any) => {
    return {
        count: state.count
    };
}, (dispatch: any) => {
    return {
        increment: () => { dispatch({ type: 'INCREMENT' }); },
        decrement: () => { dispatch({ type: 'DECREMENT' }); }
    };
}) as any)
export default class Test extends BaseComponent<Props> {
    private handleShowAlert = () => {
        this.$message.success('这是一个通知');
    }

    private increment = () => {
        this.props.increment();
    }

    private decrement = () => {
        this.props.decrement();
    }

    render() {
        return (
            <div>
                <div>{this.props.count }</div>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.increment}>+</Button>
                <Button onClick={this.handleShowAlert}>btn</Button>
            </div>
        );
    }
}
