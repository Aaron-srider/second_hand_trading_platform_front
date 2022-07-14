<template>
    <div>
        <div>
            <div>待审批商品：</div>
            <div>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageNo"
                    :page-size="pagination.pageSize"
                    layout="total, prev, pager, next"
                    :total="pagination.total"
                />
                <el-table :data="goodsAppList">
                    <el-table-column
                        prop="goodsName"
                        label="商品名称"
                    ></el-table-column>

                    <el-table-column
                        prop="goodsTypeText"
                        label="商品类型"
                    ></el-table-column>

                    <el-table-column
                        prop="discount"
                        label="折扣"
                    ></el-table-column>

                    <el-table-column
                        prop="amount"
                        label="商品价格"
                    ></el-table-column>

                    <el-table-column
                        prop="barginOrNotText"
                        label="是否议价"
                    ></el-table-column>

                    <el-table-column
                        prop="num"
                        label="商品数量"
                    ></el-table-column>

                    <el-table-column
                        prop="oldDegreeText"
                        label="新旧程度"
                    ></el-table-column>

                    <el-table-column
                        prop="permissionText"
                        label="是否通过"
                    ></el-table-column>

                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="goodsDetail(scope.row.id)"
                                >详情</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { getGoodsAppList } from '@/api/store';
import { throwStatement, tsMethodSignature } from '@babel/types';
export default {
    data() {
        return {
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
            goodsAppList: [
                {
                    goodsName: '',
                    goodsTypeText: '手机',
                    discount: 0.33,
                    size: '9.8英寸',
                    amount: '23.22',
                    barginOrNotText: '否',
                    num: 3,
                    oldDegreeText: '8成',
                },
            ],
        };
    },
    created() {
        this.getGoodsAppList(this.pagination.pageNo, this.pagination.pageSize);
    },
    computed: {},
    methods: {
        getGoodsAppList(pageNo, pageSize) {
            getGoodsAppList(pageNo, pageSize).then((jsonResult) => {
                this.goodsAppList = jsonResult.data.records;
                this.pagination.total = jsonResult.data.total;
            });
        },
        handleCurrentChange(pageNo) {
            let pageSize = this.pagination.pageSize;
            this.getGoodsAppList(pageNo, pageSize);
        },

        goodsDetail(goodsPubAppId) {
            this.$router.push({
                path: '/check/goodsDetail',
                query: { goodsPubAppId },
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
