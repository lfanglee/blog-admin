import { message, notification } from 'antd';
import * as React from 'react';

export default class BaseComponent<P = {}, S = {}> extends React.PureComponent<P, S> {
    $message = message;

    $notification = notification;
}
