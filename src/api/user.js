import request from '@/utils/request';

export function login({ name, password }) {
    return request({
        url: '/login',
        method: 'get',
        params: { name, password },
    });
}

export function getInfo(token) {
    return request({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token },
    });
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post',
    });
}

export function getUserById(userId) {
    return request({
        url: '/user',
        method: 'get',
        params: {
            userId,
        },
    });
}

export function submitStoreApplication(attachmentFormData) {
    return request({
        url: '/submitStoreApplication',
        method: 'post',
        data: attachmentFormData,
    });
}


export function fetchUserInfo(userId) {
    return request({
        url: '/fetchUserInfo',
        method: 'get',
        params: {userId},
    });
}


