<template>
    <el-container style="width: 80%; margin: auto">
        <el-main>
            <div class="flex">
                <!-- 图片 -->
                <div class="flex column mgr20" style="width: 40%">
                    <!-- 大图 -->
                    <div>
                        <img
                            id="bigImg"
                            style="width: 300px; height: 300px"
                            :src="`data:image/png;base64,${
                                goods.pictureList
                                    ? goods.pictureList[0].base64Str
                                    : null
                            }`"
                            alt=""
                        />
                    </div>

                    <!-- 小图 -->
                    <div class="flex justify-center mgt20">
                        <div
                            style="margin-right: 20px; margin-left: 20px"
                            v-for="pic in goods.pictureList"
                            :key="pic.no"
                        >
                            <a href="#" @click="enlargePicture(pic.base64Str)">
                                <img
                                    style="width: 60px; height: 60px"
                                    :src="`data:image/png;base64,${pic.base64Str}`"
                                    alt=""
                            /></a>
                        </div>
                    </div>
                </div>
                <div>
                    <!-- 描述 -->
                    <div>
                        <div class="goods-desc-margin">
                            <span style="font-size: 20px; font-weight: bold">{{
                                goods.goodsName
                            }}</span>
                        </div>
                        <div class="goods-desc-margin">
                            价格：{{ goods.amount }}
                        </div>
                        <div class="goods-desc-margin">
                            折扣：{{ goods.discount }}
                        </div>

                        <div class="goods-desc-margin">
                            新旧程度：{{ goods.oldDegreeText }}
                        </div>

                        <div class="goods-desc-margin">
                            商品类型：{{ goods.goodsTypeText }}
                        </div>

                        <div class="goods-desc-margin">
                            尺寸：{{ goods.size }}
                        </div>

                        <div class="goods-desc-margin">
                            是否议价：{{ goods.barginOrNotText }}
                        </div>

                        <div class="goods-desc-margin">
                            数量：{{ goods.num }}
                        </div>

                        <div class="goods-desc-margin">
                            店铺：{{ goods.storeName }}
                        </div>
                        <div class="goods-desc-margin">
                            是否通过：{{ goods.permissionText }}
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align: right">
                <el-button
                    v-if="goods.permission == -1"
                    type="success"
                    @click="goodsPubPass"
                    >通过</el-button
                >
                <el-button
                    @click="goodsPubFail"
                    v-if="goods.permission == -1"
                    type="danger"
                    >不通过</el-button
                >
            </div>
        </el-main>
    </el-container>
</template>

<script>
// import { fetchCommentsPage } from '@/api/goodsComments.js';
import {
    getGoodsPubAppById,
    goodsPubPass,
    goodsPubFail,
} from '@/api/application.js';

export default {
    data() {
        return {
            goods: {
                id: 636,
                // todo
                goodsTypeText: '电子',
                transactionModeList: ['线下交易'],
                goodsName: '荣耀v20',
                amount: 1111.9,
                discount: 0.9,
                oldDegreeText: '4成',
                storeName: '小店',
                num: 3,
                barginOrNotText: '是',
                size: '3.3英寸',
                pictureList: [
                    {
                        no: 1,
                        base64Str:
                            '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',
                    },
                    {
                        no: 2,
                        base64Str:
                            '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',
                    },
                    {
                        no: 3,
                        base64Str:
                            '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',
                    },
                ],
            },
        };
    },
    methods: {
        getGoodsPubApp(goodsPubAppId) {
            getGoodsPubAppById(goodsPubAppId).then((jsonResult) => {
                this.goods = jsonResult.data;
                console.log(this.goods);
            });
        },

        enlargePicture(base64Str) {
            console.log($('#bigImg'));
            $('#bigImg').attr('src', `data:image/png;base64,` + base64Str);
            // console.log($('#bigImg').attr('src'));
        },

        goodsPubPass() {
            goodsPubPass(this.goods.id).then((jsonResult) => {
                if (jsonResult.code == 200) {
                    this.goods.permissionText = '通过';
                    this.goods.permission = 1;
                } else {
                    this.$message({
                        type: 'error',
                        message: '错误',
                    });
                }
            });
        },

        goodsPubFail() {
            goodsPubFail(this.goods.id).then((jsonResult) => {
                if (jsonResult.code == 200) {
                    this.goods.permissionText = '不通过';
                    this.goods.permission = 0;
                } else {
                    this.$message({
                        type: 'error',
                        message: '错误',
                    });
                }
            });
        },
    },
    created() {
        this.goods.id = this.$route.query.goodsPubAppId;

        this.getGoodsPubApp(this.goods.id);
    },
};
</script>

<style scoped>
@import '../../../styles/common-style.css';
.goods-desc-margin {
    margin-top: 10px;
    margin-bottom: 10px;
}

/deep/ div[total-rate] .el-rate__icon {
    font-size: 30px;
    margin-right: -6px;
}

/deep/ div[total-rate] {
    height: 32px;
}
</style>
