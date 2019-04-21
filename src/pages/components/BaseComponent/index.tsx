import { message, notification } from 'antd';
import * as React from 'react';

export default class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
    $message = message;

    $notification = notification;
}
