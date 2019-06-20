import { RouteComponentProps } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import { GetArticleDetailParams, PostArticleParams, PatchArticleParams } from '@/services/article';
import { GetTagsParams, PostTagParams } from '@/services/tag';

export interface Props {
    // props from redux state
    articleDetail: Article;
    isLoadingArticleData: boolean;
    tagsList: Tag[];
    isLoadingTagData: boolean;
    // props from redux dispatch
    getArticleDetail: (params: GetArticleDetailParams) => Promise<Ajax.AjaxResponse<Article>>;
    addArticle: (params: PostArticleParams) => Promise<Ajax.AjaxResponse<Article>>;
    updateArticle: (params: PatchArticleParams) => Promise<Ajax.AjaxResponse<Article>>;
    setArticleDetail: (detail: Partial<Article>) => Partial<Article>;
    getTags: (params?: GetTagsParams) => Promise<Ajax.AjaxResponse<{
        tags: Tag[];
        pagination: Pagination;
    }>>;
    addTag: (params: PostTagParams) => Promise<Ajax.AjaxResponse<Tag>>
}

export type ArticleReleaseComProps = Props & FormComponentProps & RouteComponentProps<{
    id: string
}>;

export interface State {
    inited: boolean;
    articleId: string;
    createTagModalVisible: boolean;
    isArticleSubmited: boolean;
}

export interface NewTag {
    tagName: string;
    tagDescript: string;
}

export type NewTagModalProps = {
    modalVisible: boolean;
    handleModalVisible: () => void;
    handleAddTag: (tag: NewTag) => void;
} & FormComponentProps;
