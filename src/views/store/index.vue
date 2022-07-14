<template>
    <div style="width: 89%; margin: auto; margin-top: 20px">
        <div class="no-border gray-bg pd10 lt-blue-bg">店铺基本信息</div>
        <div class="mgt20">
            <div class="mgb20 flex">
                <div style="width: 120px">店铺名</div>
                <div>{{ store.name }}</div>
            </div>

            <div class="mgb20 flex">
                <div style="width: 120px">店铺等级</div>
                <div>{{ store.levelNum }}</div>
            </div>
            <div class="mgb20 flex">
                <div style="width: 120px">店铺营业执照</div>
                <div
                    class="no-border gray-bg flex flex-center"
                    style="width: 400px; height: 250px"
                >
                    <img
                        class="cube-200 border-gray br15"
                        :src="`data:image/png;base64,${store.businessLicencePicStr}`"
                        alt=""
                    />
                </div>
            </div>
        </div>

        <div class="no-border gray-bg pd10 lt-blue-bg">店铺商品</div>
        <div class="mgt20">
            <div class="flex justify-between">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageNo"
                    :page-size="pagination.pageSize"
                    layout="total, prev, pager, next"
                    :total="pagination.total"
                />
                <el-button type="primary" @click="addGoods">添加商品</el-button>
            </div>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="goodsName" label="商铺名称">
                </el-table-column>

                <el-table-column prop="typeName" label="类型名称">
                </el-table-column>

                <el-table-column prop="priceText" label="单价">
                </el-table-column>

                <el-table-column prop="discountText" label="折扣">
                </el-table-column>

                <el-table-column prop="size" label="尺寸"> </el-table-column>

                <el-table-column prop="barginOrNotText" label="是否议价">
                </el-table-column>

                <el-table-column prop="oldDegreeText" label="新旧程度">
                </el-table-column>

                <el-table-column prop="historySales" label="历史销量">
                </el-table-column>

                <el-table-column prop="stockQuantity" label="库存">
                </el-table-column>

                <el-table-column prop="onShelfText" label="上架">
                </el-table-column>

                <el-table-column prop="" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="toDetail(scope.row.id)"
                            type="primary"
                        >
                            详情</el-button
                        >
                        <el-button
                            size="small"
                            v-if="scope.row.onShelf == true"
                            @click="downShelf(scope.row.id)"
                            type="danger"
                        >
                            下架</el-button
                        >

                        <el-button
                            size="small"
                            v-if="scope.row.onShelf == false"
                            @click="upShelf(scope.row.id)"
                            type="success"
                        >
                            上架</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            title="提价添加商品申请"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            <div>
                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品名称:</div>
                    <div style="width: 300px">
                        <el-input
                            v-model="newGoods.goodsName"
                            placeholder="商品名称"
                        ></el-input>
                    </div>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品类型:</div>
                    <el-select
                        v-model="newGoods.goodsType"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="goodsType in [
                                {
                                    name: '手机',
                                    id: 1,
                                },

                                {
                                    name: '男装',
                                    id: 2,
                                },

                                {
                                    name: '家具',
                                    id: 3,
                                },

                                {
                                    name: '箱包',
                                    id: 4,
                                },

                                {
                                    name: '数码',
                                    id: 5,
                                },

                                {
                                    name: '电器',
                                    id: 6,
                                },
                            ]"
                            :key="goodsType.id"
                            :label="goodsType.name"
                            :value="goodsType.id"
                        >
                        </el-option>
                    </el-select>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品折扣:</div>
                    <div style="width: 300px">
                        <el-input
                            v-model="newGoods.discount"
                            placeholder="商品折扣"
                        ></el-input>
                    </div>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品尺寸:</div>
                    <div style="width: 300px">
                        <el-input
                            v-model="newGoods.size"
                            placeholder="商品尺寸"
                        ></el-input>
                    </div>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品单价:</div>
                    <div style="width: 300px">
                        <el-input
                            v-model="newGoods.amount"
                            placeholder="商品单价"
                        ></el-input>
                    </div>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">是否议价:</div>

                    <div>
                        <el-select v-model="newGoods.barginOrNot">
                            <el-option :value="1" :label="'是'"></el-option>
                            <el-option :value="0" :label="'否'"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="mgb20 flex align-center">
                    <div style="width: 100px">商品数量:</div>
                    <div style="width: 300px">
                        <el-input
                            v-model="newGoods.num"
                            placeholder="商品数量"
                        ></el-input>
                    </div>
                </div>
                <div class="mgb20 flex align-center">
                    <div style="width: 100px">新旧程度:</div>

                    <div>
                        <el-select v-model="newGoods.oldDegree">
                            <el-option
                                v-for="oldDegree in [
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                ]"
                                :value="oldDegree"
                                :label="oldDegree"
                            ></el-option>
                        </el-select>
                    </div>
                </div>

                <div
                    class="flex align-start"
                    style="height: 300px; margin-top: 20x"
                >
                    <div style="width: 100px">商品图片：</div>
                    <div class="flex" style="align-items: start; height: 300px">
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
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitGoodsPubApplication"
                    >提价添加申请</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    getStoreInfo,
    getStoreGoods,
    downShelf,
    upShelf,
    submitGoodsPubApplication,
} from '@/api/store';
export default {
    data() {
        return {
            store: {
                id: 1,
                name: '小店',
                businessLicencePicStr:
                    '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',
                levelNum: 5,
                createTime: '2021-03-33 33:33:22',
            },
            dialogVisible: false,
            pagination: {
                /**
                 * 总数
                 */
                total: 0,
                /**
                 * 当前页数
                 */
                pageNo: 1,
                /**
                 * 当前页面大小
                 */
                pageSize: 10,
            },
            newGoods: {
                goodsName: '',
                goodsType: 1,
                discount: 0.33,
                size: '9.8英寸',
                amount: '23.22',

                barginOrNot: '',
                num: 3,
                oldDegree: 8,
            },
            tableData: [
                {
                    id: 1,
                    goodsName: '荣耀V20',
                    typeName: '电子',
                    priceText: '2342.22',
                    discountText: '九折',
                    size: '8.2英寸',
                    barginOrNotText: '否',
                    oldDegreeText: '8成',
                    historySales: 23423,
                    stockQuantity: 234234,
                    onShelfText: '是',
                },
                {
                    id: 2,
                    goodsName: '荣耀V20',
                    typeName: '电子',
                    priceText: '2342.22',
                    discountText: '九折',
                    size: '8.2英寸',
                    barginOrNotText: '否',
                    oldDegreeText: '8成',
                    historySales: 23423,
                    stockQuantity: 234234,
                    onShelfText: '是',
                },
            ],

            uploadFileData: {
                fileList2Update: [],
            },
        };
    },
    created() {
        this.getPageData();
    },
    computed: {},
    methods: {
        getPageData() {
            let merchantId = this.$store.state.user.userId;
            getStoreInfo(merchantId)
                .then((jsonResult) => {
                    this.store = jsonResult.data;
                    return getStoreGoods(
                        this.pagination.pageNo,
                        this.pagination.pageSize,
                        this.store.id
                    );
                })
                .then((jsonResult) => {
                    console.log(jsonResult);

                    this.tableData = jsonResult.data.records;
                    this.pagination.total = jsonResult.data.total;
                });
        },

        handleCurrentChange(pageNo) {
            getStoreGoods(pageNo, this.pagination.pageSize, this.store.id).then(
                (jsonResult) => {
                    console.log(jsonResult);

                    this.tableData = jsonResult.data.records;
                    this.pagination.total = jsonResult.data.total;
                }
            );
        },
        downShelf(goodsId) {
            downShelf(goodsId).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    getStoreGoods(
                        this.pagination.pageNo,
                        this.pagination.pageSize,
                        this.store.id
                    ).then((jsonResult) => {
                        this.tableData = jsonResult.data.records;
                        this.pagination.total = jsonResult.data.total;
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '下架失败',
                    });
                }
            });
        },

        upShelf(goodsId) {
            upShelf(goodsId).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    getStoreGoods(
                        this.pagination.pageNo,
                        this.pagination.pageSize,
                        this.store.id
                    ).then((jsonResult) => {
                        this.tableData = jsonResult.data.records;
                        this.pagination.total = jsonResult.data.total;
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '上架失败',
                    });
                }
            });
        },

        toDetail(goodsId) {
            this.$router.push({
                path: '/store/goodsDetail',
                query: { goodsId },
            });
        },

        addGoods() {
            this.dialogVisible = true;
        },

        // upload
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

            if (fileList.length > 4) {
                fileList.pop();
                let msg_size = `您只能上传4张图片`;
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
        submitGoodsPubApplication() {
            let attachment = new FormData();

            console.log(this.newGoods.goodsType != '');

            console.log(this.newGoods.discount != '');

            console.log(this.newGoods.size != '');

            console.log(this.newGoods.amount != '');

            console.log(this.newGoods.barginOrNot !== undefined);

            console.log(this.newGoods.num != '');

            console.log(this.newGoods.oldDegree != '');

            console.log(
                this.uploadFileData.fileList2Update.length <= 4 &&
                    this.uploadFileData.fileList2Update.length >= 1
            );

            if (
                this.newGoods.goodsName != '' &&
                this.newGoods.goodsType != '' &&
                this.newGoods.discount != '' &&
                this.newGoods.size != '' &&
                this.newGoods.amount != '' &&
                this.newGoods.barginOrNot !== undefined &&
                this.newGoods.num != '' &&
                this.newGoods.oldDegree != '' &&
                this.uploadFileData.fileList2Update.length <= 4 &&
                this.uploadFileData.fileList2Update.length >= 1
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
                                storeId: this.store.id,
                                goodsName: this.newGoods.goodsName,
                                goodsType: this.newGoods.goodsType,
                                discount: this.newGoods.discount,
                                size: this.newGoods.size,
                                amount: this.newGoods.amount,
                                barginOrNot: this.newGoods.barginOrNot,
                                num: this.newGoods.num,
                                oldDegree: this.newGoods.oldDegree,
                            }),
                        ],
                        { type: 'application/json' }
                    )
                );
            } else {
                this.$message({
                    type: 'error',
                    message: '请将信息填写完整，注意，图片必须小于4张',
                });
                return false;
            }
            submitGoodsPubApplication(attachment).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    this.dialogVisible = false;
                    this.$message({
                        message: '申请成功',
                        type: 'success',
                    });
                } else {
                    this.$message({
                        message: '错误',
                        type: 'error',
                    });
                }

                // if (jsonResult.code == 509) {
                //     this.$message({
                //         message: '一次只能申请注册一个店铺',
                //         type: 'error',
                //     });
                // }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../styles/common-style.css';
</style>
