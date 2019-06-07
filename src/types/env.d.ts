declare var window: Window;

declare interface Tag {
    id: string;
    name: string;
    descript: string;
    sort: number;
    createAt: string;
    updateAt: string;
}

declare interface Article {
    id: string;
    title: string;
    keyword: string;
    descript: string;
    content: string;
    state: 1 | 2;
    publish: 1 | 2;
    thumb: string;
    type: number;
    tags: Tag[];
    createAt: string;
    updateAt: string;
    meta: {
        views: number;
        comments: number;
        likes: number;
    }
}

declare interface Pagination {
    total: number;
    totalPage: number;
    pageNo: number;
    pageSize: number;
}
