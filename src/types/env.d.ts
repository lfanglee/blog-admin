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
    state: number;
    publish: number;
    thumb: string;
    type: number;
    tags: Tag[];
    createAt: string;
    updateAt: string;
    meta: {
        view: number;
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
