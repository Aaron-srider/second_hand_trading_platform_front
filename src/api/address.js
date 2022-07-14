import request from '@/utils/request';

export function getAddressListByUserId(userId) {
    return request({
        url: '/receiveGoodsAddress',
        method: 'get',
        params: {
            userId,
        },
    });
}

export function addAddress({
    receiverName,
    city,
    province,
    detail,
    phone,
    userId,
}) {
    return request({
        url: '/addAddress',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: {
            receiverName,
            city,
            province,
            detail,
            phone,
            userId,
        },
    });
}

export function setDefaultAddress(addressId) {
    return request({
        url: '/setDefaultAddress',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        data: addressId,
    });
}

export function deleteAddress(addressId) {
    return request({
        url: '/deleteAddress',
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        data: addressId,
    });
}


