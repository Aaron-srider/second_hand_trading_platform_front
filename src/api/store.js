import request from '@/utils/request';

export function getStoreInfo(merchantId) {
    return request({
        url: '/getStoreInfo',
        method: 'get',
        params: {
            merchantId,
        },
    });
}

export function getStoreGoods(pageNo, pageSize, storeId) {
    return request({
        url: '/getStoreGoods',
        method: 'get',
        params: {
            pageNo,
            pageSize,
            storeId,
        },
    });
}

export function downShelf(goodsId) {
    return request({
        url: '/downShelf',
        method: 'put',
        data: {
            goodsId,
        },
    });
}

export function upShelf(goodsId) {
    return request({
        url: '/upShelf',
        method: 'put',
        data: {
            goodsId,
        },
    });
}

export function submitGoodsPubApplication(attachment) {
    return request({
        url: '/submitGoodsPubApplication',
        method: 'post',
        data: attachment,
    });
}

export function getGoodsAppList(pageNo, pageSize) {
    return request({
        url: '/getGoodsAppList',
        method: 'get',
        params: {
            pageNo,
            pageSize,
        },
    });
}

export function getStoreId(userId) {
    return request({
        url: '/getStoreId',
        method: 'get',
        params: {
            userId,
        },
    });
}

export function getShipGoods(storeId, pageNo, pageSize) {
    return request({
        url: '/getShipGoods',
        method: 'get',
        params: {
            storeId,
            pageNo,
            pageSize,
        },
    });
}

export function deliverGoods(orderId) {
    return request({
        url: '/deliverGoods',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: orderId,
    });
}
