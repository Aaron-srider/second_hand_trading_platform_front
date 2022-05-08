import request from '@/utils/request';

export function verifyCode(code) {
    return request({
        url: '/verifyCode',
        method: 'get',
        params: { code },
    });
}
export function loadVerifyCodeImage() {
    return request({
        url: '/kaptcha/getKaptchaImage',
        method: 'get',
    });
}

