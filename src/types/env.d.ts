declare var window: Window;
declare module 'query-string';

declare interface Tag {
    id: string;
    name: string;
    descript: string;
    sort: number;
    create_at: string;
    update_at: string;
}

declare interface Type {
    id: string;
    name: string;
    descript: string;
    create_at: string;
    update_at: string;
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
    create_at: string;
    update_at: string;
    meta: {
        views: number;
        comments: number;
        likes: number;
    }
}

declare interface MFile {
    id: string;
    originName: string;
    savedName: string;
    path: string;
    size: number;
    create_at: string;
}

declare interface Pagination {
    total: number;
    totalPage: number;
    pageNo: number;
    pageSize: number;
}
