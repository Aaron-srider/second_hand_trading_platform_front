

import request from '@/utils/request';

export function getGoodsById(goodsId) {
    return request({
        url: '/oneGoods',
        method: 'get',
        params: {
            goodsId,
        },
    });
}
