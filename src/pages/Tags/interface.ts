import { GetTagsParams, PostTagParams, DeleteTagParams, PatchTagParams } from '@/services/tag';
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
    addTag(params: PostTagParams): Promise<Ajax.AjaxResponse<Tag>>;
    updateTag(params: PatchTagParams): Promise<Ajax.AjaxResponse<Tag>>;
    deleteTag(params: DeleteTagParams): Promise<Ajax.AjaxResponse<null>>;
}

export interface State {
    inited: boolean;
    modalType: ModalTypes;
    modalLoading: boolean;
    modalInitialValue: Partial<Tag>;
}

export enum ModalTypes {
    ADD,
    UPDATE,
    NONE
}

export interface TagFields {
    tagName?: string;
    tagDescript?: string;
}

export interface TagModalWrapperProps {
    title?: string;
    initialValue?: Partial<Tag>;
    loading?: boolean;
    handleModalVisible(): void;
    handleOk?(type: ModalTypes, tag: TagFields): void;
}

export type TagModalProps = TagModalWrapperProps & FormComponentProps & {
    modalVisible: boolean;
    handleOkClick(tag: TagFields): void;
};
