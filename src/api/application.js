import request from '@/utils/request';

export function getPagedRegistApplication(pageSize, pageNo) {
    return request({
        url: '/registApplications',
        method: 'get',
        params: {
            pageNo,
            pageSize,
        },
    });
}

export function registerPass(registerApplicationId) {
    return request({
        url: '/registerPass',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: registerApplicationId,
    });
}

export function registerFail(registerApplicationId) {
    return request({
        url: '/registerFail',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: registerApplicationId,
    });
}

export function getPageStoreApp(pageNo, pageSize) {
    return request({
        url: '/getPageStoreApp',
        method: 'get',
        params: {
            pageNo,
            pageSize,
        },
    });
}

export function storeRegistPass(storeRegistApplicationId) {
    return request({
        url: '/storeRegistPass',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: storeRegistApplicationId,
    });
}

export function storeRegistFail(storeRegistApplicationId) {
    return request({
        url: '/storeRegistFail',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: storeRegistApplicationId,
    });
}

export function getGoodsPubAppById(goodsPubAppId) {
    return request({
        url: '/getGoodsPubAppById',
        method: 'get',
        params: { goodsPubAppId },
    });
}

export function goodsPubPass(goodsPubAppId) {
    return request({
        url: '/goodsPubPass',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: { goodsPubAppId },
    });
}

export function goodsPubFail(goodsPubAppId) {
    return request({
        url: '/goodsPubFail',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: { goodsPubAppId },
    });
}
