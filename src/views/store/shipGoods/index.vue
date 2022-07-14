<template>
    <div>
        <div>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pagination.pageNo"
                :page-size="pagination.pageSize"
                layout="total, prev, pager, next"
                :total="pagination.total"
            />
            <el-table :data="tableData">
                <el-table-column prop="goodsName" label="商品名称">
                </el-table-column>

                <el-table-column prop="goodsTypeText" label="商品类别">
                </el-table-column>

                <el-table-column prop="buyCount" label="购买数量">
                </el-table-column>

                <el-table-column prop="orderId" label="订单号">
                </el-table-column>

                <el-table-column prop="goodsPrice" label="单价">
                </el-table-column>

                <el-table-column prop="discount" label="折扣">
                </el-table-column>

                <el-table-column prop="totalPrice" label="总付款额">
                </el-table-column>

                <el-table-column prop="consumerName" label="购买者用户名">
                </el-table-column>

                <el-table-column prop="address" label="收货地址">
                </el-table-column>
                <el-table-column prop="phone" label="电话"> </el-table-column>

                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="deliverGoods(scope.row.orderId)"
                            type="primary"
                        >
                            发货
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getShipGoods } from '@/api/order';
import { getStoreId, deliverGoods } from '@/api/store';
export default {
    data() {
        return {
            tableData: [
                {
                    goodsName: 'hello',
                    goodsTypeText: '箱包',
                    buyCount: 3,
                    orderId: '9834u2-u92ff-8234792',
                    goodsPrice: 234,
                    discount: 0.22,
                    totalPrice: 23423.22,
                    address: '中国',
                    consumerName: '文超',
                    phone: '92374027438',
                },
            ],
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
        };
    },
    created() {
        this.getShipGoods();
    },
    computed: {},
    methods: {
        handleCurrentChange(pageNo) {},
        getShipGoods() {
            let userId = this.$store.state.user.userId;
            getStoreId(userId)
                .then((jsonResult) => {
                    let storeId = jsonResult.data;
                    return getShipGoods(
                        storeId,
                        this.pagination.pageNo,
                        this.pagination.pageSize
                    );
                })
                .then((jsonResult) => {
                    if (jsonResult.code == 200) {
                        this.tableData = jsonResult.data.records;
                        this.pagination.total = jsonResult.data.total;
                    } else {
                        this.$message({
                            type: 'error',
                            message: jsonResult.detail || jsonResult.message,
                        });
                    }
                });
        },
        deliverGoods(orderId) {
            deliverGoods(orderId).then((jsonResult) => {
                console.log(jsonResult);
                this.getShipGoods();
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
