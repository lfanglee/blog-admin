import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';

const { Dragger } = Upload;

@(connect(state => {
    return {};
}, {}) as any)
export default class Files extends BaseComponent {
    state = {
        inited: false
    }

    componentWillMount() {
        this.setState({ inited: true });
    }

    render() {
        return this.state.inited ? (
            <div className="page c-page-files">
                <PageHeader title="文件管理" />
                <div className="page-content">
                    <Dragger
                        name="file"
                        multiple
                        action="/api/upload"
                        headers={{
                            Authorization: `TOKEN ${JSON.parse(localStorage.getItem('TOKEN')).token}`
                        }}
                        onChange={(info: UploadChangeParam) => {
                            const { status } = info.file;
                            if (status !== 'uploading') {
                                console.log(info.file, info.fileList);
                            }
                            if (status === 'done') {
                                message.success(`${info.file.name} file uploaded successfully.`);
                            } else if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                            }
                        }}
                    >
                        点击或者拖动文件至此上传
                    </Dragger>
                </div>
            </div>
        ) : <PageLoading />;
    }
}
