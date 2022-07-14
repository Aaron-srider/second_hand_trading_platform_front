import request from '@/utils/request';

export function multiple(a, b, scale) {
    return request({
        url: '/multiple',
        method: 'get',
        params: {
            a,
            b,
            scale,
        },
    });
}

export function uuid() {
    return request({
        url: '/uuid',
        method: 'get',
    });
}
