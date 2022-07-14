import request from '@/utils/request';

export function fetchCommentsPage(pageNo, pageSize, goodsId) {
    return request({
        url: '/goodsComments',
        method: 'get',
        params: {
            pageNo,
            pageSize,
            goodsId,
        },
    });
}
