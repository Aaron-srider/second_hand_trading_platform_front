<template>
    <el-container>
        <el-header>
            <el-row type="flex" justify="center">
                <el-col :span="10">
                    <div style="text-align: center">
                        <h3>新用户注册</h3>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <!-- 姓名、手机号、邮箱、城市、性别、银行账号（16数字）	 -->
            <div style="margin: auto; width: 30%">
                <div>
                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">姓名:</div>
                            <el-input
                                v-model="name"
                                placeholder="姓名"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">手机号:</div>
                            <el-input
                                v-model="phone"
                                placeholder="手机号"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">邮箱:</div>
                            <el-input
                                v-model="email"
                                placeholder="邮箱"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">密码:</div>
                            <el-input
                                type="password"
                                v-model="password"
                                placeholder="密码"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">确认密码:</div>
                            <el-input
                                type="password"
                                v-model="rePassword"
                                placeholder="确认密码"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">城市:</div>
                            <el-input
                                v-model="city"
                                placeholder="城市"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">性别:</div>
                            <el-select
                                style="width: 100%"
                                v-model="sex"
                                placeholder="性别"
                            >
                                <el-option label="男" value="1" />
                                <el-option label="女" value="0" />
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col class="input-margin flex align-center">
                            <div style="width: 100px">银行账号:</div>
                            <el-input
                                v-model="bank_account"
                                placeholder="银行账号(16位)"
                                clearable
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input
                                v-model="verify_code"
                                placeholder="验证码"
                            >
                            </el-input>
                        </el-col>

                        <el-col :span="16">
                            <div>
                                <img
                                    class="reloadImage"
                                    id="reloadImage"
                                    ref="reloadImage"
                                    width="100"
                                    height="40"
                                />
                                <a
                                    @click="reloadImage"
                                    class="reload-verify-code"
                                >
                                    看不清换一张
                                </a>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <div style="margin-top: 20px">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="10">
                            <el-button
                                type="primary"
                                style="width: 100%"
                                @click="regist"
                            >
                                注册
                            </el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button style="width: 100%" @click="toLoginPage">
                                登录
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<style scoped>
.input-margin {
    margin-bottom: 10px;
}

.reload-verify-code {
    font-size: 14px;
}

.reload-verify-code:hover {
    color: blue;
}
</style>

<script>
// #region validate functions

let vue;

function testPassword(password, testFunction, failCallback) {
    if (!testFunction(password)) {
        failCallback();
        throw new Error();
    }
}

function valicateRePassword(password, rePassword) {
    return password === rePassword;
}

function valicatePassword(password, tests, callbacks) {
    try {
        for (let i = 0; i < tests.length; i++) {
            if (!tests[i](password)) {
                throw new Error(i);
            }
        }
        return true;
    } catch (error) {
        let i = error.message;
        callbacks[i](password);
        return false;
    }
}

function valicatePhone(phone) {
    var regex =
        /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
    if (!regex.test(phone)) {
        return false;
    }
    return true;
}

function valicateEmail(email) {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return reg.test(email);
}

function validateRgistInfo(
    name,
    phone,
    email,
    city,
    sex,
    bank_account,
    password,
    rePassword
) {
    let rst = {};
    rst.phone = valicatePhone(phone);
    rst.email = valicateEmail(email);
    rst.bank_account = validateBankAccount(bank_account);
    rst.name = validateName(name);
    rst.city = validateCity(city);
    rst.sex = validateSex(sex);

    rst.password = valicatePassword(
        password,
        [
            (password) => {
                console.log('test password length', password.length);
                return password.length >= 6 && password.length <= 12;
            },
            (password) => {
                let testexp = /^[A-Za-z0-9]*$/;
                return testexp.test(password);
            },
        ],
        [
            () => {
                // vue.$message({
                //     message: '密码长度应该在6~12之间',
                //     type: 'error',
                // });
            },
            () => {
                // vue.$message({
                //     message: '密码只能包含英文字母和数字',
                //     type: 'error',
                // });
            },
        ]
    );
    rst.rePassword = valicateRePassword(password, rePassword);
    console.log(rst);
    return rst;
}

function validateBankAccount(bank_account) {
    var bankno = bank_account;
    if (bankno == '') {
        //请填写银行卡号'
        return false;
    }
    if (bankno.length != 16) {
        return false;
    }

    //全数字
    var num = /^\d*$/;
    if (!num.exec(bankno)) {
        //银行卡号必须全为数字
        return false;
    }

    //验证通过
    return true;
}

function validateName(name) {
    //unicode 常用汉字编码范围：[\u4e00-\u9fa5] = [19968-40907]
    //包含少数民族的姓名，（阿莱个·阿斯蒂芬·阿斯蒂芬·阿斯蒂芬）中间最多三个点
    var reg3 = /^[\u4e00-\u9fa5]{1,}((·[\u4e00-\u9fa5]{1,}){0,3})$/;
    return reg3.test(name);
}

function validateCity(city) {
    //unicode 常用汉字编码范围：[\u4e00-\u9fa5] = [19968-40907]
    var reg3 = /^[\u4e00-\u9fa5]{1,}$/;
    return reg3.test(city);
}

function validateSex(sex) {
    var reg = /^[0|1]$/;
    return reg.test(sex);
}

// #endregion
import { verifyCode, loadVerifyCodeImage } from '@/api/verifyCode';
import { register } from '@/api/register.js';
import { wrapErrorMessage, unwrapErrorMessage } from '@/utils/index';
export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            city: '',
            sex: '',
            password: '',
            rePassword: '',
            bank_account: '',
            verify_code: '',

            validate_rst: {},
        };
    },
    created() {
        vue = this;
    },
    mounted() {
        this.reloadImage();
    },
    methods: {
        toLoginPage() {
            this.$router.push('/login');
        },
        regist() {
            // #region 验证输入
            this.validate_rst = validateRgistInfo(
                this.name,
                this.phone,
                this.email,
                this.city,
                this.sex,
                this.bank_account,
                this.password,
                this.rePassword
            );

            try {
                if (this.validate_rst.name === false) {
                    throw new Error('姓名格式不正确');
                }
                if (this.validate_rst.phone === false) {
                    throw new Error('手机号码格式不正确');
                }
                if (this.validate_rst.email === false) {
                    throw new Error('邮箱格式不正确');
                }
                if (this.validate_rst.city === false) {
                    throw new Error('城市格式不正确');
                }
                if (this.validate_rst.sex === false) {
                    throw new Error('性别格式不正确');
                }
                if (this.validate_rst.bank_account === false) {
                    throw new Error('银行卡号格式不正确');
                }
                if (this.validate_rst.password === false) {
                    throw new Error('null');
                }
                if (this.validate_rst.rePassword === false) {
                    throw new Error('两次密码输入不一致');
                }
            } catch (error) {
                if (!(error.message === 'null')) {
                    this.$message({
                        type: 'error',
                        message: error.message,
                    });
                }

                return;
            }

            // #endregion

            verifyCode(this.verify_code)
                .then((jsonResult) => {
                    if (jsonResult.code === 501) {
                        this.$message({
                            type: 'error',
                            message: jsonResult.message || jsonResult.detail,
                        });
                        return Promise.reject();
                    }

                    return register(
                        this.name,
                        this.phone,
                        this.email,
                        this.city,
                        this.sex,
                        this.bank_account,
                        this.password
                    );
                })
                .then((jsonResult) => {
                    if (jsonResult.code === 500) {
                        console.log('后端错误');
                        this.$message({
                            type: 'error',
                            message: jsonResult.message || jsonResult.detail,
                        });
                        return Promise.reject();
                    }
                    if (jsonResult.code === 503) {
                        console.log('邮箱已注册');
                        this.$message({
                            type: 'error',
                            message: jsonResult.message || jsonResult.detail,
                        });
                        return Promise.reject();
                    }

                    this.$message.success('注册申请提交成功，请等待管理员审核');
                    this.$router.push({
                        path: '/login',
                    });
                    this.reloadImage();
                });
        },
        reloadImage() {
            loadVerifyCodeImage().then((jsonResult) => {
                this.$refs.reloadImage.src =
                    'data:image/png;base64,' + jsonResult.data;
            });
        },
    },
};
</script>

<style>
@import '../../styles/common-style.css'; ;
</style>
