<template>
    <el-container>
        <el-main>
            <div>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column
                        prop="merchantName"
                        label="申请人信息"
                        width="180"
                    >
                    </el-table-column>

                    <el-table-column
                        prop="storeName"
                        label="店铺名称"
                        width="180"
                    >
                    </el-table-column>

                    <el-table-column prop="idcard" label="申请人身份证">
                    </el-table-column>

                    <el-table-column prop="businessPicStr" label="营业执照">
                        <template slot-scope="scope">
                            <img
                                class="small-img-60"
                                :src="`data:image/png;base64,${scope.row.businessPicStr}`"
                                alt=""
                            />
                        </template>
                    </el-table-column>

                    <el-table-column prop="permitText" label="审批状态">
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                size="small"
                                :disabled="
                                    scope.row.permit == 1 ||
                                    scope.row.permit == 0
                                "
                                @click="registerPass(scope.row.id)"
                                >通过</el-button
                            >

                            <el-button
                                type="danger"
                                :disabled="
                                    scope.row.permit == 1 ||
                                    scope.row.permit == 0
                                "
                                size="small"
                                @click="registerFail(scope.row.id)"
                                >不通过</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pagination.pageNo"
                    :page-size="pagination.pageSize"
                    layout="total, prev, pager, next"
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

import {
    getPagedRegistApplication,
    registerPass,
    storeRegistFail,
    storeRegistPass,
    getPageStoreApp,
} from '@/api/application.js';
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

        // #endregion

        // new
        fetchPageStoreApp(pageNo, pageSize) {
            getPageStoreApp(pageNo, pageSize).then((jsonResult) => {
                console.log(jsonResult);
                this.tableData = jsonResult.data.records;
                this.pagination.total = jsonResult.data.total;
            });
        },

        getPageStoreApp() {
            this.fetchPageStoreApp(
                this.pagination.pageNo,
                this.pagination.pageSize
            );
        },
        handleCurrentChange(pageNo) {
            this.fetchPageStoreApp(pageNo, this.pagination.pageSize);
        },

        registerPass(storeApplicationId) {
            storeRegistPass(storeApplicationId).then((jsonResult) => {
                this.fetchPageStoreApp(
                    this.pagination.pageNo,
                    this.pagination.pageSize
                );
            });
        },

        registerFail(storeApplicationId) {
            storeRegistFail(storeApplicationId).then((jsonResult) => {
                this.fetchPageStoreApp(
                    this.pagination.pageNo,
                    this.pagination.pageSize
                );
            });
        },
    },
    created() {
        // this.getPagedRegistApplication(
        //     this.pagination.pageSize,
        //     this.pagination.pageNo
        // );

        this.getPageStoreApp();
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
            },
            tableData: [
                {
                    id: 1,
                    merchantName: '文超',
                    storeName: '小店',
                    idcard: '123456789012345678',
                    permitText: '未批',
                    businessPicStr:
                        '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',
                },

                {
                    id: 2,
                    merchantName: '文超',
                    storeName: '小店',
                    idcard: '123456789012345678',
                    permitText: '未批',
                    businessPicStr:
                        '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUEBAUEAwUFBAUGBgUGCA4JCAcHCBEMDQoOFBEVFBMRExMWGB8bFhceFxMTGyUcHiAhIyMjFRomKSYiKR8iIyL/2wBDAQYGBggHCBAJCRAiFhMWIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiL/wAARCAA8ADwDAREAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAYDBQcBAgj/xAA4EAABAwMCAgYGCgMBAAAAAAABAgMEAAURBiESMQcTIkFRgUJSYXGRoRQVMlNicpKxwfAWI0OC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAECAwQFBv/EACwRAAICAQMBBwQCAwAAAAAAAAABAgMRBBIhMQUTIkFRgfAVMpHRUnEjYeH/2gAMAwEAAhEDEQA/ANV1vc9dQ9bQWNLxFuWZTCTIcDKVAK4zntEHB4R8/bQBRW6+dIrsWeuY3JbKVZZC4CQVAOHYEA+jwjJSeee40AWVwvutWIF1XFhPrlhlwtNGOFJbV1gCEoKR2iWznOVAEHIHIgFOrUvSGblp4CE+IzjSPrDgg44VFZBySDg4AzjbfOwoA5Y7p0nzpjrdxYVGaU4gNuLbaRgYcySeFWN0p7jz7s5oyGBsXedXoKIpt0dbrnG2JDKCACMpC8k4HIK35ggd1LKHhibOvHSlDsUd1uM4/LcluJWlDDbiw2k4GAlIAzg4JGOXjTyLBsFpckO2SC5PBEtbCFPAjBCykcW2B357hQAPr3T87UmlDBtbyG3g+hxTbiyhLyEnJbKhuAf4q2mahLLK7YOccIw+bbYVsuK4k06UjyY6yHWHbsviT2grBHDkbbVZO+HqQhTL0PbVkbu9wYXaHdPK6oErYYuC3AvcnfCc4GceVYp3VyeFLk2wrnFZaeAnFtLhYbd04h2OUpdAnrKhgnOeztnI+FZrIZeFg012qKy8/gY16PuL0FJagQWgQkh5D7hzgfl7+dYbtLOS4x+TfTrK4S5y/YsY1gfaQlC7XCWRjfr3cns49Xx3rM9HL+MX7v8ARpWvr/lJey/ZYw7BNjXhiSqOzCZbWFq6pTiiRjBTuOR50qOz7q9RGx4ik88N/j3HqO06LNNKpZk2scpL39hwaebfQVNK4gCQdsYIr0iaayjzDTTww64TmbZapc6WsIjxWlOuKPclIJP7UxHwC/c/8puV/kIciqkOSlzDLfUUuOAqwlpCO8kq5b+WKrddnXBYraumRrgX46AswbiLC73MA61Wc9Wn1R/edUW0xa8Swy+uxp+F5XoafpXTsDW1gi3xhIjTUkh0pH2iOYI9tcpuzTPE/FA2+C/lcSHiy6oXCnt2uY31ENJDSUfcq5Jx+A8vYffWh2qeHF8Pp+v7KFCVbal1XzP9GiMoTGHWu/b9EeFWRSjywk3LhAsiQp0kqPZqEpORKMUgaztpbtwWjOZC1PKyMbqOa6kFtikc6bzJsTenjUjFi6MHI8gOKF1kIiqbbOFqbzxOAf8AkEedWRaTyyEk2sI+dbVEt151G/e4tqatkfCWYUVpGzSUjHEfFR8ffWfUdo10xNuk7Jt1Es44NO0/pSyyZCEyEMyHniAUupzxezBrzl2vlfPiR6irs+GlreYDavTKdBSlzrEtTVqBzOt5PEGx94jvGO8eHurTGyVv+C37vL/pxLa1W++r+350LC8sR+EXRlKHXVoCm8bggjn5irdHDu47J/P9kdS+8juj5fMFzpa+LvNqIkKzJjngXnmoeifht7wavsi4ywyimSlHguJKT9DeUMABOMnxOwpVx3SSJWS2xbCeLGydgOVdY5on6/0azrHVESLKWpca2oJ4M7FasE/IJrNqJtLCNmljHO6QRC6O7Xbo4SmM1hsd9cienlZLDOxHXd3HjgVdQsMMyAm0BKerwQ6hPCQr2GttPZdUPFLqc+/tq6WYwfBmF51lfNHS0PSHnJVveXwuIdPFgHnWv6ZTNZjwzF9XuT2z5Q89GGpbZddNrsjqn3HYC+NpwkErjrJLYH5d0En1RVNlW2XKLKrt0eGMtsQqxagjuAK6iQ4Y7p7k5+z55xU5w7yrPmimM+6ux5Mbb3JLbMRpOf8AbISnA8B2iflVOmWZmm94gEpkjh3UPjXRMJUM3iZCvMx2fa5qi86V9Y03xp3O2CD/AHFRurU1wOicoN7uhy76vbfbMdiNNayO0pcdafnyqFNKi8yHqLZSW2AoyXHHASyw6vPgg1ZZJ+RRVW/MS9c2WZcdLyFRoT/0pnDjQ6knKgcjYjer9NNLKkZ9TXLKcSm0MxJ0upmdcCV3dxwdfx5HVsuqAV71BXCrHdvUdZGLScfmC3RuSb3fMmyXRxUrTgQl9JSy8FpCSNj4+2seml4tr6GnVxbg2upal8Xe/wBnbG6RDXKXjkCeFI/dXwqOmr2zkn5cF9tm+EX68lwqPFQcEqJHhWzCM2UEqiLHNKh5UsoWCMtLT6RHnQGCJTSjzOffvQLkgXHSebbZ97YP8UwywJ+1wnwRIgRHB+JlJ/ijgMsCf07Z5Aw/aoih+TH7GjAbmXtntMC224fV8VuOFZzwZ8fE7+VGMDzkM+jLVuAAPbSyLAJggbLX+qqSR0lQ/wCi/wBVSEz1uobkmgRI2kHnk00I9lhBHI/GnkZCuOgHvp5YmER8oSlKTsOWaTeQTJ+tX63yoHln/9k=',
                },

                {
                    id: 3,
                    merchantName: '文超',
                    storeName: '小店',
                    idcard: '123456789012345678',
                    permitText: '未批',
                    businessPicStr:
                        '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',
                },
            ],
        };
    },
};
</script>

<style>
@import '../../../styles/common-style.css';
</style>
