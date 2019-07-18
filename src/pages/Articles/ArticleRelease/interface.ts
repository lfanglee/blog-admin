import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import { GetArticleDetailParams, PostArticleParams, PatchArticleParams } from '@/services/article';
import { GetTagsParams, PostTagParams } from '@/services/tag';

interface StateProps {
    articleDetail: Article;
    isLoadingArticleData: boolean;
    tagsList: Tag[];
    isLoadingTagData: boolean;
}

interface DispatchProps {
    getArticleDetail: (params: GetArticleDetailParams) => Promise<Ajax.AjaxResponse<Article>>;
    addArticle: (params: PostArticleParams) => Promise<Ajax.AjaxResponse<Article>>;
    updateArticle: (params: PatchArticleParams) => Promise<Ajax.AjaxResponse<Article>>;
    setArticleDetail: (detail: Partial<Article>) => void;
    resetArticleDetail: () => void;
    getTags: (params?: GetTagsParams) => Promise<Ajax.AjaxResponse<{
        tags: Tag[];
        pagination: Pagination;
    }>>;
    addTag: (params: PostTagParams) => Promise<Ajax.AjaxResponse<Tag>>
}
export interface OwnProps {}

export type Props = StateProps & DispatchProps & OwnProps & FormComponentProps & RouteComponentProps<{
    id: string
}>;

export interface State {
    inited: boolean;
    articleId: string;
    createTagModalVisible: boolean;
    isArticleSubmited: boolean;
}

export interface NewTag {
    tagName?: string;
    tagDescript?: string;
}

export type NewTagModalProps = {
    modalVisible: boolean;
    title?: string;
    initialValue?: NewTag;
    handleModalVisible: () => void;
    handleOk: (tag: NewTag) => void;
} & FormComponentProps;
