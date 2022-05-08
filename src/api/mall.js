import request from '@/utils/request';

export function getPagedGoodsList(pageSize, pageNo, goodsName) {
    return request({
        url: '/goods',
        method: 'get',
        params: {
            pageNo,
            pageSize,
            goodsName,
        },
    });
}
