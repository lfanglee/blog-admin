import { menus } from '@/layouts/Menu';

export const mapPathToList: (n: string) => string[] = (pathname: string) => {
    const urlComp = pathname.split('/').filter(i => i);
    return urlComp.map((_item, index) => `/${urlComp.slice(0, index + 1).join('/')}`);
};

// 页面层级不超过两层
export const getPageTitle: (n: string) => string = (pathname: string) => {
    const urlList = mapPathToList(pathname);
    const [first = '', last = ''] = urlList;
    const firstMatch = menus.filter(item => item.path === first)[0];
    const lastMatch = firstMatch.subMenu && firstMatch.subMenu.filter(item => item.path === last)[0];
    if (lastMatch) {
        return `${firstMatch.title} - ${lastMatch.title}`;
    }
    if (firstMatch) {
        return firstMatch.title;
    }
    return pathname.slice(1);
};
