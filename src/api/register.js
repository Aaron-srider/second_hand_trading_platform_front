import request from '@/utils/request';

export function register(name, phone, email, city, sex, bankAccount, password) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            name,
            phone,
            email,
            city,
            sex,
            bankAccount,
            password,
        },
    });
}
