import { GetFileListParams } from '@/services/file';
import { UploadFile } from 'antd/lib/upload/interface';

interface StateProps {
    fileList: MFile[];
    pagination: Pagination;
    isLoadingListData: boolean;
}

interface DispatchProps {
    getFileList(params?: GetFileListParams): Promise<Ajax.AjaxResponse<{
        list: MFile[];
        pagination: Pagination;
    }>>;
}
export interface OwnProps {}

export type Props = StateProps & DispatchProps & OwnProps;

export interface State {
    inited: boolean;
    showFileList: UploadFile[];
}
