<template>
    <el-container
        ><el-main>
            <div style="width: 80%; margin: auto">
                <div style="text-align: right">
                    <el-pagination
                        :pager-count="5"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.pageNo"
                        :page-size="pagination.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="pagination.total"
                    />
                </div>

                <el-table
                    :border="true"
                    style="font-size: 12px; margin-bottom: 20px"
                >
                    <el-table-column label="商品" width="320" />
                    <el-table-column label="单价" width="130" />
                    <el-table-column label="数量" width="45" />
                    <el-table-column label="实付" width="100" />
                    <el-table-column label="状态" width="100" />
                    <el-table-column label="操作" width="" />
                </el-table>
                <el-table
                    :border="true"
                    style="font-size: 12px; margin-bottom: 20px"
                    v-for="order in orderList"
                    :key="order.id"
                    :data="[order]"
                >
                    <!-- picture name -->
                    <el-table-column label="" width="320">
                        <div style="display: flex">
                            <!-- pic -->
                            <div style="margin-right: 5px">
                                <a>
                                    <el-empty
                                        v-if="!order.goodsPic"
                                        description="描述文字"
                                    ></el-empty>

                                    <img
                                        v-else
                                        :src="`data:image/png;base64, ${
                                            order.goodsPic
                                                ? order.goodsPic
                                                : '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'
                                        }`"
                                        alt=""
                                        style="width: 80px; height: 80px"
                                    />
                                </a>
                            </div>
                            <!-- name -->
                            <div style="display: flex; flex-direction: column">
                                <div>
                                    <span style="font-size: 12px">{{
                                        order.goodsName
                                    }}</span>
                                </div>
                                <div>
                                    <span
                                        style="font-size: 12px; color: #9e9e9e"
                                    >
                                        类型:
                                        {{ hideWhite(order.goodsType) }}</span
                                    >
                                    <span
                                        style="font-size: 12px; color: #9e9e9e"
                                    >
                                        新旧程度:
                                        {{
                                            hideWhite(order.goodsOldDegree)
                                        }}成新</span
                                    >
                                    <span
                                        style="font-size: 12px; color: #9e9e9e"
                                    >
                                        尺寸:
                                        {{ hideWhite(order.goodsSize) }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </el-table-column>
                    <!-- price -->
                    <el-table-column label="" width="130">
                        <div>
                            <div>
                                <span
                                    class=""
                                    style="
                                        color: #9c9c9c;
                                        text-decoration: line-through;
                                    "
                                    >￥{{ order.price }}</span
                                >
                            </div>
                            <div>￥{{ order.price_after_discount }}</div>
                        </div></el-table-column
                    >
                    <!-- count -->
                    <el-table-column label="" width="45">
                        {{ order.count }}</el-table-column
                    >
                    <!-- total-price -->
                    <el-table-column label="" width="100">
                        ￥{{ order.total_price }}</el-table-column
                    >
                    <!-- order_status -->
                    <el-table-column label="" width="100">
                        {{ order.order_status }}</el-table-column
                    >
                    <!-- op -->
                    <el-table-column label="" width="">
                        <el-button
                            @click="viewComment(order.id)"
                            v-if="order.orderStatusId == 6"
                            size="small"
                        >
                            查看评价
                        </el-button>
                        <el-button
                            @click="openCommentWindow(order.goodsId, order.id)"
                            v-if="order.orderStatusId == 1"
                            size="small"
                        >
                            评价
                        </el-button>
                        <el-button
                            @click="receiveGoods(order.id)"
                            v-if="order.orderStatusId == 5"
                            size="small"
                            >确认收货</el-button
                        >
                    </el-table-column>
                </el-table>
            </div>
            <!-- 评论框 -->
            <el-dialog
                title="评价商品"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose"
            >
                <div class="flex border">
                    <div style="width: 50%" class="">
                        <div class="mg8">
                            <div>评价商品</div>
                            <textarea
                                placeholder="输入对商品的评价"
                                name=""
                                v-model="goodsComment"
                                :id="`goodsComment-${commentOrderId}`"
                                :disabled="commentInputDisabled"
                                cols="30"
                                rows="10"
                            />
                        </div>

                        <div class="mg8">
                            <div>评价商家</div>
                            <textarea
                                placeholder="输入对商家的评价"
                                name=""
                                v-model="storeComment"
                                :id="`storeComment-${commentOrderId}`"
                                :disabled="commentInputDisabled"
                                cols="30"
                                rows="10"
                            />
                        </div>
                    </div>
                    <div style="width: 50%" class="flex column flex-center">
                        <div>
                            商品星级
                            <el-rate
                                :id="`goodsStar-${commentOrderId}`"
                                v-model="goodsStar"
                                :disabled="commentInputDisabled"
                            ></el-rate>
                        </div>
                        <div style="border: 0.5px solid; width: 50%"></div>
                        <div>
                            商家星级
                            <el-rate
                                :id="`storeStar-${commentOrderId}`"
                                v-model="storeStar"
                                :disabled="commentInputDisabled"
                            ></el-rate>
                        </div>
                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button
                        @click="dialogVisible = false"
                        v-if="!commentInputDisabled"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="submitComment"
                        v-if="!commentInputDisabled"
                        >提交</el-button
                    >
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import { getPagedOrderList, confirmReceiveGoods } from '@/api/order.js';
import {
    submitCommit,
    getOrderCommentByUserIdAndOrderId,
} from '@/api/comment.js';

let vue;
export default {
    created() {
        vue = this;
        this.getPageOrderList();
    },
    methods: {
        viewComment(orderId) {
            let userId = this.$store.state.user.userId;
            console.log(orderId);
            this.commentOrderId = orderId;
            getOrderCommentByUserIdAndOrderId({ userId, orderId }).then(
                (jsonResult) => {
                    this.commentInputDisabled = true;
                    this.goodsComment = jsonResult.data.goodsComment;
                    this.storeComment = jsonResult.data.storeComment;
                    if (this.storeComment == '') {
                        this.storeComment = '未填写';
                    }

                    if (this.goodsComment == '') {
                        this.goodsComment = '未填写';
                    }
                    this.goodsStar = jsonResult.data.goodsStar;
                    this.storeStar = jsonResult.data.storeStar;
                    this.dialogVisible = true;
                }
            );
            // this.dialogVisible = true;
        },
        clearCommentInput() {
            this.goodsComment = '';
            this.storeComment = '';
            this.goodsStar = 5;
            this.storeStar = 5;
        },
        submitComment() {
            let comment = {
                userId: this.$store.state.user.userId,
                goodsId: this.commentGoodsId,
                orderId: this.commentOrderId,
                goodsComment: this.goodsComment,
                storeComment: this.storeComment,
                goodsStar: this.goodsStar,
                storeStar: this.storeStar,
            };
            console.log(comment);
            submitCommit(comment).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    this.dialogVisible = false;
                    let thisOrder = this.orderList.find(function (order) {
                        return order.id == vue.commentOrderId;
                    });
                    thisOrder.orderStatusId = 6;
                    thisOrder.order_status = '已评价';
                }

                if (jsonResult.code == 508) {
                    this.$message({
                        type: 'warning',
                        message: '请勿重复评价',
                    });
                }
            });
        },
        commentValidate() {
            if (
                this.goodsComment &&
                this.storeComment &&
                this.goodsStar &&
                this.storeCStar
            ) {
                return true;
            }
            return false;
        },
        handleClose(done) {
            this.clearCommentInput();
            done();
        },
        openCommentWindow(commentGoodsId, commentOrderId) {
            this.commentInputDisabled = false;
            this.commentGoodsId = commentGoodsId;
            this.commentOrderId = commentOrderId;
            this.dialogVisible = true;
        },
        receiveGoods(orderId) {
            confirmReceiveGoods(orderId).then((jsonResult) => {
                console.log(jsonResult);
                if (jsonResult.code == 200) {
                    let thisOrder = this.orderList.find(function (order) {
                        return order.id == orderId;
                    });
                    thisOrder.orderStatusId = 1;
                    thisOrder.order_status = '已关闭';
                }

                if (jsonResult.code == 506) {
                    this.$message({
                        message: '此订单数据异常',
                        type: 'error',
                    });
                }
            });
        },
        fetchPageOrderList({ pageNo, pageSize, customerId }) {
            getPagedOrderList(pageNo, pageSize, customerId).then(
                (jsonResult) => {
                    this.orderList = jsonResult.data.pageData;
                    this.pagination.total = jsonResult.data.total;
                    console.log(this.orderList);
                }
            );
        },
        getPageOrderList() {
            console.log(this.$store.state.user.userId);
            this.fetchPageOrderList({
                pageNo: this.pagination.pageNo,
                pageSize: this.pagination.pageSize,
                customerId: this.$store.state.user.userId,
            });
        },
        hideWhite(string) {
            return string ? string : '';
        },
        headerCellStyle({ row, column, rowIndex, columnIndex }) {
            console.log(column, columnIndex);
            console.log(colCount);
            if (colCount == columnIndex - 1) {
                return 'border-right: 1px solid #ebeef5;';
            }
            return 'border-right: 1px solid #ebeef5;';
        },
        handleCurrentChange(pageNo) {
            console.log(this.$store.state.user.userId);
            this.fetchPageOrderList({
                pageNo,
                pageSize: this.pagination.pageSize,
                customerId: this.$store.state.user.userId,
            });
        },
    },
    data() {
        return {
            commentInputDisabled: false,
            commentOrderId: undefined,
            commentGoodsId: undefined,
            goodsComment: '',
            storeComment: '',
            goodsStar: 5,
            storeStar: 5,
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
                /**
                 * 页面可选的大小数组
                 */
                // pageSizeArray: [10, 20, 30, 40],
            },
            orderList: [
                {
                    id: 1,
                    customerName: '文超',
                    goodsName: 'macbook pro',
                    discount: 0.8,
                    price: 180,
                    count: 1,
                    total_price: 144,
                    order_status: 'transporting',
                    goodsSize: '7.2英寸',
                    goodsOldDegree: '8',
                    goodsType: '电子',
                },
                {
                    id: 2,
                    customerName: '文超',
                    goodsName: 'macbook pro',
                    discount: 0.8,
                    price: 180,
                    count: 1,
                    total_price: 144,
                    order_status: 'transporting',
                    goodsSize: '7.2英寸',
                    goodsOldDegree: '8',
                    goodsType: '电子',
                },
            ],
        };
    },
};
</script>

<style scoped>
@import '../../../styles/common-style.css';
.row-col {
    border-right: 1px solid #daf3ff;
    height: 100%;
}

/* /deep/ .el-table__empty-block {
    display: none;
} */

/* .header-cell-border {
    border-right: 1px solid #ebeef5;
}

.last-header-cell-border {
} */
</style>
