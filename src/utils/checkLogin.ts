/**
 * @file 检查登陆态
 */
export function checkLogin(): boolean {
    if (!window.localStorage.getItem('TOKEN') || !JSON.parse(window.localStorage.getItem('TOKEN') || '').lifeTime) {
        return false;
    }
    const { lifeTime } = JSON.parse(window.localStorage.getItem('TOKEN') || '');
    if (new Date().getTime() > lifeTime) {
        return false;
    }
    return true;
}
