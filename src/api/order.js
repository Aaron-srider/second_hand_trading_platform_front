import request from '@/utils/request';

export function getPagedOrderList(pageNo, pageSize, consumerId) {
    return request({
        url: '/orderList',
        method: 'get',
        params: { pageNo, pageSize, consumerId },
    });
}
export function buy(
    buyToken,
    userId,
    goodsId,
    buyCount,
    ifUsePoint,
    pickedAddressId
) {
    return request({
        url: '/buy',
        method: 'post',
        data: {
            buyToken,
            userId,
            goodsId,
            buyCount,
            usePoint: ifUsePoint,
            addressId: pickedAddressId,
        },
    });
}

export function confirmReceiveGoods(orderId) {
    return request({
        url: '/confirmReceiveGoods',
        method: 'put',
        data: { orderId },
    });
}

export function getPaymentRecords(userId, pageNo, pageSize) {
    return request({
        url: '/getPaymentRecords',
        method: 'get',
        params: { userId, pageNo, pageSize },
    });
}

export function getUserRestMoney(userId) {
    return request({
        url: '/getUserRestMoney',
        method: 'get',
        params: { userId },
    });
}

export function getUserRestPoint(userId) {
    return request({
        url: '/getUserRestPoint',
        method: 'get',
        params: { userId },
    });
}

export function getShipGoods(storeId, pageNo, pageSize) {
    return request({
        url: '/getShipGoods',
        method: 'get',
        params: { pageNo, pageSize, storeId },
    });
}
