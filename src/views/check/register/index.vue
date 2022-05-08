<template>
    <el-container>
        <el-main>
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>

                    <el-table-column prop="phone" label="电话" width="180">
                    </el-table-column>

                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>

                    <el-table-column prop="bankNo" label="银行卡号">
                    </el-table-column>

                    <el-table-column prop="permission" label="状态">
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                :id="'passBtn' + scope.row.id"
                                :status="scope.row.permission"
                                type="primary"
                                class="passBtn"
                                @click="registerPass(scope.row.id)"
                                >通过</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageNo"
                    :page-sizes="pagination.pageSizeArray"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total"
                />
            </div>
        </el-main>
    </el-container>
</template>

<script>
// #region utils
/**
 * 每次拉去表格数据后调用，更新按钮状态
 */
function refreshBtnStatus() {
    $('.passBtn').each(function (index, dom) {
        let btn = $(this);
        if (btn.attr('status') === '不通过' || btn.attr('status') === '通过') {
            btn.attr('disabled', 'true');
            btn.addClass('is-disabled');
        }
    });
}

// #endregion

import { getPagedRegistApplication, registerPass } from '@/api/application.js';
import { unwrapErrorMessage, processCatch } from '@/utils';
export default {
    methods: {
        // #region 分页函数
        refreshCurrentPage() {
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },
        /**
         * 获取分页数据
         * @param {int} pageSize 页面大小
         * @param {int} pageNo 页面数
         */
        getPagedRegistApplication(pageSize, pageNo) {
            getPagedRegistApplication(pageSize, pageNo).then((jsonResult) => {
                console.log(jsonResult.data);
                this.pagination.total = jsonResult.data.total;
                this.tableData = jsonResult.data.pageData;

                this.tableData.forEach((value) => {
                    let map = {
                        '-1': '待审批',
                        0: '不通过',
                        1: '通过',
                    };
                    value.permission = map[value.permission];
                });

                this.$nextTick((_) => {
                    refreshBtnStatus();
                });
            });
        },

        /**
         * 更改页面大小时绑定到data:pageSize，并拉去更新后的页面
         * @param {int} pageSize 更新后的页面大小
         */
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },

        /**
         * 更改页面大小时绑定到data:pageNo，并拉去更新后的页面
         * @param {int} pageNo 更新后的页面数
         */
        handleCurrentChange(pageNo) {
            this.pagination.pageNo = pageNo;
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },
        // #endregion

        registerPass(registerApplicationId) {
            registerPass(registerApplicationId)
                .then((jsonObject) => {
                    this.refreshCurrentPage();
                })
                .catch((error) => {
                    processCatch(error);
                });
        },
    },
    created() {
        this.getPagedRegistApplication(
            this.pagination.pageSize,
            this.pagination.pageNo
        );
    },
    mounted() {},
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
                /**
                 * 页面可选的大小数组
                 */
                pageSizeArray: [10, 20, 30, 40],
            },
            tableData: [
                {
                    id: 1,
                    phone: '2967482168',
                    name: 'wc',
                    email: 'wc@qq.com',
                    bankNo: '923y48712438387456984',
                },

                {
                    id: 2,
                    phone: '2967482168',
                    name: 'wc',
                    email: 'wc@qq.com',
                    bankNo: '923y48712438387456984',
                },

                {
                    id: 3,
                    phone: '2967482168',
                    name: 'wc',
                    email: 'wc@qq.com',
                    bankNo: '923y48712438387456984',
                },
            ],
        };
    },
};
</script>
