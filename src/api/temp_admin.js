import request from '@/utils/request';

export function uploadGoodsPic(goodId, attachmentFormData) {
    return request({
        url: `/tempAdmin/uploadGoodPic/${goodId}`,
        method: 'post',
        data: attachmentFormData,
    });
}
