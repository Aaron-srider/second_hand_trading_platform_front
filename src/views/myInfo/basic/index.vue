<template>
    <div>
        <div>
            <!-- 基本信息 -->
            <div class="flex align-center">
                <div class="cube-60 mgr20">
                    <img
                        src=""
                        class="cube-60 border br100"
                        style="display: block"
                        alt=""
                    />
                </div>

                <div class="mgl20">{{ userInfo.name }}</div>

                <div class="">
                    <div class="flex align-center">
                        <div class="mgl8 mgr8 fs12">( 角色</div>

                        <div
                            v-for="roleName in roleNames"
                            class="lt-blue-bg br5 mgr8 pdl5 pdr5 flex flex-center"
                        >
                            <div style="height: 20px">
                                <span class="fs12">{{ roleName }}</span>
                            </div>
                        </div>

                        <div class="mgr8 fs12">)</div>
                        <!-- {{ roleName }} -->
                    </div>
                </div>

                <div>
                    <button
                        class="mgl8 fs14 pdl5 pdr5 br5"
                        style="border: 1px solid"
                        @click="openMerchantRegist"
                        v-if="notMerchant()"
                    >
                        成为商家
                    </button>

                    <button
                        class="mgl8 fs14 pdl5 pdr5 br5"
                        style="border: 1px solid"
                        @click="freshUserInfo"
                    >
                        刷新角色状态
                    </button>
                    <!-- <el-button
                        v-if="notMerchant()"
                        type="primary"
                        class="mgl8"
                        size="small"
                        @click="openMerchantRegist"
                        >成为商家</el-button
                    > -->
                </div>
            </div>
            <!-- 收货地址 -->
            <div>
                <div>
                    <div>收货地址（最多5个）</div>
                    <div>新增收货地址</div>
                    <div class="flex">
                        <div>
                            <div>省份</div>
                            <input v-model="newAddress.province" />
                        </div>
                        <div>
                            <div>城市</div>
                            <input v-model="newAddress.city" />
                        </div>
                    </div>

                    <div>
                        <div>详细地址</div>
                        <input v-model="newAddress.detail" />
                    </div>
                    <div>
                        <div>收货人电话</div>
                        <input v-model="newAddress.phone" />
                    </div>
                    <div>
                        <div>收货人姓名</div>
                        <input v-model="newAddress.receiverName" />
                    </div>

                    <div><el-button @click="addAddress">添加</el-button></div>
                </div>

                <div>
                    <div>已有地址</div>
                    <el-table :data="addressList">
                        <el-table-column prop="name" label="城市">
                            <template slot-scope="scope">
                                {{ scope.row.province + ' ' + scope.row.city }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="detail" label="详细地址">
                        </el-table-column>
                        <el-table-column prop="phone" label="收货人电话">
                        </el-table-column>
                        <el-table-column prop="name" label="收货人姓名">
                        </el-table-column>
                        <el-table-column prop="" label="操作">
                            <template slot-scope="scope">
                                <a href="#" @click="deleteAddress(scope.row.id)"
                                    >删除
                                </a>
                                <a
                                    href="#"
                                    @click="setDefault(scope.row.id)"
                                    v-if="scope.row.default == false"
                                    >| 设为默认</a
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <!-- 注册商家弹框 -->
        <div>
            <el-dialog
                title="注册商家"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose"
            >
                <div class="flex align-center mgb8">
                    <div style="width: 100px">店铺名称：</div>
                    <div style="width: 360px">
                        <el-input v-model="storeName"></el-input>
                    </div>
                </div>

                <div class="flex align-center mgb8">
                    <div style="width: 100px">身份证：</div>
                    <div style="width: 360px">
                        <el-input v-model="idcard"></el-input>
                    </div>
                </div>

                <div
                    class="flex align-center"
                    style="height: 180px; margin-top: 28x"
                >
                    <div style="width: 100px">营业执照：</div>
                    <div class="flex">
                        <el-upload
                            id="upload"
                            drag
                            multiple
                            action="#"
                            :auto-upload="false"
                            :on-change="addFileHook"
                            :on-remove="removeFileHook"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或<em>点击选取</em>
                            </div>
                        </el-upload>
                        <!-- <el-button @click="uploadFile">上传</el-button> -->
                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitApplication"
                        >提交申请</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { submitStoreApplication, fetchUserInfo } from '@/api/user';
import {
    getAddressListByUserId,
    setDefaultAddress,
    addAddress,
    deleteAddress,
} from '@/api/address';
export default {
    data() {
        return {
            userInfo: this.$store.state.user.userInfo,
            addressList: [],
            storeName: '',
            idcard: '',

            dialogVisible: false,
            roleNames: this.$store.state.user.userInfo.roleNameTexts,
            uploadFileData: {
                fileList2Update: [],
            },
            newAddress: {
                province: '',
                city: '',
                detail: '',
                receiverName: '',
                phone: '',
            },
        };
    },
    created() {
        getAddressListByUserId(this.$store.state.user.userId).then(
            (jsonResult) => {
                this.addressList = jsonResult.data;
            }
        );
    },
    computed: {},
    methods: {
        openMerchantRegist() {
            this.dialogVisible = true;
        },
        handleClose(done) {
            done();
        },

        /**
         * 添加文件后的钩子。可以获取添加文件后的文件列表和添加的文件（对象的raw属性是文件对应的File对象）。
         * @param file 被添加的文件，包含一个raw属性，表示文件对应的File对象
         * @param fileList 添加文件之后的文件列表，如果修改fileList，那么界面文件列表也好对应变化。可以将该列表中的数据
         * 保存起来，自定义发送数据。
         */
        addFileHook(file, fileList) {
            console.log('file:', file, 'fileList:', fileList);

            // // 判断 > 10M
            // if (file.size > 1024 * 1024 * 10) {
            //     fileList.pop();
            //     let msg_size = `您上传的${file.name}，该文件大于10M，请您重新上传。`;
            //     let type = 'size';
            //     this.$notify({
            //         title: `${
            //             type === 'size' ? '文件大小不合规' : '文件数量不合规'
            //         }`,
            //         message: msg_size,
            //         iconClass: 'el-icon-s-opportunity',
            //         customClass: 'notify_size',
            //         duration: 5000,
            //     });
            //     return false;
            // }

            if (fileList.length > 1) {
                fileList.pop();
                let msg_size = `您只能上传一张图片`;
                let type = 'count';
                this.$notify({
                    title: `${
                        type === 'size' ? '文件大小不合规' : '文件数量不合规'
                    }`,
                    message: msg_size,
                    iconClass: 'el-icon-s-opportunity',
                    customClass: 'notify_size',
                    duration: 3000,
                });
                return false;
            }

            this.uploadFileData.fileList2Update = fileList;
            return true;
        },

        /**
         * 删除文件后的钩子。可以获取删除文件后的文件列表和被删除的文件（对象的raw属性是文件对应的File对象）。
         * @param file 被删除的文件，包含一个raw属性，表示文件对应的File对象
         * @param fileList 删除文件之后的文件列表，如果修改fileList，那么界面文件列表也好对应变化。可以将该列表中的数据
         * 保存起来，自定义发送数据。
         */
        removeFileHook(file, fileList) {
            console.log('file:', file, 'fileList:', fileList);
            this.uploadFileData.fileList2Update = fileList;
        },

        /**
         * 调用api上传文件
         */
        submitApplication() {
            let attachment = new FormData();
            if (
                this.storeName != '' &&
                this.idcard != '' &&
                this.idcard.length == 18 &&
                this.uploadFileData.fileList2Update.length == 1
            ) {
                // 传输文件
                this.uploadFileData.fileList2Update.forEach((item, index) => {
                    attachment.append('attachment', item.raw);
                });
                attachment.append(
                    'basicInfo',
                    new Blob(
                        [
                            JSON.stringify({
                                storeName: this.storeName,
                                idcard: this.idcard,
                                merchantId: this.$store.state.user.userId,
                            }),
                        ],
                        { type: 'application/json' }
                    )
                );
            } else {
                this.$message({
                    type: 'error',
                    message: '请将信息填写完整',
                });
                return false;
            }
            submitStoreApplication(attachment).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    this.dialogVisible = false;
                    this.$message({
                        message: '申请成功',
                        type: 'success',
                    });
                }

                if (jsonResult.code == 509) {
                    this.$message({
                        message: '您只能申请注册一个店铺',
                        type: 'error',
                    });
                    return new Promise.reject();
                }
            });
        },

        notMerchant() {
            console.log(this.$store.state.user.userInfo.roleId == 2);
            return this.$store.state.user.userInfo.roleId != 2;
        },

        addAddress() {
            if (
                this.newAddress.receiverName != '' &&
                this.newAddress.city != '' &&
                this.newAddress.province != '' &&
                this.newAddress.detail != '' &&
                this.newAddress.phone != ''
            ) {
                addAddress({
                    receiverName: this.newAddress.receiverName,
                    city: this.newAddress.city,
                    province: this.newAddress.province,
                    detail: this.newAddress.detail,
                    phone: this.newAddress.phone,
                    userId: this.$store.state.user.userId,
                }).then((jsonResult) => {
                    if (jsonResult.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功',
                        });

                        getAddressListByUserId(
                            this.$store.state.user.userId
                        ).then((jsonResult) => {
                            this.addressList = jsonResult.data;
                        });
                    } else if (jsonResult.code == 520) {
                        this.$message({
                            type: 'error',
                            message: '您只能添加5条地址',
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '添加失败',
                        });
                    }
                });
            } else {
                this.$message({
                    type: 'error',
                    message: '请将信息填写完整',
                });
            }
        },

        setDefault(addressId) {
            setDefaultAddress(addressId).then((jsonResult) => {
                if (jsonResult.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '设置成功',
                    });
                    getAddressListByUserId(this.$store.state.user.userId).then(
                        (jsonResult) => {
                            this.addressList = jsonResult.data;
                        }
                    );
                } else {
                    this.$message({
                        type: 'error',
                        message: '设置错误',
                    });
                }
            });
        },
        deleteAddress(addressId) {
            deleteAddress(addressId).then((jsonResult) => {
                if (jsonResult.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功',
                    });
                    getAddressListByUserId(this.$store.state.user.userId).then(
                        (jsonResult) => {
                            this.addressList = jsonResult.data;
                        }
                    );
                } else if (jsonResult.code == 521) {
                    this.$message({
                        type: 'error',
                        message: '不能删除默认地址',
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '删除失败',
                    });
                }
            });
        },

        freshUserInfo() {
            fetchUserInfo(this.$store.state.user.userId).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    this.$store.commit('user/SET_USER_INFO', jsonResult.data);
                    this.$router.go(0);
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../styles/common-style.css';
</style>
