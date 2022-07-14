import request from '@/utils/request';

export function submitCommit({
    userId,
    goodsId,
    orderId,
    goodsComment,
    storeComment,
    goodsStar,
    storeStar,
}) {
    return request({
        url: '/submitCommit',
        method: 'post',
        data: {
            userId,
            goodsId,
            orderId,
            goodsComment,
            storeComment,
            goodsStar,
            storeStar,
        },
    });
}

export function getOrderCommentByUserIdAndOrderId({ userId, orderId }) {
    return request({
        url: '/getOrderCommentByUserIdAndOrderId',
        method: 'get',
        params: {
            userId,
            orderId,
        },
    });
}
