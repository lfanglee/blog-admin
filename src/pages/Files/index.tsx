import * as React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Upload, Icon, Pagination, Spin, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import BaseComponent from '@/pages/components/BaseComponent';
import PageLoading from '@/components/PageLoading';
import { AppState } from '@/store';
import { getFileList } from '@/store/files/thunks';
import { Props, State } from './interface';
import './index.scss';

const { Dragger } = Upload;

class Files extends BaseComponent<Props, State> {
    state: State = {
        inited: false,
        showFileList: []
    }

    async componentDidMount() {
        await this.getFileListData();
        this.setState({
            inited: true
        });
    }

    getFileListData = async (pageNo = 1, pageSize = 40) => {
        await this.props.getFileList({
            pageNo,
            pageSize
        });
        this.setState({
            showFileList: this.props.fileList.map((file: MFile) => ({
                uid: file.id,
                size: file.size,
                name: file.originName,
                url: file.path,
                type: 'img'
            }))
        });
    }

    handleChange = async (info: UploadChangeParam) => {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.data.url;
            }
            return file;
        });

        this.setState({ showFileList: fileList });
        const { status } = info.file;
        if (status === 'done') {
            if (info.file.response.code === 0) {
                message.success(`${info.file.name} file uploaded successfully.`);
                await this.getFileListData();
            } else {
                message.error(`${info.file.name} file upload failed.`);
            }
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleRemove = (file: UploadFile) => {
        console.log(file);
    }

    handlePaginationChange = (page: number, pageSize: number) => {
        this.getFileListData(page, pageSize);
    }

    handlePaginationSizeChange = (page: number, pageSize: number) => {
        this.getFileListData(page, pageSize);
    }

    render() {
        const { pageNo, pageSize, total } = this.props.pagination;
        return this.state.inited ? (
            <div className="page c-page-files">
                <PageHeader title="文件管理" />
                <div className="page-content">
                    <Spin spinning={this.props.isLoadingListData}>
                        <Dragger
                            multiple
                            name="file"
                            action="/api/upload"
                            headers={{
                                Authorization: `TOKEN ${JSON.parse(localStorage.getItem('TOKEN')).token}`
                            }}
                            listType="picture-card"
                            fileList={this.state.showFileList}
                            onChange={this.handleChange}
                            onRemove={this.handleRemove}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            点击或者拖动文件至此上传
                        </Dragger>
                    </Spin>
                    <Pagination
                        showQuickJumper
                        showSizeChanger
                        defaultCurrent={pageNo}
                        defaultPageSize={pageSize}
                        total={total}
                        onChange={this.handlePaginationChange}
                        onShowSizeChange={this.handlePaginationSizeChange}
                    />
                </div>
            </div>
        ) : <PageLoading />;
    }
}

export default connect((state: AppState) => {
    return {
        fileList: state.files.fileList,
        pagination: state.files.pagination,
        isLoadingListData: state.files.isLoadingListData
    };
}, {
    getFileList
})(Files);
