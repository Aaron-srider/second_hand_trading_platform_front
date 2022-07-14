<template>
    <div style="width: 89%; margin: auto">
        <div>
            <div style="background-color: #b4d7ff; padding: 10px">余额</div>
            <div class="flex">
                <div
                    class="flex column  shadow mg20"
                    style="width: 200px;"
                >
                    <div class="mg8" >金额</div>
                    <div class="mg8">￥{{ restMoney }}</div>
                </div>

                <div
                    class="flex column shadow mg20"
                    style="width: 200px; "
                >
                    <div class="mg8">积分</div>
                    <div class="mg8">{{ restPoint }}</div>
                </div>
            </div>
        </div>
        <div>
            <div style="background-color: #b4d7ff; padding: 10px">支付记录</div>

            <el-table :data="payments" style="width: 100%">
                <el-table-column prop="orderNo" label="订单号">
                </el-table-column>
                <el-table-column prop="orderTime" label="支付时间">
                </el-table-column>
                <el-table-column prop="totalPrice" label="支付金额">
                    <template slot-scope="scope">
                        ￥{{ scope.row.totalPrice }}
                    </template>
                </el-table-column>
                <el-table-column prop="receiverUserName" label="接收人">
                </el-table-column>
            </el-table>
            <div class="flex flex-center">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageNo"
                    :page-size="pagination.pageSize"
                    layout="total, prev, pager, next"
                    :total="pagination.total"
                />
            </div>
        </div>
    </div>
</template>
<script>
import {
    getPaymentRecords,
    getUserRestMoney,
    getUserRestPoint,
} from '@/api/order.js';
export default {
    data() {
        return {
            restMoney: '2342.22',
            restPoint: '23792',
            pagination: {
                pageNo: 1,
                pageSize: 10,
                total: 0,
            },
            payments: [
                {
                    orderNo: 'jkshfaoihfa;fa',
                    orderTime: '2020-23-33 33:22:11',
                    totalPrice: '222.22',
                    receiverUserName: 'cc',
                },
            ],
        };
    },
    created() {
        this.getUserRestMoney();
        this.getUserRestPoint();
        this.fetchPaymentRecords(
            this.pagination.pageNo,
            this.pagination.pageSize
        );
    },
    computed: {},
    methods: {
        getUserRestPoint() {
            let userId = this.$store.state.user.userId;
            getUserRestPoint(userId).then((jsonResult) => {
                this.restPoint = jsonResult.data.restPoint;
            });
        },
        getUserRestMoney() {
            let userId = this.$store.state.user.userId;
            getUserRestMoney(userId).then((jsonResult) => {
                this.restMoney = jsonResult.data.restMoney;
            });
        },
        handleCurrentChange(pageNo) {
            this.fetchPaymentRecords(pageNo, this.pagination.pageSize);
        },
        fetchPaymentRecords(pageNo, pageSize) {
            let userId = this.$store.state.user.userId;

            getPaymentRecords(userId, pageNo, pageSize).then((jsonResult) => {
                console.log(jsonResult);
                this.payments = jsonResult.data.records;
                this.pagination.total = jsonResult.data.total;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../../styles/common-style.css';
</style>
