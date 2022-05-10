import request from '@/utils/request';

export function getPagedOrderList(pageNo, pageSize, consumerId) {
    return request({
        url: '/orderList',
        method: 'get',
        params: { pageNo, pageSize, consumerId },
    });
}
