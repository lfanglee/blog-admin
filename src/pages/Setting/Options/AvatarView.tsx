import * as React from 'react';
import { Upload, Button } from 'antd';

interface Props {
    username: string;
    avatar: string;
}

interface State {
    loading: boolean;
}

export default class AvatarView extends React.PureComponent<Props, State> {
    state: State = {
        loading: false
    }

    render() {
        const { username, avatar } = this.props;
        const { loading } = this.state;
        return (
            <div className="c-comp-avatar-view">
                <div className="avatar-title">{ username }</div>
                <div className="avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <Upload
                    action="/api/upload"
                    headers={{
                        Authorization: `TOKEN ${JSON.parse(localStorage.getItem('TOKEN')).token}`
                    }}
                    showUploadList={false}
                >
                    <Button loading={loading} disabled={loading} icon="upload">
                        Change avatar
                    </Button>
                </Upload>
            </div>
        );
    }
}
