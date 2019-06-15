/**
 * @file 检查登陆态
 */
export function checkLogin(): boolean {
    if (!window.localStorage.getItem('TOKEN') || !JSON.parse(window.localStorage.getItem('TOKEN') || '').activeTime) {
        return false;
    }
    const { activeTime } = JSON.parse(window.localStorage.getItem('TOKEN') || '');
    if (new Date().getTime() > activeTime * 1000) {
        return false;
    }
    return true;
}
