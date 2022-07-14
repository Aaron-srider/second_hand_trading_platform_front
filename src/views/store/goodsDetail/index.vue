<template>
    <el-container style="width: 80%; margin: auto">
        <el-main>
            <el-row>
                <!-- 图片 -->
                <el-col :span="10">
                    <!-- 大图 -->
                    <el-row type="flex" justify="center">
                        <img
                            id="bigImg"
                            style="width: 300px; height: 300px"
                            :src="`data:image/png;base64,${
                                goods.pictureList
                                    ? goods.pictureList[0].base64Str
                                    : null
                            }`"
                            alt=""
                    /></el-row>

                    <div style="height: 20px"></div>
                    <!-- 小图 -->
                    <div style="display: flex; justify-content: center">
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
                </el-col>
                <!-- 描述 -->
                <el-col :span="14">
                    <div class="goods-desc-margin">
                        <span style="font-size: 20px; font-weight: bold">{{
                            goods.goodsName
                        }}</span>
                    </div>
                    <div class="goods-desc-margin">价格：{{ goods.price }}</div>
                    <div class="goods-desc-margin">
                        折扣：{{ goods.discount }}
                    </div>

                    <div class="goods-desc-margin">
                        新旧程度：{{ goods.oldDegree }}成
                    </div>
                    <!-- <div class="goods-desc-margin">
                        交易方式：
                        <el-select
                            v-model="transactionMode"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="transactionMode in goods.transactionModeList"
                                :key="transactionMode"
                                :value="transactionMode"
                            >
                            </el-option>
                        </el-select>
                    </div> -->

                    <div class="goods-desc-margin">
                        销量：{{ goods.historySales }}
                    </div>

                    <div class="goods-desc-margin">
                        库存：{{ goods.stockQuantity }}
                    </div>

                    <!-- <div class="goods-desc-margin">
                        购买数量
                        <input v-model="buyCount" />
                    </div> -->
                    <!-- <div class="goods-desc-margin">
                        <el-button @click="jump2pay">立即购买</el-button>
                    </div> -->
                </el-col>
            </el-row>

            <!-- #region comment-->
            <div style="height: 60px" class="mgt20 flex shadow">
                <div
                    style="width: 50px; border-right: 1px solid #f2f6fc"
                    class="flex column flex-center"
                >
                    <div><span>评价</span></div>
                </div>
                <div class="mgl8 flex1 flex">
                    <div
                        class="flex column justify-center"
                        style="margin-right: 20px"
                    >
                        <div>
                            <span class="relative" style="font-size: 20px"
                                >总共有{{ commentsPage.total }}人评价</span
                            >
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex column justify-center mgr8">
                            <el-rate
                                total-rate
                                v-model="avgStar"
                                disabled
                                text-color="#ff9900"
                                score-template="{value}"
                            >
                            </el-rate>
                        </div>
                        <div class="flex column justify-center">
                            <div>
                                <span
                                    style="
                                        font-size: 25px;
                                        line-height: 10px;
                                        top: 3px;
                                        color: rgb(255, 153, 0);
                                    "
                                    class="relative"
                                >
                                    {{ avgStar }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-row style="margin-top: 20px">
                <div class="flex column">
                    <div>
                        <el-pagination
                            @current-change="commentsHandleCurrentChange"
                            :current-page="commentsPage.pageNo"
                            :page-size="commentsPage.pageSize"
                            layout="total, prev, pager, next"
                            :total="commentsPage.total"
                        />
                    </div>
                    <el-table
                        :show-header="false"
                        :data="commentsPage.pageData"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="comment"
                            label="日期"
                            width="320"
                        >
                            <template slot-scope="scope">
                                <p>{{ scope.row.comment }}</p>

                                <div>
                                    <span>{{ scope.row.commentTime }}</span>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="star" label="日期" width="">
                            <template slot-scope="scope">
                                <el-rate
                                    v-model="scope.row.star"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                                >
                                </el-rate>
                            </template>
                        </el-table-column>

                        <el-table-column prop="count" label="个数" width="">
                            <template slot-scope="scope">
                                <p>{{ scope.row.count }}个</p>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="consumerName"
                            label="购买者用户名"
                            width=""
                        >
                            <template slot-scope="scope">
                                <p>{{ scope.row.consumerName }}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-row>
            <!-- #endregion -->
        </el-main>
    </el-container>
</template>

<script>
import { fetchCommentsPage } from '@/api/goodsComments.js';
import { getGoodsById } from '@/api/goods.js';
export default {
    data() {
        return {
            buyCount: 1,
            commentsPage: {
                pageSize: 10,
                pageNo: 1,
                total: 0,
            },
            avgStar: 3.6,
            totalComments: 100,
            commentList: [
                {
                    comment:
                        '整体评价：贴的很好，3m的胶还是牛 外形外观：就那样 使用体验：防狗咬断，加贴了一层透明胶，感觉还是走线盒安全一点 做工质量：牛哇 容量大小：大概2个多到3厘米',
                    consumerName: 'strider',
                    count: 1,
                    star: 4.2,
                    commentTime: '1011-11-22 22:22:22',
                },
                {
                    comment:
                        '整体评价：贴的很好，3m的胶还是牛 外形外观：就那样 使用体验：防狗咬断，加贴了一层透明胶，感觉还是走线盒安全一点 做工质量：牛哇 容量大小：大概2个多到3厘米',
                    consumerName: 'strider',
                    count: 1,
                    star: 4.2,
                    commentTime: '1011-11-22 22:22:22',
                },
            ],
            // todo
            transactionMode: '线上交易',
            goods: {
                id: 636,
                // todo
                transactionModeList: ['线下交易'],
                goodsName: '荣耀v20',
                price: 1111.9,
                discount: 0.9,
                oldDegree: 8,
                historySales: 100,
                stockQuantity: 100,
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
        // jump2pay(payMethod) {
        //     if (this.transactionMode === '线上交易') {
        //         this.$router.push({
        //             name: 'onlineShopping',
        //             params: {
        //                 goods: this.goods,
        //                 transactionMode: this.transactionMode,
        //                 buyCount: this.buyCount,
        //             },
        //         });
        //     }
        // },
        getGoods(goodsId) {
            getGoodsById(goodsId).then((jsonResult) => {
                this.goods = jsonResult.data;
                console.log(this.goods);
            });
        },
        getCommentsPage(pageNo, pageSize, goodsId) {
            fetchCommentsPage(pageNo, pageSize, goodsId).then((jsonResult) => {
                console.log(jsonResult);
                this.commentsPage = jsonResult.data.page;
                this.avgStar = jsonResult.data.avgStar;
            });
        },
        commentsHandleCurrentChange(pageNo) {
            this.getCommentsPage(
                pageNo,
                this.commentsPage.pageSize,
                this.goods.id
            );
        },
        enlargePicture(base64Str) {
            console.log($('#bigImg'));
            $('#bigImg').attr('src', `data:image/png;base64,` + base64Str);
            // console.log($('#bigImg').attr('src'));
        },
    },
    created() {
        this.goods.id = this.$route.query.goodsId;

        this.getCommentsPage(
            this.commentsPage.pageNo,
            this.commentsPage.pageSize,
            this.goods.id
        );

        this.getGoods(this.goods.id);
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
