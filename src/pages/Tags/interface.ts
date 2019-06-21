import { GetTagsParams } from '@/services/tag';
import { NewTagModalProps } from '@/pages/Articles/ArticleRelease/interface';
import { FormComponentProps } from 'antd/lib/form';

export interface Props {
    // props from redux state
    tagsList: Tag[];
    isLoadingTagData: boolean;
    // props from redux dispatch
    getTags(params?: GetTagsParams): Promise<Ajax.AjaxResponse<{
        list: Tag[];
        pagination: Pagination;
    }>>;
}

export interface State {
    inited: boolean;
    modalVisible: boolean;
    modalType: ModalTypes;
}

export enum ModalTypes {
    ADD,
    UPDATE
}

export interface TagFields {
    tagName?: string;
    tagDescript?: string;
}

export interface TagModalWrapperProps {
    modalVisible: boolean;
    title?: string;
    initialValue?: TagFields;
    handleModalVisible(): void;
    handleOk?(type: ModalTypes, tag: TagFields): void;
}

export type TagModalProps = TagModalWrapperProps & FormComponentProps & {
    handleOkClick(tag: TagFields): void;
};
