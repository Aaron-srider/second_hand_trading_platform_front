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
