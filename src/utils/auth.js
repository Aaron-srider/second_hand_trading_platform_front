import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function getUserInfo() {
    if (Cookies.get('userInfo')) {
        return JSON.parse(Cookies.get('userInfo'));
    }
    return Cookies.get('userInfo');
}

export function setUserInfo(userInfo) {
    return Cookies.set('userInfo', userInfo);
}

export function rmUserInfo() {
    return Cookies.remove('userInfo');
}

export function getUserId() {
    return parseInt(Cookies.get('userId'));
    return Cookies.get('userId');
}

export function setUserId(userId) {
    return Cookies.set('userId', userId);
}

export function rmUserId() {
    return Cookies.remove('userId');
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}
